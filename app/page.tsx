'use client';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import ClearButton from '../components/ClearButton';
import { useRef } from 'react';
import { useTasks } from '../context/TaskContext';
import styles from './page.module.scss';

export default function HomePage(): React.ReactElement {
  const { dispatch } = useTasks();
  const clearRef = useRef<{ clearTasks: () => void }>(null);

  const handleClear = (): void => dispatch({ type: 'CLEAR' });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <TaskInput />
      <TaskList />
      <div className={styles.buttons}>
        <ClearButton ref={clearRef} onClear={handleClear} />
        <button onClick={() => clearRef.current?.clearTasks()} className="text-red-600 hover:text-red-800 font-semibold">
          🔥 Clear via Ref
        </button>
      </div>
    </div>
  );
}
