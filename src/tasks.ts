// Task rules and persistence, kept free of React so they can be unit tested.

export type Task = {
  id: number;
  name: string;
  /** ISO timestamp of when the task was ticked off; null while it is still to do. */
  completedAt: string | null;
};

export type TasksState = {
  tasks: Task[];
  /** Tasks from the most recent delete or clear, kept briefly so it can be undone. */
  lastRemoved: Task[];
};

export type TasksAction =
  | { type: 'add'; name: string; now: number }
  | { type: 'toggle'; id: number; now: string }
  | { type: 'remove'; id: number }
  | { type: 'clear' }
  | { type: 'undo' }
  | { type: 'expireUndo' };

export const isDone = (task: Task) => task.completedAt !== null;

export const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  const { tasks, lastRemoved } = state;

  switch (action.type) {
    case 'add': {
      const name = action.name.trim();
      if (!name) return state;
      // ids double as creation order, so a task added in the same millisecond still gets a larger one
      const id = Math.max(action.now, (tasks.at(-1)?.id ?? 0) + 1);
      return { ...state, tasks: [...tasks, { id, name, completedAt: null }] };
    }
    case 'toggle':
      return {
        ...state,
        tasks: tasks.map(task =>
          task.id === action.id ? { ...task, completedAt: isDone(task) ? null : action.now } : task,
        ),
      };
    case 'remove': {
      const removed = tasks.filter(task => task.id === action.id);
      if (removed.length === 0) return state;
      // ponytail: only the latest removal is undoable; stack them if users ask for more
      return {
        tasks: tasks.filter(task => task.id !== action.id),
        lastRemoved: removed,
      };
    }
    case 'clear':
      return tasks.length === 0 ? state : { tasks: [], lastRemoved: tasks };
    case 'undo':
      return {
        tasks: [...tasks, ...lastRemoved].sort((a, b) => a.id - b.id),
        lastRemoved: [],
      };
    case 'expireUndo':
      return lastRemoved.length === 0 ? state : { ...state, lastRemoved: [] };
  }
};

// ---- Persistence ----

export const STORAGE_KEY = 'tasks';
/** Raw data that failed to load is copied here before it is overwritten, so it can be recovered by hand. */
export const BACKUP_KEY = 'tasks-backup';
const SCHEMA_VERSION = 2;

type KeyValueStore = Pick<Storage, 'getItem' | 'setItem'>;

const isIsoDate = (value: unknown): value is string =>
  typeof value === 'string' && !Number.isNaN(Date.parse(value));

/**
 * Reads one stored task. Accepts the current shape and the v1 shape
 * ({ completed, dateCompleted }), converting v1 on the fly. Returns null for anything else.
 */
const parseTask = (value: unknown, now: string): Task | null => {
  if (typeof value !== 'object' || value === null) return null;
  const { id, name, completedAt, completed, dateCompleted } = value as Record<string, unknown>;
  if (typeof id !== 'number' || typeof name !== 'string') return null;

  if (completedAt === null || isIsoDate(completedAt)) return { id, name, completedAt };
  if (typeof completed === 'boolean') {
    const doneAt = isIsoDate(dateCompleted) ? dateCompleted : now;
    return { id, name, completedAt: completed ? doneAt : null };
  }
  return null;
};

/** Parses the stored JSON. `intact` is false when anything had to be dropped. */
export const parseTasks = (raw: string | null, now: string): { tasks: Task[]; intact: boolean } => {
  if (raw === null) return { tasks: [], intact: true };

  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { tasks: [], intact: false };
  }

  // v1 stored a bare array; v2 wraps it with a version number
  const items = Array.isArray(data)
    ? data
    : typeof data === 'object' &&
        data !== null &&
        Array.isArray((data as { tasks?: unknown }).tasks)
      ? (data as { tasks: unknown[] }).tasks
      : null;
  if (items === null) return { tasks: [], intact: false };

  const tasks = items.map(item => parseTask(item, now)).filter(task => task !== null);
  return { tasks, intact: tasks.length === items.length };
};

export const loadTasks = (
  store: KeyValueStore = localStorage,
  now = new Date().toISOString(),
): Task[] => {
  const raw = store.getItem(STORAGE_KEY);
  const { tasks, intact } = parseTasks(raw, now);
  if (!intact && raw !== null) {
    console.warn(
      `Some saved tasks could not be read; the original data was copied to "${BACKUP_KEY}".`,
    );
    store.setItem(BACKUP_KEY, raw);
  }
  return tasks;
};

export const saveTasks = (tasks: Task[], store: KeyValueStore = localStorage) => {
  store.setItem(STORAGE_KEY, JSON.stringify({ version: SCHEMA_VERSION, tasks }));
};
