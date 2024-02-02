import React, {useState} from 'react'

export const EditTaskForm = ({editTask, task}) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = e => {
        e.preventDefault();
        editTask(value, task.id);
    }
    return (
        <form className="TaskForm" onSubmit={handleSubmit}>
            <input type="text" value={value} className="task-input" placeholder="Update Task" onChange={(e) => setValue(e.target.value)}/>
            <button type="submit" className="task-btn">Update Task</button>
        </form>
    )
}