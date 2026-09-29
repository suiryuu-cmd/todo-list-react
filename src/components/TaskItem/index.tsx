import React from 'react';
import { isDone, type Task } from '../../tasks';
import { useTasks } from '../../context/taskContext';
import styles from './index.module.css';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

export const TaskItem: React.FC<{ task: Task }> = ({ task }) => {
  const { toggleTask, removeTask } = useTasks();
  const done = isDone(task);

  return (
    <li
      className={done ? `${styles.item} ${styles.completed}` : styles.item}
      style={{ viewTransitionName: `task-${task.id}` }}
    >
      <label className={styles.main}>
        <input
          type="checkbox"
          className={styles.check}
          checked={done}
          onChange={() => toggleTask(task.id)}
        />
        <span className={styles.text}>
          <span className={styles.name}>{task.name}</span>
          {task.completedAt && (
            <span className={styles.meta}>Done {formatDate(task.completedAt)}</span>
          )}
        </span>
      </label>
      <button
        type="button"
        className={styles.delete}
        onClick={() => removeTask(task.id)}
        aria-label={`Delete “${task.name}”`}
      >
        <span className={styles.trash} aria-hidden="true" />
      </button>
    </li>
  );
};
