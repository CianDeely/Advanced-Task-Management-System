import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { v4 as uuidv4 } from "uuid";
import { EditTaskForm } from "./EditTaskForm";
import Axios from "axios";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

export const TaskWrapper = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await Axios.get(
      "https://localhost:7284/Task"
    );
    const tasks = data;
    setTasks(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (title, description, priority, dueDate, status) => {
    const newTask = { Id: 0, Title: title, Description: description, Priority: parseInt(priority), Due_Date: dueDate, Status: parseInt(status) }
    console.log(newTask);
    try {
    const response = await Axios.post("https://localhost:7284/Task", newTask).then(response => setTasks([
      ...tasks,
      response.data,
    ]))
    } catch (error) {
      console.error("Error creating task:", error);
    }
  }

  const deleteTask = async (id) => {
    try {
      await Axios.delete(`https://localhost:7284/Task/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const toggleComplete = async (id, title, description, priority, due_date, status) => {
    const edittedTask = { Id: id, Title: title, Description: description, Priority: parseInt(priority), Due_Date: due_date, Status: parseInt(status) }
    if(status != 2){
      edittedTask.status = 2;
    } else {
      edittedTask.status = 0;
    }
    try {
      await Axios.put(`https://localhost:7284/Task/tasks/${id}`, edittedTask).then(response =>  setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: edittedTask.status } : task
        )
      ));
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: edittedTask.status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const editTask = async (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  }

  const editTaskComplete = async (id, title, description, priority, due_date, status) => {
    const edittedTask = { Id: id, Title: title, Description: description, Priority: parseInt(priority), Due_Date: due_date, Status: parseInt(status) }
    try {
      await Axios.put(`https://localhost:7284/Task/tasks/${id}`, edittedTask).then(response => setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isEditing: !task.isEditing } : task
        )
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <div className="TaskWrapper">
      <h1>Task Management</h1>
      <TaskForm addTask={addTask} />
      {tasks.map((task) =>
        task.isEditing ? (
          <EditTaskForm editTask={editTask} task={task} editTaskComplete={editTaskComplete} />
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