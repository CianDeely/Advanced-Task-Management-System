import React, { useState } from "react";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { v4 as uuidv4 } from "uuid";
import { EditTaskForm } from "./EditTaskForm";

export const TaskWrapper = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (title, description, priority, dueDate, status) => {
    setTasks([
      ...tasks,
      { id: uuidv4(), task: title, description: description, priority: priority, dueDate: dueDate, status: status, completed: false, isEditing: false },
    ]);
  }

  const deleteTask = (id) => 
    setTasks(tasks.filter((task) => task.id !== id));

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const editTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  // const editTask = (task, id) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, task, isEditing: !task.isEditing } : task
  //     )
  //   );
  // };

  return (
    <div className="TaskWrapper">
      <h1>Task Management</h1>
      <TaskForm addTask={addTask} />
      {tasks.map((task) =>
        task.isEditing ? (
          <EditTaskForm editTask={editTask} task={task} />
        ) : (
          <Task
            key={task.id}
            task={task}
            description={task.description}
            priority={task.priority}
            dueDate={task.dueDate}
            status={task.status}
            deleteTask={deleteTask}
            editTask={editTask}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};