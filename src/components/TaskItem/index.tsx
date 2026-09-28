import React from 'react';
import type { Task } from '../../types';
import { Button } from '../Button';
import CheckIcon from '../../assets/icon/check.svg';
import CrossIcon from '../../assets/icon/cross.svg';
import DeleteIcon from '../../assets/icon/trash.svg';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

export const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, removeTask }) => {
  return (
    <li>
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.name}
        {task.completed && ` - Completed on ${formatDate(task.dateCompleted)}`}
      </span>
      <div>
        <Button
          onClick={() => toggleTask(task.id)}
          icon={task.completed ? CrossIcon : CheckIcon}
          label={task.completed ? 'Mark as not done' : 'Mark as done'}
          variant="icon"
        />
        <Button
          onClick={() => removeTask(task.id)}
          icon={DeleteIcon}
          label="Delete task"
          variant="icon"
          deleteButton
        />
      </div>
    </li>
  );
};
