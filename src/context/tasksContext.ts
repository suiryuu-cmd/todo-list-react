import { createContext, useContext } from 'react';
import type { Task } from '../types';

export type Filter = 'all' | 'completed' | 'incomplete';

export interface TaskContextType {
    tasks: Task[];
    addTask: (taskName: string) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    clearAllTasks: () => void;
    filterTasks: Filter;
    setFilterTasks: (filter: Filter) => void;
    hasPendingTasks: boolean;
    isTaskListEmpty: boolean;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasksContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasksContext must be used within a TaskProvider');
    }
    return context;
};
