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

  const handleEditSubmit = e => {
    e.preventDefault();
    const editPriorityDropdown = document.getElementById('edit-priority-dropdown');
    const editStatusDropdown = document.getElementById('edit-status-dropdown');
    if(!priority) {
      editPriorityDropdown.classList.add("mandatory-field");
        setTimeout(function() {
          editPriorityDropdown.classList.remove("mandatory-field");
        }, 3000);
    } else if(!status){
      editStatusDropdown.classList.add("mandatory-field");
        setTimeout(function() {
          editStatusDropdown.classList.remove("mandatory-field");
        }, 3000);
    } else{
      if(priority.value == "2"){
        if (window.confirm('Are you sure you wish to upgrade this task to a high priority task?')){
          editTaskComplete(task.id, title ? title : task.title, description ? description : task.description, priority.value ? priority.value : task.priority, dueDate ? dueDate : task.due_Date, status.value ? status.value : task.status)
          setTitle('');
          setDescription('');
          setPriority(null);
          setDueDate('');
          setStatus(null);
        }
    } else {
      editTaskComplete(task.id, title ? title : task.title, description ? description : task.description, priority.value ? priority.value : task.priority, dueDate ? dueDate : task.due_Date, status.value ? status.value : task.status)
      setTitle('');
      setDescription('');
      setPriority(null);
      setDueDate('');
      setStatus(null);
    }
 }
}
  
  return (
    <form className="TaskForm" onSubmit={handleSubmit}>
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
        >
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
        value={task.due_Date}
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
