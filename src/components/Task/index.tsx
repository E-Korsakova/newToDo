import { ReactElement } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

interface TaskProps {
  id: string;
  description: string;
  created: number;
  editing: boolean;
  completed: boolean;
  onEdited: (id: string, description: string) => void;
  onEditing: (id: string) => void;
  onCompleted: (id: string) => void;
  onDeleted: (id: string) => void;
}

function Task({
  id,
  description,
  created,
  editing,
  completed,
  onEdited,
  onEditing,
  onDeleted,
  onCompleted,
}: TaskProps): ReactElement<TaskProps> {
  let classNames = 'active';

  const date = formatDistanceToNow(new Date(created), { includeSeconds: true, addSuffix: true });

  if (completed) classNames = 'completed';
  if (editing) classNames = 'editing';
  return (
    <li className={classNames}>
      <div className="view">
        <input type="checkbox" className="toggle" onClick={() => onCompleted(id)} />
        <label>
          <span className="description">{description}</span>
          <span className="created">{date}</span>
        </label>
        <button
          type="button"
          aria-label="Edit task"
          className="icon icon-edit"
          onClick={() => {
            onEditing(id);
          }}
        />
        <button type="button" aria-label="Delete task" className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </div>
      {editing && (
        <input
          type="text"
          className="edit"
          defaultValue={description}
          onChange={(evt) => onEdited(id, evt.target.value)}
          onKeyDown={(evt) => {
            if (evt.key === 'Enter') {
              onEditing(id);
            }
          }}
        />
      )}
    </li>
  );
}

export default Task;
