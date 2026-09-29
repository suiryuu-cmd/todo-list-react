import { describe, expect, it } from 'vitest';
import {
  BACKUP_KEY,
  STORAGE_KEY,
  loadTasks,
  parseTasks,
  saveTasks,
  tasksReducer,
  type Task,
  type TasksState,
} from './tasks';

const NOW = '2026-09-29T08:00:00.000Z';
const task = (id: number, completedAt: string | null = null): Task => ({
  id,
  name: `Task ${id}`,
  completedAt,
});
const state = (tasks: Task[], lastRemoved: Task[] = []): TasksState => ({
  tasks,
  lastRemoved,
});

const memoryStore = (initial: Record<string, string> = {}) => {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    data,
  };
};

describe('tasksReducer', () => {
  it('adds a trimmed task and ignores blank names', () => {
    const next = tasksReducer(state([]), {
      type: 'add',
      name: '  Buy milk  ',
      now: 1000,
    });
    expect(next.tasks).toEqual([{ id: 1000, name: 'Buy milk', completedAt: null }]);
    expect(tasksReducer(next, { type: 'add', name: '   ', now: 2000 })).toBe(next);
  });

  it('never reuses an id when two tasks are added in the same millisecond', () => {
    let s = tasksReducer(state([]), { type: 'add', name: 'a', now: 5000 });
    s = tasksReducer(s, { type: 'add', name: 'b', now: 5000 });
    expect(s.tasks.map(t => t.id)).toEqual([5000, 5001]);
  });

  it('toggles completion on and off', () => {
    const done = tasksReducer(state([task(1)]), {
      type: 'toggle',
      id: 1,
      now: NOW,
    });
    expect(done.tasks[0].completedAt).toBe(NOW);
    expect(tasksReducer(done, { type: 'toggle', id: 1, now: NOW }).tasks[0].completedAt).toBeNull();
  });

  it('undo puts a removed task back in its original position', () => {
    const removed = tasksReducer(state([task(1), task(2), task(3)]), {
      type: 'remove',
      id: 2,
    });
    expect(removed.tasks.map(t => t.id)).toEqual([1, 3]);
    expect(removed.lastRemoved.map(t => t.id)).toEqual([2]);

    const restored = tasksReducer(removed, { type: 'undo' });
    expect(restored.tasks.map(t => t.id)).toEqual([1, 2, 3]);
    expect(restored.lastRemoved).toEqual([]);
  });

  it('clear keeps everything for undo, and is a no-op on an empty list', () => {
    const cleared = tasksReducer(state([task(1), task(2)]), { type: 'clear' });
    expect(cleared).toEqual(state([], [task(1), task(2)]));
    const empty = state([]);
    expect(tasksReducer(empty, { type: 'clear' })).toBe(empty);
  });

  it('removing an unknown id changes nothing', () => {
    const s = state([task(1)]);
    expect(tasksReducer(s, { type: 'remove', id: 99 })).toBe(s);
  });
});

describe('parseTasks', () => {
  it('reads the current format', () => {
    const raw = JSON.stringify({ version: 2, tasks: [task(1), task(2, NOW)] });
    expect(parseTasks(raw, NOW)).toEqual({
      tasks: [task(1), task(2, NOW)],
      intact: true,
    });
  });

  it('migrates the v1 { completed, dateCompleted } array', () => {
    const raw = JSON.stringify([
      { id: 1, name: 'open', completed: false, dateCompleted: '' },
      {
        id: 2,
        name: 'done',
        completed: true,
        dateCompleted: '2026-09-01T10:00:00.000Z',
      },
      // v1 could store completed without a date; fall back to "now" instead of "Invalid Date"
      { id: 3, name: 'undated', completed: true, dateCompleted: '' },
    ]);
    expect(parseTasks(raw, NOW)).toEqual({
      tasks: [
        { id: 1, name: 'open', completedAt: null },
        { id: 2, name: 'done', completedAt: '2026-09-01T10:00:00.000Z' },
        { id: 3, name: 'undated', completedAt: NOW },
      ],
      intact: true,
    });
  });

  it('drops malformed items and reports the data as not intact', () => {
    const raw = JSON.stringify([
      null,
      5,
      { name: {} },
      { id: 'x', name: 'a' },
      { id: 1, name: 'ok', completedAt: 'nope' },
      task(2),
    ]);
    expect(parseTasks(raw, NOW)).toEqual({ tasks: [task(2)], intact: false });
  });

  it('handles missing, broken and unrecognised data', () => {
    expect(parseTasks(null, NOW)).toEqual({ tasks: [], intact: true });
    expect(parseTasks('{not json', NOW)).toEqual({ tasks: [], intact: false });
    expect(parseTasks('"hello"', NOW)).toEqual({ tasks: [], intact: false });
  });
});

describe('loadTasks / saveTasks', () => {
  it('backs up the raw data before anything is dropped', () => {
    const store = memoryStore({ [STORAGE_KEY]: '{broken' });
    expect(loadTasks(store, NOW)).toEqual([]);
    expect(store.data.get(BACKUP_KEY)).toBe('{broken');
  });

  it('does not create a backup for clean data', () => {
    const store = memoryStore();
    saveTasks([task(1)], store);
    expect(loadTasks(store, NOW)).toEqual([task(1)]);
    expect(store.data.has(BACKUP_KEY)).toBe(false);
  });
});
