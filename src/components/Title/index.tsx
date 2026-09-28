import React from 'react';
import styles from './index.module.css';

interface IProps {
  title: string;
  level: string;
}

export const Title: React.FC<IProps> = ({ title, level }) => {
  const Level = level as keyof React.JSX.IntrinsicElements;

  return (
    <div className={styles.wrapper}>
      <Level>{title}</Level>
    </div>
  );
};