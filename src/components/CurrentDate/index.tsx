import React from 'react';
import styles from './index.module.css';

export const CurrentDate: React.FC = () => {
  const formattedDate = new Date().toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return <p className={styles.currentDateText}>{formattedDate}</p>;
};