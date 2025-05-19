"use client";
import { useTasks } from "../context/TaskContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./TaskList.module.scss";

export default function TaskList(): React.ReactElement {
  const { tasks, dispatch } = useTasks();
  const router = useRouter();
  const [stableTasks, setStableTasks] = useState(tasks);

  useEffect(() => {
    setStableTasks(tasks); // Ensure tasks are stable after the component mounts
  }, [tasks]);

  const deleteTask = (index: number) => {
    const newTasks = stableTasks.filter((_, i) => i !== index);
    dispatch({ type: "CLEAR" });
    newTasks.forEach((task) => dispatch({ type: "ADD", task }));
  };

  const toggleComplete = (index: number) => {
    dispatch({ type: "COMPLETE", index });
  };

  const handleTaskClick = (index: number) => {
    router.push(`/task/${index}`);
  };

  return (
    <div className={styles.taskList}>
      {stableTasks.map((task, i) => (
        <div
          key={i}
          className={`${styles.taskItem} ${
            task.completed ? styles.taskItemCompleted : ""
          }`}
          onClick={() => handleTaskClick(i)}
        >
          <span>{task.title}</span>
          <div>
            <button
              className={styles.completeButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                toggleComplete(i);
              }}
              aria-label={`Mark task ${task.title} as complete`}
            ></button>
            <button
              className={styles.deleteButton}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                deleteTask(i);
              }}
              aria-label={`Delete task ${task.title}`}
            >
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
