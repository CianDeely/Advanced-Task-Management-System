import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import Priorities from '../Priorities.json';
import Statuses from '../Statuses.json';
{/* Pass in the task we are editting as well as the editTask and editTaskComplete functions */}
export const EditTaskForm = ({ editTask, task, editTaskComplete }) => {
  const [title, setTitle] = useState(''); {/* Initialize our variables to store new values of task attributes */}
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  const [dueDate, setDueDate] = useState(''); 
  const priorityPlaceholder = priority !== null ? `Priority: ${priority.display}` : 'Priority: Select a priority';
  const statusPlaceholder = status !== null ? `Status: ${status.display}` : 'Status: Select a status';
{/* Place holders to store the display value of enums depending on if selected or not */}

  const handleSubmit = (e) => {
    e.preventDefault(); {/* Prevent default behaviour when edit button pressed */}
    editTask(title, task.id);
  };

  const handleEditSubmit = e => {
    e.preventDefault(); {/* Prevent default behaviour when submit button pressed */}
    const editPriorityDropdown = document.getElementById('edit-priority-dropdown');
    const editStatusDropdown = document.getElementById('edit-status-dropdown');
    {/* Grab dropdowns from the DOM so we can add/remove classes to them to draw users attention */}
    if (!priority) { 
      editPriorityDropdown.classList.add("mandatory-field"); {/* Alert user that the priority is mandatory */}
      setTimeout(function () {
        editPriorityDropdown.classList.remove("mandatory-field");
      }, 3000);
    } else if (!status) { {/* Alert user that the status is mandatory */}
      editStatusDropdown.classList.add("mandatory-field");
      setTimeout(function () {
        editStatusDropdown.classList.remove("mandatory-field");
      }, 3000);
    } else {
      if (priority.value == "2") { {/* Display simple modal checking if user really wants to make a high priority task */}
        if (window.confirm('Are you sure you wish to upgrade this task to a high priority task?')) {
          editTaskComplete(task.id, title ? title : task.title, description ? description : task.description, priority.value ? priority.value : task.priority, dueDate ? dueDate : task.due_Date, status.value ? status.value : task.status)
          {/* Call editTaskComplete function from TaskWrapper to commit the changes*/}
          setTitle('');
          setDescription('');
          setPriority(null);
          setDueDate('');
          setStatus(null); {/* Reset variables after to avoid issues */}
        }
      } else {
        {/* Call editTaskComplete function from TaskWrapper to commit the changes*/}
        editTaskComplete(task.id, title ? title : task.title, description ? description : task.description, priority.value ? priority.value : task.priority, dueDate ? dueDate : task.due_Date, status.value ? status.value : task.status)
        setTitle('');
        setDescription('');
        setPriority(null);
        setDueDate('');
        setStatus(null); {/* Reset variables after to avoid issues */}
      }
    }
  }

  return (
    <form className="TaskForm" onSubmit={handleSubmit}> {/* Simple form to edit the task, displays current values of the task */}
      <input
        required
        type="text"
        defaultValue={task.title}
        className="task-input"
        placeholder={task.title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        defaultValue={task.description}
        className="task-input"
        placeholder={task.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div id="edit-priority-dropdown" className="dropdown-wrapper">
        <Dropdown
          className="task-dropdown"
          placement="right"
          size="lg"
          label={priorityPlaceholder} 
          dismissOnClick={true}
        >  {/* Use our pregenerated placeholder to display different values */}
          {Priorities.priorities.map((p) => (
            <Dropdown.Item
              key={p.id}
              className="task-dropdown-item"
              onClick={(e) => setPriority(p)}
            >
              {p.display}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <input
        required
        type="date"
        defaultValue={task.due_Date}
        className="task-input"
        placeholder={task.due_Date}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <div id="edit-status-dropdown" className="dropdown-wrapper">
        <Dropdown
          className="task-dropdown"
          placement="right"
          size="lg"
          label={statusPlaceholder}
          dismissOnClick={true}
        >
          {Statuses.statuses.map((s) => (
            <Dropdown.Item
              key={s.id}
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
        onClick={handleEditSubmit}
      >
        Update Task
      </button>
    </form>
  );
};
