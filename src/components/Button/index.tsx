import React from 'react';
import styles from './index.module.css';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  label?: string;
  children?: React.ReactNode;
  variant?: 'text-primary' | 'icon';
  type?: 'button' | 'submit';
  deleteButton?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  icon,
  label,
  variant = 'text-primary',
  type = 'button',
  deleteButton,
}) => {
  const className = [
    variant === 'icon' ? styles.iconButton : styles.textButtonPrimary,
    deleteButton && styles.deleteButton,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={className} onClick={onClick} disabled={disabled} aria-label={label}>
      {icon && <img className={styles.icon} src={icon} alt="" />}
      {children}
    </button>
  );
};
