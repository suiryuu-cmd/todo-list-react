import React from 'react';
import styles from './App.module.css';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { UndoToast } from './components/UndoToast';
import { useTasks } from './context/taskContext';
import { isDone } from './tasks';

const App: React.FC = () => {
  const { tasks } = useTasks();
  const allDone = tasks.length > 0 && tasks.every(isDone);
  const today = new Date();

  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1
          key={String(allDone)}
          className={allDone ? `${styles.title} ${styles.done}` : styles.title}
        >
          {allDone ? 'Done it.' : 'Just do it!'}
        </h1>
        <p className={styles.date}>
          <time dateTime={today.toISOString().slice(0, 10)}>
            {today.toLocaleDateString([], {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </p>
      </header>
      <TaskForm />
      <TaskList />
      <UndoToast />
    </main>
  );
};

export default App;
