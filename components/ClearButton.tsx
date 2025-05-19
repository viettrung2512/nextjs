'use client';
import { forwardRef, useImperativeHandle } from 'react';
import styles from './ClearButton.module.scss';

export type ClearButtonProps = {
  onClear: () => void;
};

export type ClearButtonHandle = {
  clearTasks: () => void;
};

const ClearButton = forwardRef<ClearButtonHandle, ClearButtonProps>(({ onClear }, ref) => {
  useImperativeHandle(ref, () => ({
    clearTasks: () => {
      console.log('Tasks cleared via ref');
      onClear();
    },
  }));

  return <button onClick={onClear} className={styles.clearButton}>Clear Tasks</button>;
});

export default ClearButton;
