import React, { useState, useEffect, useCallback } from "react";
import API from "../utils/api";
import "../styles/Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await API.get(`/tasks?page=${page}`);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setLoading(true);
    try {
      await API.patch(`/tasks/${id}/status`, { status });
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTaskSubmit = async (id) => {
    try {
      await API.patch(`/tasks/${id}`, {
        title: editingTask.title,
        description: editingTask.description,
      });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Task Dashboard</h1>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) =>
            setNewTask({ ...newTask, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTask && editingTask._id === task._id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditTaskSubmit(editingTask._id);
                }}
              >
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, title: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  required
                />
                <button type="submit">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div
                  className={`task-status ${task.status.toLowerCase().replace(
                    " ",
                    "-"
                  )}`}
                >
                  {task.status || "Pending"}
                </div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <select
                  value={task.status || "Pending"}
                  onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                {loading && <p>Updating status...</p>}
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
