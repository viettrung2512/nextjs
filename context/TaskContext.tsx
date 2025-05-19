'use client';
import { createContext, useContext, useReducer, ReactNode, useDebugValue, useEffect } from 'react';

type Task = {
  title: string;
  content: string;
  completed: boolean;
};

type TaskAction =
  | { type: 'ADD'; task: Task }
  | { type: 'CLEAR' }
  | { type: 'COMPLETE'; index: number };

type TaskState = Task[];

type TaskContextType = {
  tasks: TaskState;
  dispatch: React.Dispatch<TaskAction>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD':
      return [...state, action.task];
    case 'CLEAR':
      return [];
    case 'COMPLETE':
      return state.map((task, i) =>
        i === action.index ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
}

function initTasks(): TaskState {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
  }
  return []; // Ensure tasks are empty on the server
}

export function TaskProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [tasks, dispatch] = useReducer(taskReducer, [], initTasks);
  useDebugValue(tasks);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
}

export function useTasks(): TaskContextType {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
