import { createContext, useContext } from 'react';
import type { Task } from '../types';

export type Filter = 'all' | 'completed' | 'incomplete';

export interface TaskContextType {
    tasks: Task[];
    filter: Filter;
    setFilter: (filter: Filter) => void;
    addTask: (taskName: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    clearAllTasks: () => void;
    removed: Task[];
    undoRemove: () => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasksContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasksContext must be used within a TaskProvider');
    }
    return context;
};
