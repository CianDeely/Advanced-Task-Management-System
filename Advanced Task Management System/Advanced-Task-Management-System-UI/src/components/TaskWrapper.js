import React, { useState, useEffect } from "react";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { EditTaskForm } from "./EditTaskForm";
import Axios from "axios";
import StatusChart from "./StatusChart"; // Import the StatusChart component


export const TaskWrapper = () => {
  const [tasks, setTasks] = useState([]);
  const [statusCounts, setStatusCounts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = async (page) => {
    try {
      const response = await Axios.get(`https://localhost:7284/Task?page=${page}`);
      const data = response.data.tasks;
      // If data is empty, there are no more tasks
      setHasMore(data.length > 0);

      // If it's the first page or data is not empty, update tasks
      if (page === 1 || data.length > 0) {
        setTasks((prevTasks) => (page === 1 ? data : [...prevTasks, ...data]));
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks(page);
    fetchStatusCounts();
  }, [page]);

  const fetchStatusCounts = async () => {
    try {
      const response = await Axios.get("https://localhost:7284/Task");
      const data = response.data;
      // Check if 'statusCounts' property exists in 'data'
      if (data && data.statusCounts) {
        setStatusCounts(data.statusCounts);
      } else {
        console.error("Invalid data format or missing statusCounts property");
      }
    } catch (error) {
      console.error("Error fetching status counts:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, setPage]);

  const addTask = async (title, description, priority, dueDate, status) => {
    const newTask = { Id: 0, Title: title, Description: description, Priority: parseInt(priority), Due_Date: dueDate, Status: parseInt(status) }
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
      await Axios.delete(`https://localhost:7284/Task/tasks/${id}`).then(response => setTasks(tasks.filter((task) => task.id !== id)));
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

  const editTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: !task.isEditing } : task
      )
    );
  };
  

  const editTaskComplete = async (id, title, description, priority, due_date, status) => {
    const edittedTask = { Id: id, Title: title, Description: description, Priority: parseInt(priority), Due_Date: due_date, Status: parseInt(status) }
    try {
      await Axios.put(`https://localhost:7284/Task/tasks/${id}`, edittedTask).then(response => setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, id: id, title: title, description: description, priority: priority, due_date: due_date, status: status, isEditing: !task.isEditing } : task
        )
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  return (
    <div className="TaskWrapper">
    <h1>Task Management</h1>
    <div>
        <h2>Task Status Distribution</h2>
        <StatusChart id="StatusChart" statusCounts={statusCounts} /> {/* Render the StatusChart */}
      </div>
    <TaskForm addTask={addTask} />
    {tasks.map((task) =>
  task.isEditing ? (
    <EditTaskForm key={`edit_${task.id}`} editTask={editTask} task={task} editTaskComplete={editTaskComplete} />
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