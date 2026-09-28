import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Task } from '../types';
import { TaskContext } from './tasksContext';

const UNDO_MS = 5000;

const loadTasks = (): Task[] => {
    try {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        console.error('Failed to load tasks:', error);
        return [];
    }
};

// Animates list changes with the native View Transitions API; falls back to an instant update.
const withTransition = (update: () => void) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('startViewTransition' in document) || reduceMotion) return update();
    document.startViewTransition(() => flushSync(update));
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(loadTasks);
    // ponytail: only the latest removal is undoable; a second delete within 5s replaces it
    const [removed, setRemoved] = useState<Task[]>([]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (removed.length === 0) return;
        const timer = setTimeout(() => setRemoved([]), UNDO_MS);
        return () => clearTimeout(timer);
    }, [removed]);

    const addTask = (taskName: string) => {
        const name = taskName.trim();
        if (!name) return;
        withTransition(() =>
            setTasks((prev) => [...prev, { id: Date.now(), name, dateCompleted: '', completed: false }])
        );
    };

    const removeTask = (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        withTransition(() => {
            setTasks((prev) => prev.filter((t) => t.id !== id));
            setRemoved([task]);
        });
    };

    const toggleTask = (id: number) => {
        withTransition(() =>
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id
                        ? { ...task, completed: !task.completed, dateCompleted: task.completed ? '' : new Date().toISOString() }
                        : task
                )
            )
        );
    };

    const clearAllTasks = () => {
        if (tasks.length === 0) return;
        withTransition(() => {
            setRemoved(tasks);
            setTasks([]);
        });
    };

    // ids are creation timestamps, so sorting by id restores the original order
    const undoRemove = () => {
        withTransition(() => {
            setTasks((prev) => [...prev, ...removed].sort((a, b) => a.id - b.id));
            setRemoved([]);
        });
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, removeTask, toggleTask, clearAllTasks, removed, undoRemove }}
        >
            {children}
        </TaskContext.Provider>
    );
};
