import React, { ReactElement, useState } from 'react';
import './new-task-form.css';

interface NewTaskFormProps {
  onAdd: (formData: { [key: string]: string }) => void;
}

function NewTaskForm({ onAdd }: NewTaskFormProps): ReactElement<NewTaskFormProps> {
  const [descriptionValue, setDescriptionValue] = useState('');
  const [minutesValue, setMinutesValue] = useState('');
  const [secondsValue, setSecondsValue] = useState('');

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form as HTMLFormElement);
        const formJson: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          formJson[key] = value.toString();
        });
        onAdd(formJson);
        setDescriptionValue('');
        setMinutesValue('');
        setSecondsValue('');
      }}
      className="new-todo-form"
    >
      <input
        type="text"
        name="description"
        className="new-todo"
        placeholder="What needs to be done?"
        value={descriptionValue}
        onChange={(evt) => {
          setDescriptionValue(evt.target.value);
        }}
      />
      <input
        className="new-todo-form__timer"
        name="minutes"
        placeholder="Min"
        value={minutesValue}
        onChange={(evt) => {
          let digitsValue = evt.target.value.replace(/[^0-9]/g, '');
          if (+digitsValue > 59) digitsValue = '59';
          setMinutesValue(digitsValue);
        }}
      />
      <input
        className="new-todo-form__timer"
        name="seconds"
        placeholder="Sec"
        value={secondsValue}
        onChange={(evt) => {
          let digitsValue = evt.target.value.replace(/[^0-9]/g, '');
          if (+digitsValue > 59) digitsValue = '59';
          setSecondsValue(digitsValue);
        }}
      />
      <button type="submit" style={{ display: 'none' }} />
    </form>
  );
}

export default NewTaskForm;
