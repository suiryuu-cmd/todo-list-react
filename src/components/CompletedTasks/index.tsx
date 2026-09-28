import React, { useState } from 'react';
import { useTasksContext } from '../../context/tasksContext';
import styles from './index.module.css';
import { TaskItem } from '../TaskItem';

const CompletedTasks: React.FC = () => {
  const { tasks, toggleTask, removeTask } = useTasksContext();

  const completedTasks = tasks.filter(task => task.completed);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(prev => !prev);
  };

  if (completedTasks.length === 0) {
    return null;
  } else {
    return (
      <div className={styles.completedTasks}>
        <h3 onClick={toggleSection} style={{ cursor: 'pointer', width: '64%' }}>
          Completed Tasks {isOpen ? '▼' : '►'}
        </h3>
        {isOpen && (
          <ul className={styles.completedTaskList}>
            {completedTasks.map(task => (
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
  }
};

export default CompletedTasks;