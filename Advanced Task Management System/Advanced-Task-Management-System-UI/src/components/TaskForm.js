import React, {useState} from 'react';
import { Dropdown } from 'flowbite-react';
import Priorities from '../Priorities.json';
import Statuses from '../Statuses.json';

export const TaskForm = ({addTask}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("")
    const [status, setStatus] = useState("")
    const [dueDate, setDueDate] = useState("")
     
    const handleSubmit = e => {
        e.preventDefault();
        addTask(title, description, priority, dueDate, status);

        setTitle("")
    }
    return (
        <form className="TaskForm" onSubmit={handleSubmit}>
            <input type="text" value={title} className="task-input" placeholder="Add a task title?" onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" value={description} className="task-input" placeholder="Add an optional description" onChange={(e) => setDescription(e.target.value)}/>
            <div className="dropdown-wrapper">
            <Dropdown className="task-dropdown" placement="right" size="lg" label={"Priority: " + priority} dismissOnClick={true}>
                {Priorities.priorities.map((p) => (<Dropdown.Item className="task-dropdown-item" onClick={(e) => setPriority(p.display)}>{p.display}</Dropdown.Item>)
                )}
            </Dropdown>
            </div>
            <input type="date" value={dueDate} className="task-input" placeholder="Add a due date" onChange={(e) => setDueDate(e.target.value)}/>
            <div className="dropdown-wrapper">
            <Dropdown className="task-dropdown" placement="right" size="lg" label={"Status: " + status} dismissOnClick={true}>
                {Statuses.statuses.map((s) => (<Dropdown.Item className="task-dropdown-item" onClick={(e) => setStatus(s.display)}>{s.display}</Dropdown.Item>)
                )}
            </Dropdown>
            </div>
            <button type="submit" className="task-btn">Add Task</button>
        </form>
    )
}