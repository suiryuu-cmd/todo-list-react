import React from 'react';
import styles from './index.module.css';
import { useTasks } from '../../context/taskContext';

export const UndoToast: React.FC = () => {
  const { lastRemoved, undoRemove } = useTasks();

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {lastRemoved.length > 0 && (
        <div className={styles.toast}>
          <span>
            {lastRemoved.length === 1 ? 'Task deleted' : `${lastRemoved.length} tasks cleared`}
          </span>
          <button type="button" className={styles.undo} onClick={undoRemove}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
};
