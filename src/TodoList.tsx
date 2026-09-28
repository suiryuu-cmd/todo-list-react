import React from 'react';
import styles from './TodoList.module.css';
import { TaskList } from './components/TaskList';
import { CurrentDate } from './components/CurrentDate';
import { TaskForm } from './components/TaskForm';
import { UndoToast } from './components/UndoToast';
import { useTasksContext } from './context/tasksContext';

const TodoApp: React.FC = () => {
  const { tasks } = useTasksContext();
  const allDone = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 key={String(allDone)} className={allDone ? `${styles.title} ${styles.done}` : styles.title}>
          {allDone ? 'Done it.' : 'Just do it!'}
        </h1>
        <CurrentDate />
      </header>
      <TaskForm />
      <TaskList />
      <UndoToast />
    </main>
  );
};

export default TodoApp;
