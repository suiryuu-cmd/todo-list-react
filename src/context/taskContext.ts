import { createContext, useContext } from 'react';
import type { Task } from '../tasks';

export interface TaskContextValue {
  tasks: Task[];
  lastRemoved: Task[];
  addTask: (name: string) => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  clearAllTasks: () => void;
  undoRemove: () => void;
}

export const TaskContext = createContext<TaskContextValue | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
