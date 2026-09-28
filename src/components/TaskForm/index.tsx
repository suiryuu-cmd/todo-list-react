import React, { useState } from 'react';
import { useTasksContext } from '../../context/tasksContext';
import styles from './index.module.css';

export const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const { addTask } = useTasksContext();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(taskName);
    setTaskName('');
  };

  return (
    <form className={styles.form} onSubmit={handleAddTask}>
      <input
        className={styles.input}
        type="text"
        name="task"
        autoComplete="off"
        maxLength={200}
        aria-label="New task"
        placeholder="Add a task…"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
      />
      <button className={styles.submit} type="submit" disabled={taskName.trim() === ''}>
        Do it.
      </button>
    </form>
  );
};
