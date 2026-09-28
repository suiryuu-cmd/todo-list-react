import React from 'react';
import styles from './index.module.css';
import FilterIcon from '../../assets/icon/filter.svg';
import { useTasksContext } from '../../context/tasksContext';
import type { Filter } from '../../context/tasksContext';

export const TaskFilter: React.FC = () => {
  const { filter, setFilter } = useTasksContext();

  return (
    <div className={styles.selectContainer}>
      <img className={styles.selectIcon} src={FilterIcon} alt="" />
      <select
        className={styles.selectSection}
        aria-label="Filter tasks"
        value={filter}
        onChange={e => setFilter(e.target.value as Filter)}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
};
