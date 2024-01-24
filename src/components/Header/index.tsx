import { ReactElement } from 'react';

import './header.css';
import NewTaskForm from '../NewTaskForm/index.tsx';

interface HeaderProps {
  onAdd: (formData: { [key: string]: string }) => void;
}

function Header({ onAdd }: HeaderProps): ReactElement {
  return (
    <header className="header">
      <h1>Todos</h1>
      <NewTaskForm onAdd={onAdd} />
    </header>
  );
}

export default Header;
