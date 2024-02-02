import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Task = ({task, deleteTask, editTask, toggleComplete}) => {
  return (
    <div className="Task">
        <p className={`${task.completed ? "completed" : "incompleted"}`} onClick={() => toggleComplete(task.id)}>{task.task}</p>
        <p className="task-description">Description: {task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Due date: {task.dueDate}</p>
        <p>Status: {task.status}</p>
        <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} onClick={() => editTask(task.id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTask(task.id)} />
        </div>
    </div>
  )
}