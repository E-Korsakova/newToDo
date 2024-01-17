import { ReactElement } from 'react';

import TaskFilter from '../TasksFilter/index.tsx';
import useToDoStore from '../../data/stores/useTodoStore.ts';
import './footer.css';

interface FooterProp {
  counter: number;
}

function Footer({ counter }: FooterProp): ReactElement<FooterProp> {
  const [onClearCompleted] = useToDoStore((state) => [state.onClearCompleted]);
  return (
    <footer className="footer">
      <span className="todo-count">{counter} items left</span>
      <TaskFilter />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
