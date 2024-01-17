import { ReactElement } from 'react';

import Header from '../Header/index.tsx';
import NewTaskForm from '../NewTaskForm/index.tsx';
import './app.css';
import useToDoStore from '../../data/stores/useTodoStore.ts';
import TaskList from '../TaskList/index.tsx';
import Footer from '../Footer/index.tsx';

function App(): ReactElement {
  const [todoTasks, createTask] = useToDoStore((state) => [state.todoTasks, state.createTask]);
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
        {todoTasks && <TaskList />}
        <Footer counter={todoTasks.length === 0 ? 0 : todoTasks.filter((task) => !task.completed).length} />
      </section>
    </section>
  );
}

export default App;
