import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [taskStats, setTaskStats] = useState({
    completed: 0,
    pending: 0,
    inProgress: 0,
  });

  const fetchStats = async () => {
    try {
      const response = await API.get("/tasks/stats");
      setTaskStats(response.data); // Update the stats from the API response
    } catch (error) {
      console.error("Error fetching task stats:", error);
    }
  };

  useEffect(() => {
    fetchStats(); // Fetch stats on component load
  }, []);
  
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="task-stats">
        <p>Completed Tasks: {taskStats.completed}</p>
        <p>Pending Tasks: {taskStats.pending}</p>
        <p>In Progress Tasks: {taskStats.inProgress}</p>
      </div>
      <h2>All Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Created by: {task.createdBy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
