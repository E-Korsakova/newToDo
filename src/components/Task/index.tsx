import { ReactElement } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

interface TaskProps {
  id: string;
  description: string;
  created: number;
  editing: boolean;
  completed: boolean;
  // onEdited: (id: string, description: string) => void;
  onCompleted: (id: string) => void;
  onDeleted: (id: string) => void;
}

function Task({
  id,
  description,
  created,
  editing,
  completed,
  // onEdited,
  onDeleted,
  onCompleted,
}: TaskProps): ReactElement<TaskProps> {
  let classNames = 'active';

  const date = formatDistanceToNow(new Date(created), { includeSeconds: true, addSuffix: true });

  if (completed) classNames = 'completed';
  if (editing) classNames = 'editing';
  return (
    <li className={classNames} key={id}>
      <div className="view">
        <input type="checkbox" className="toggle" onClick={() => onCompleted(id)} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{date}</span>
        </label>
        <button type="button" aria-label="Edit task" className="icon icon-edit" onClick={() => {}} />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
    </li>
  );
}

export default Task;
