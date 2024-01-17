import { create } from 'zustand';

import generateId from './helpers.ts';

interface Task {
  id: string;
  description: string;
  created: number;
  completed: boolean;
  editing: boolean;
}

interface Filter {
  name: string;
  selected: boolean;
}

interface ToDoStore {
  todoTasks: Task[];
  filters: Filter[];
  createTask: (description: string) => void;
  editingTask: (id: string) => void;
  editTask: (id: string, description: string) => void;
  deleteTask: (id: string) => void;
  completedTask: (id: string) => void;
  onClearCompleted: () => void;
  onFilter: (name: string) => void;
}

const useToDoStore = create<ToDoStore>((set, get) => ({
  todoTasks: [],
  filters: [
    { name: 'All', selected: true },
    { name: 'Active', selected: false },
    { name: 'Completed', selected: false },
  ],
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
  editingTask: (id: string): void => {
    const { todoTasks } = get();

    set({
      todoTasks: todoTasks.map((task) => ({
        ...task,
        editing: task.id === id ? !task.editing : task.editing,
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
  onClearCompleted: (): void => {
    const { todoTasks } = get();

    set({
      todoTasks: todoTasks.filter((task) => task.completed === false),
    });
  },
  onFilter: (name): void => {
    const { filters } = get();
    set({
      filters: filters.map((filter) => ({
        ...filter,
        selected: filter.name === name,
      })),
    });
  },
}));

export default useToDoStore;
