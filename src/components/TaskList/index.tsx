import React from 'react';
import styles from './index.module.css';
import { TaskFilter } from '../TaskFilter';
import { TaskItem } from '../TaskItem';
import { useTasksContext } from '../../context/tasksContext';

export const TaskList: React.FC = () => {
  const { tasks, filter, clearAllTasks, toggleTask, removeTask } = useTasksContext();

  if (tasks.length === 0) {
    return <p className={styles.empty}>Nothing yet. What’s first?</p>;
  }

  const done = tasks.filter(task => task.completed).length;
  const left = tasks.length - done;
  const visibleTasks =
    filter === 'all' ? tasks : tasks.filter(task => task.completed === (filter === 'completed'));

  return (
    <section className={styles.section} aria-labelledby="task-status">
      <div className={styles.header}>
        <h2 id="task-status" className={styles.status} aria-live="polite">
          {left > 0 ? `${left} left · ${done} done` : `All ${tasks.length} done`}
        </h2>
        <TaskFilter />
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={tasks.length}
        aria-valuenow={done}
      >
        <div className={styles.fill} style={{ transform: `scaleX(${done / tasks.length})` }} />
      </div>

      {visibleTasks.length > 0 ? (
        <ul className={styles.list}>
          {visibleTasks.map(task => (
            <TaskItem key={task.id} task={task} toggleTask={toggleTask} removeTask={removeTask} />
          ))}
        </ul>
      ) : (
        <p className={styles.filterEmpty}>
          {filter === 'completed' ? 'No finished tasks yet.' : 'Nothing left to do.'}
        </p>
      )}

      <button type="button" className={styles.clear} onClick={clearAllTasks}>
        Clear all
      </button>
    </section>
  );
};
