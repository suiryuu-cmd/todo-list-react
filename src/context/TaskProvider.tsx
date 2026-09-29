import React, { useEffect, useReducer } from 'react';
import { flushSync } from 'react-dom';
import { loadTasks, saveTasks, tasksReducer, type TasksAction } from '../tasks';
import { TaskContext } from './taskContext';

const UNDO_MS = 5000;

// Animates list changes with the native View Transitions API; falls back to an instant update.
const withTransition = (update: () => void) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('startViewTransition' in document) || reduceMotion) return update();
  // The browser aborts the animation (not the update) when the tab is hidden or another
  // transition starts; swallow that rejection so it does not surface as an uncaught error.
  document.startViewTransition(() => flushSync(update)).ready.catch(() => {});
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ tasks, lastRemoved }, dispatch] = useReducer(tasksReducer, undefined, () => ({
    tasks: loadTasks(),
    lastRemoved: [],
  }));

  useEffect(() => saveTasks(tasks), [tasks]);

  useEffect(() => {
    if (lastRemoved.length === 0) return;
    const timer = setTimeout(() => dispatch({ type: 'expireUndo' }), UNDO_MS);
    return () => clearTimeout(timer);
  }, [lastRemoved]);

  const animate = (action: TasksAction) => withTransition(() => dispatch(action));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        lastRemoved,
        addTask: name => animate({ type: 'add', name, now: Date.now() }),
        toggleTask: id => animate({ type: 'toggle', id, now: new Date().toISOString() }),
        removeTask: id => animate({ type: 'remove', id }),
        clearAllTasks: () => animate({ type: 'clear' }),
        undoRemove: () => animate({ type: 'undo' }),
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
