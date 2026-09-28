import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { useTasksContext } from '../../context/tasksContext';
import styles from './index.module.css';

export const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState('');
  const { addTask } = useTasksContext();

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName);
      setTaskName('');
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleAddTask}>
      <TextInput
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Add a task to do."
      />
      <Button
        type="submit"
        disabled={taskName.trim() === ''}
        variant="text-primary"
      >
        Do it.
      </Button>
    </form>
  );
};