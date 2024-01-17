import { ReactElement } from 'react';

import Header from '../Header/index.tsx';
import { NewTaskForm } from '../NewTaskForm/index.tsx';
import './app.css';
import useToDoStore from '../../data/stores/useTodoStore.ts';
import TaskList from '../TaskList/index.tsx';

function App(): ReactElement {
  const [todoTasks, createTask, editTask, deleteTask, completedTask] = useToDoStore((state) => [
    state.todoTasks,
    state.createTask,
    state.editTask,
    state.deleteTask,
    state.completedTask,
  ]);
  console.log(todoTasks, editTask, deleteTask, completedTask);
  return (
    <section className="todoapp">
      <Header />
      <NewTaskForm
        onAdd={(description: string) => {
          if (description) {
            createTask(description);
          }
        }}
      />
      <section className="main">
        <TaskList />
      </section>
    </section>
  );
}

export default App;
