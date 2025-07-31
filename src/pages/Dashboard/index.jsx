import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import SignOutButton from "./SignOutButton";
import { useAuth } from "../../context/AuthContext";
import { fetchTasks, deleteTask } from "../../services/tasks";

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true";
  });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  if (!user) return null;

  // Dark mode toggle
  // Dark mode toggle (persisted)
  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Tasks fetch
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks(user.id);
      setTasks(data);
    } catch (e) {}
    setLoading(false);
  };

  // Delete handler
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteTask(id);
      await loadTasks();
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadTasks();
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="dashboard-container wide">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard</h1>
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <span style={{ fontSize: 28, fontWeight: 700 }}>&#9776;</span>
        </button>
      </div>

      {/* Sidebar / Drawer */}
      <div className={`sidebar-drawer${sidebarOpen ? " open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        >
          &times;
        </button>
        <div className="sidebar-content">
          <SignOutButton />
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode((d) => !d)}
          >
            Switch Theme
          </button>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <TaskForm onTaskAdded={loadTasks} />
      <TaskList tasks={tasks} loading={loading} onDelete={handleDelete} />
    </div>
  );
}
