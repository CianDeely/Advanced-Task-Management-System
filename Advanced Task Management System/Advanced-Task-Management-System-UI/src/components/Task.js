import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Task = ({task, deleteTask, editTask, toggleComplete}) => {
  const getPriorityString = (priority) => {
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

  const getStatusString = (status) => {
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
    <div className="Task">
        <p className={getStatusString(task.status) + " " + getPriorityString(task.priority)} onClick={() => toggleComplete(task.id, task.title, task.description, task.priority, task.due_Date, task.status)}>{task.title}</p>
        <p className="task-description">Description: {task.description}</p>
        <p>Priority: {task.priority} {getPriorityString(task.priority)}</p>
        <p>Due date: {task.due_Date}</p>
        <p>Status: {task.status} {getStatusString(task.status)}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTask(task.id)} />
        </div>
    </div>
  )
}