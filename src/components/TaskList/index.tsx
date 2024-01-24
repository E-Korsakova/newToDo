import { ReactElement } from 'react';

import useToDoStore from '../../data/stores/useTodoStore.ts';
import Task from '../Task/index.tsx';

import './task-list.css';

function TaskList(): ReactElement {
  const [todoTasks, filters, editingTask, editTask, deleteTask, completedTask] = useToDoStore((state) => [
    state.todoTasks,
    state.filters,
    state.editingTask,
    state.editTask,
    state.deleteTask,
    state.completedTask,
  ]);

  const [selectFilter] = filters.filter((el) => el.selected);
  return (
    <ul className="todo-list">
      {todoTasks
        .filter((task) => {
          if (selectFilter.name === 'Active') return !task.completed;
          if (selectFilter.name === 'Completed') return task.completed;
          return task;
        })
        .map((task) => (
          <Task
            key={task.id}
            id={task.id}
            description={task.description}
            minutes={task.minutes}
            seconds={task.seconds}
            created={task.created}
            editing={task.editing}
            completed={task.completed}
            onEditing={editingTask}
            onEdited={editTask}
            onCompleted={completedTask}
            onDeleted={deleteTask}
          />
        ))}
    </ul>
  );
}

export default TaskList;
