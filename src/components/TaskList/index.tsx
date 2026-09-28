import React from 'react';
import styles from './index.module.css';
import { Button } from '../Button';
import { TaskFilter } from '../TaskFilter';
import { useTasksContext } from '../../context/tasksContext';
import Clear from '../../assets/icon/clear.svg';
import { TaskItem } from '../TaskItem';

export const TaskList: React.FC = () => {
  const { tasks, filter, clearAllTasks, toggleTask, removeTask } = useTasksContext();

  const pending = tasks.filter(task => !task.completed).length;
  const visibleTasks =
    filter === 'all' ? tasks : tasks.filter(task => task.completed === (filter === 'completed'));

  return (
    <div className={styles.taskSection}>
      <div className={styles.taskHeader}>
        <h3 className={styles.taskHeaderSubTitle}>
          {pending > 0 ? `${pending} tasks to do today` : `${tasks.length} tasks done today`}
        </h3>
        {tasks.length > 0 && (
          <div className={styles.taskHeaderActions}>
            <TaskFilter />
            <Button
              onClick={clearAllTasks}
              variant="icon"
              icon={Clear}
              label="Clear all tasks"
              deleteButton
            />
          </div>
        )}
      </div>
      {visibleTasks.length > 0 && (
        <ul>
          {visibleTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              removeTask={removeTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
