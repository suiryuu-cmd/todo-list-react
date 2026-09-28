import React, { useEffect, useState } from 'react';
import type { Task } from '../types';
import { TaskContext, type Filter } from './tasksContext';

const loadTasks = (): Task[] => {
    try {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(loadTasks);
    const [filter, setFilter] = useState<Filter>('all');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskName: string) => {
        const name = taskName.trim();
        if (!name) return;
        setTasks((prev) => [...prev, { id: Date.now(), name, dateCompleted: '', completed: false }]);
    };

    const removeTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? { ...task, completed: !task.completed, dateCompleted: task.completed ? '' : new Date().toISOString() }
                    : task
            )
        );
    };

    const clearAllTasks = () => setTasks([]);

    return (
        <TaskContext.Provider
            value={{ tasks, filter, setFilter, addTask, removeTask, toggleTask, clearAllTasks }}
        >
            {children}
        </TaskContext.Provider>
    );
};
