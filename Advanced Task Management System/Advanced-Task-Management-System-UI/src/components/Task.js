import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { format } from 'date-fns'; 
{/* Import a date formatting tool for the due dates */}

export const Task = ({task, deleteTask, editTask, toggleComplete}) => {
  const getPriorityString = (priority) => { {/* Helper function to convert the priority enum value to a string for display */}
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return 'Select a priority';
    }
  };

  const getStatusString = (status) => { {/* Helper function to convert the status enum value to a string for display */}
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'In-Progress';
      case 2:
        return 'Completed';
      case 3:
        return 'Archived'
      default:
        return 'Select a status';
    }
  };

  return (
    <div className="Task"> {/* Display each property of the task in the browser */}
        <h1 className={getStatusString(task.status) + " " + getPriorityString(task.priority)} onClick={() => toggleComplete(task.id, task.title, task.description, task.priority, task.due_Date, task.status)}>{task.title}</h1>
        {/* Get the status and priority strings and add to className so we can display custom styling depending on the status/styling */}
        <p className="task-description">Description: {task.description}</p>
        <p>Priority: {getPriorityString(task.priority)}</p>
        <p>Due date: {format(task.due_Date, 'MMMM do yyyy')}</p>
        <p>Status: {getStatusString(task.status)}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => { if (window.confirm('Are you sure you wish to delete this task?')) deleteTask(task.id) } } />
        {/* Simple modal prompt to check if users really want to delete a task */}
        </div>
    </div>
  )
}