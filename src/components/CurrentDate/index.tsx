import React from 'react';
import styles from './index.module.css';

export const CurrentDate: React.FC = () => {
  const now = new Date();

  return (
    <p className={styles.date}>
      <time dateTime={now.toISOString().slice(0, 10)}>
        {now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
      </time>
    </p>
  );
};
