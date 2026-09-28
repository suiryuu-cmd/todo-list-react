import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'text-primary' | 'text-secondary' | 'icon';
  type?: 'button' | 'submit' | 'reset';
  deleteButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  icon,
  variant = 'text-primary',
  deleteButton,
}) => {
  let className =
    variant === 'icon'
      ? styles.iconButton
      : variant === 'text-secondary'
        ? styles.textButtonSecondary
        : styles.textButtonPrimary;

  if (deleteButton) {
    className = `${className} ${styles.deleteButton}`;
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {typeof icon === 'string' && (
        <img className={styles.icon} src={icon} alt="icon" />
      )}
      {children && <span className={styles.text}>{children}</span>}
    </button>
  );
};