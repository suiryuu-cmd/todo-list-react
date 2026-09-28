// src/components/TaskItem/index.tsx
import React from 'react';
import { Task } from '../../types';
import { Button } from '../Button';
import CheckIcon from '../../assets/icon/check.svg';
import CrossIcon from '../../assets/icon/cross.svg';
import DeleteIcon from '../../assets/icon/trash.svg';
import styles from './index.module.css';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  toggleTask,
  removeTask,
}) => {
  return (
    <li className={styles.taskItem}>
      <span
        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
      >
        {task.name}
        {task.completed ? ` - Completed on ${task.dateCompleted}` : ''}
      </span>
      <div className={styles.taskActions}>
        <Button
          onClick={() => toggleTask(task.id)}
          icon={task.completed ? CrossIcon : CheckIcon}
          variant="icon"
        />
        <Button
          onClick={() => removeTask(task.id)}
          icon={DeleteIcon}
          variant="icon"
          deleteButton={true}
        />
      </div>
    </li>
  );
};