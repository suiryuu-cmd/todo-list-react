import React, { useState } from 'react';
import { Button } from '../Button';
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
    <form className={styles.formContainer} onSubmit={handleAddTask}>
      <input
        type="text"
        aria-label="New task"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add a task to do."
      />
      <Button type="submit" disabled={taskName.trim() === ''}>
        Do it.
      </Button>
    </form>
  );
};
