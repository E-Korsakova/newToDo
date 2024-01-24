import { ReactElement, useEffect, useRef, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

interface TaskProps {
  id: string;
  description: string;
  minutes: number;
  seconds: number;
  created: number;
  editing: boolean;
  completed: boolean;
  onEdited: (id: string, description: string) => void;
  onEditing: (id: string) => void;
  onCompleted: (id: string) => void;
  onDeleted: (id: string) => void;
}

function useNow(updateInterval: number, enabled: number | undefined, cb?: (time: number) => void) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!enabled) return;

    setNow(Date.now());
    cbRef.current?.(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
      cbRef.current?.(Date.now());
    }, updateInterval);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(interval);
    };
  }, [updateInterval, enabled]);
  return now;
}

function Task({
  id,
  description,
  minutes,
  seconds,
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
  const editDescriptionRef = useRef<HTMLInputElement>(null);
  if (completed) classNames = 'completed';
  if (editing) classNames = 'editing';
  useEffect(() => {
    if (editing) {
      editDescriptionRef?.current?.focus();
    }
  }, [editing]);

  const allSeconds = minutes * 60 + +seconds;
  const [startAt, setStartAt] = useState<number | undefined>();
  const [initialTimer, setInitialTimer] = useState(0);

  const now = useNow(1000, startAt);

  const fromStart = now - (startAt && startAt < now ? startAt : now);

  const timer = fromStart + initialTimer;

  if (startAt && Math.floor(timer / 1000) > allSeconds) {
    setStartAt(undefined);
    setInitialTimer(0);
  }

  const timerDown = Math.max(0, allSeconds - Math.floor(timer / 1000));

  return (
    <li className={classNames}>
      <div className="view">
        <input type="checkbox" className="toggle" onClick={() => onCompleted(id)} />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <div>
              <button
                type="button"
                className="icon icon-play"
                onClick={() => {
                  if (!startAt) setStartAt(Date.now());
                }}
              />
              <button
                type="button"
                className="icon icon-pause"
                onClick={() => {
                  if (startAt) {
                    setInitialTimer(timer);
                    setStartAt(undefined);
                  }
                }}
              />
            </div>
            {`${String(Math.floor(timerDown / 60)).padStart(2, '0')}:${String(timerDown % 60).padStart(2, '0')}`}
          </span>
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
          ref={editDescriptionRef}
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
