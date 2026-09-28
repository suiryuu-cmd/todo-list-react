import React from 'react';
import type { Task } from '../../types';
import styles from './index.module.css';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

export const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, removeTask }) => {
  return (
    <li
      className={task.completed ? `${styles.item} ${styles.completed}` : styles.item}
      style={{ viewTransitionName: `task-${task.id}` }}
    >
      <label className={styles.main}>
        <input
          type="checkbox"
          className={styles.check}
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className={styles.text}>
          <span className={styles.name}>{task.name}</span>
          {task.completed && <span className={styles.meta}>Done {formatDate(task.dateCompleted)}</span>}
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
