import React, { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import Priorities from '../Priorities.json';
import Statuses from '../Statuses.json';
{/* Pull in the enum values for priorities/statuses for use in generating the dropdowns */}

export const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState(""); {/* Initialize our variables to store new values of task attributes */}
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState(null)
    const [status, setStatus] = useState(null)
    const [dueDate, setDueDate] = useState("")
    const priorityPlaceholder = priority !== null ? `Priority: ${priority.display}` : 'Priority: Select a priority';
    const statusPlaceholder = status !== null ? `Status: ${status.display}` : 'Status: Select a status';
    {/* Place holders to store the display value of enums depending on if selected or not */}

    const handleSubmit = e => {
        e.preventDefault(); {/* Prevent default behaviour when submit button pressed */}
        const priorityDropdown = document.getElementById('priority-dropdown');
        const statusDropdown = document.getElementById('status-dropdown');
        {/* Grab dropdowns from the DOM so we can add/remove classes to them to draw users attention */}
        if (!priority) { {/* Alert user that the priority is mandatory */}
            priorityDropdown.classList.add("mandatory-field"); 
            setTimeout(function () {
                priorityDropdown.classList.remove("mandatory-field");
            }, 3000);
        } else if (!status) { {/* Alert user that the status is mandatory */}
            statusDropdown.classList.add("mandatory-field");
            setTimeout(function () {
                statusDropdown.classList.remove("mandatory-field");
            }, 3000);
        } else {
            if (priority.value == "2") { {/* Display simple modal checking if user really wants to make a high priority task */}
                if (window.confirm('Are you sure you wish to create a high priority task?')) {
                    addTask(title, description, priority.value, dueDate, status.value);
                    {/* Call the addTask function from TaskWrapper to commit the changes*/}
                    setTitle('');
                    setDescription('');
                    setPriority(null);
                    setDueDate('');
                    setStatus(null); {/* Reset variables after to avoid issues */}
                }
            } else {
                addTask(title, description, priority.value, dueDate, status.value);
                {/* Call the addTask function from TaskWrapper to commit the changes*/}
                setTitle('');
                setDescription('');
                setPriority(null);
                setDueDate('');
                setStatus(null); {/* Reset variables after to avoid issues */}
            }
        }
    }
    return (
        <form className="TaskForm" onSubmit={handleSubmit}> {/* Simple form to add the task, displays current values of the task */}
            <input required type="text" value={title} className="task-input" placeholder="Add a task title?" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" value={description} className="task-input" placeholder="Add an optional description" onChange={(e) => setDescription(e.target.value)} />
            <div id="priority-dropdown" className="dropdown-wrapper"> {/* Use our pregenerated placeholder to display different values */}
                <Dropdown className="task-dropdown" placement="right" size="lg" label={priorityPlaceholder} dismissOnClick={true}>
                    {Priorities.priorities.map((p) => (<Dropdown.Item className="task-dropdown-item" onClick={(e) => setPriority(p)}>{p.display}</Dropdown.Item>)
                    )}
                </Dropdown>
            </div>
            <input required type="date" value={dueDate} className="task-input" placeholder="Add a due date" onChange={(e) => setDueDate(e.target.value)} />
            <div id="status-dropdown" className="dropdown-wrapper"> {/* Use our pregenerated placeholder to display different values */}
                <Dropdown className="task-dropdown" placement="right" size="lg" label={statusPlaceholder} dismissOnClick={true}>
                    {Statuses.statuses.map((s) => (<Dropdown.Item className="task-dropdown-item" onClick={(e) => setStatus(s)}>{s.display}</Dropdown.Item>)
                    )}
                </Dropdown>
            </div>
            <button type="submit" className="task-btn">Add Task</button>
        </form>
    )
}