import React, { useState } from 'react';
import styles from './index.module.css';
import { TaskItem } from '../TaskItem';
import { EmptyState } from './EmptyState';
import { useTasks } from '../../context/taskContext';
import { isDone } from '../../tasks';

export const TaskList: React.FC = () => {
  const { tasks, clearAllTasks } = useTasks();
  const [showDone, setShowDone] = useState(true);

  if (tasks.length === 0) return <EmptyState />;

  const todo = tasks.filter(task => !isDone(task));
  const done = tasks.filter(isDone);

  return (
    <section className={styles.section} aria-labelledby="task-status">
      <h2 id="task-status" className={styles.status} aria-live="polite">
        {todo.length > 0 ? `${todo.length} left · ${done.length} done` : `All ${tasks.length} done`}
      </h2>

      <div
        className={styles.track}
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={tasks.length}
        aria-valuenow={done.length}
      >
        <div className={styles.fill} style={{ transform: `scaleX(${done.length / tasks.length})` }}>
          {done.length > 0 && <span key={done.length} className={styles.sheen} />}
        </div>
      </div>

      {todo.length > 0 ? (
        <ul className={styles.list}>
          {todo.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      ) : (
        <p className={styles.allClear}>Nothing left to do.</p>
      )}

      {done.length > 0 && (
        <div className={styles.doneGroup}>
          <button
            type="button"
            className={styles.doneToggle}
            aria-expanded={showDone}
            aria-controls="done-list"
            onClick={() => setShowDone(open => !open)}
          >
            Done ({done.length})
            <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {showDone && (
            <ul id="done-list" className={styles.list}>
              {done.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </div>
      )}

      <button type="button" className={styles.clear} onClick={clearAllTasks}>
        Clear all
      </button>
    </section>
  );
};
