import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import Priorities from '../Priorities.json';
import Statuses from '../Statuses.json';

export const EditTaskForm = ({ editTask, task, editTaskComplete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [dueDate, setDueDate] = useState('');

  const priorityPlaceholder = priority !== null ? `Priority: ${priority.display}` : 'Priority: Select a priority';
  const statusPlaceholder = status !== null ? `Status: ${status.display}` : 'Status: Select a status';

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(title, task.id);
  };

  return (
    <form className="TaskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        className="task-input"
        placeholder={task.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={description}
        className="task-input"
        placeholder={task.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="dropdown-wrapper">
        <Dropdown
          className="task-dropdown"
          placement="right"
          size="lg"
          label={priorityPlaceholder}
          dismissOnClick={true}
        >
          {Priorities.priorities.map((p) => (
            <Dropdown.Item
              className="task-dropdown-item"
              onClick={(e) => setPriority(p)}
            >
              {p.display}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <input
        type="date"
        value={dueDate}
        className="task-input"
        placeholder={task.dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div className="dropdown-wrapper">
        <Dropdown
          className="task-dropdown"
          placement="right"
          size="lg"
          label={statusPlaceholder}
          dismissOnClick={true}
        >
          {Statuses.statuses.map((s) => (
            <Dropdown.Item
              className="task-dropdown-item"
              onClick={(e) => setStatus(s)}
            >
              {s.display}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <button
        type="submit"
        className="task-btn"
        onClick={() =>
          editTaskComplete(task.id, title, description, priority.value, dueDate, status.value)
        }
      >
        Update Task
      </button>
    </form>
  );
};
