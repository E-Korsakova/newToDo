import { create } from 'zustand';

import generateId from './helpers.ts';

interface Task {
  id: string;
  description: string;
  created: number;
  completed: boolean;
  editing: boolean;
}
// eslint-disable-block
interface ToDoStore {
  todoTasks: Task[];
  createTask: (description: string) => void;
  editTask: (id: string, description: string) => void;
  deleteTask: (id: string) => void;
  completedTask: (id: string) => void;
}

const useToDoStore = create<ToDoStore>((set, get) => ({
  todoTasks: [],
  createTask: (description: string): void => {
    const { todoTasks } = get();
    const newTask = {
      id: generateId(),
      description,
      created: Date.now(),
      completed: false,
      editing: false,
    };

    set({
      todoTasks: [newTask].concat(todoTasks),
    });
  },
  editTask: (id, description): void => {
    const { todoTasks } = get();

    set({
      todoTasks: todoTasks.map((task) => ({
        ...task,
        description: task.id === id ? description : task.description,
      })),
    });
  },
  deleteTask: (id): void => {
    const { todoTasks } = get();

    set({
      todoTasks: todoTasks.filter((task) => task.id !== id),
    });
  },
  completedTask: (id): void => {
    const { todoTasks } = get();

    set({
      todoTasks: todoTasks.map((task) => ({
        ...task,
        completed: task.id === id ? !task.completed : task.completed,
      })),
    });
  },
}));

export default useToDoStore;
