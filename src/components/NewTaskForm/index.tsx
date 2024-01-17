import { ReactElement, useState } from 'react';
import './new-task-form.css';

interface NewTaskFormProps {
  onAdd: (description: string) => void;
}

function NewTaskForm({ onAdd }: NewTaskFormProps): ReactElement<NewTaskFormProps> {
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(evt) => {
          setInputValue(evt.target.value);
        }}
        onKeyDown={(evt) => {
          if (evt.key === 'Enter') {
            onAdd(inputValue);
            setInputValue('');
          }
        }}
      />
    </div>
  );
}

export default NewTaskForm;
