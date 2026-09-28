import React from 'react';
import styles from './index.module.css';

interface TextInputProps {
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};