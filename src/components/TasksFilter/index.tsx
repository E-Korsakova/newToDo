import { ReactElement } from 'react';

import useToDoStore from '../../data/stores/useTodoStore.ts';

import './tasks-filter.css';

function TaskFilter(): ReactElement {
  const [filters, onFilter] = useToDoStore((state) => [state.filters, state.onFilter]);
  return (
    <ul className="filters">
      {filters.map((filter) => (
        <li key={filter.name}>
          <button
            type="button"
            className={filter.selected ? 'filter selected' : 'filter'}
            onClick={() => onFilter(filter.name)}
          >
            {filter.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskFilter;
