import { ReactElement } from 'react';

import Task from '../Task/index.tsx';

import './task-list.css';

interface TaskListProps {}

function TaskList(): ReactElement<TaskListProps> {
  return (
    <ul className="todo-list">
      <Task />
    </ul>
  );
}

export default TaskList;
