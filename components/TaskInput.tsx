'use client';
import { useActionState } from 'react';
import { useTasks } from '../context/TaskContext';
import styles from './TaskInput.module.scss';

export default function TaskInput(): React.ReactElement {
  const { dispatch } = useTasks();
  const [state, addTask] = useActionState(
    async (_prevState: any[], formData: FormData) => {
      const title = formData.get('title') as string;
      const content = formData.get('content') as string;
      const task = { title, content, completed: false };
      dispatch({ type: 'ADD', task });
      return [..._prevState, task];
    },
    []
  );

  return (
    <form action={addTask} className={styles.taskInputForm}>
      <input name="title" placeholder="Task title..." className={styles.taskInputField} required />
      <textarea name="content" placeholder="Task content..." className={styles.taskInputField} rows={3} required />
      <button type="submit" className={styles.taskInputButton}>Add</button>
    </form>
  );
}
