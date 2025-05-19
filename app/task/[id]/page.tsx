'use client';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useTasks } from '../../../context/TaskContext';
import styles from './taskpage.module.scss';

export default function TaskDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { tasks } = useTasks();

  const idStr = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = idStr ? parseInt(idStr, 10) : -1;
  const task = id >= 0 && id < tasks.length ? tasks[id] : null;

  if (!task) {
return (
      <div className={styles.container}>
        <h2>Task not found</h2>
        <button onClick={() => router.push('/')}>Back to Todo List</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Task Detail</h1>
      <div className={styles.section}>
        <p><strong>Title: {task.title}</strong></p>
      </div>
      <div>
        <p><strong>Content:</strong></p>
        <p>{task.content || 'No content available'}</p>
      </div>
      <div className={styles.backButton}>
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
}