import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { addTask } from "../../../services/tasks";

export default function TaskForm({ onTaskAdded }) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title) return setError("Title is required");
    setLoading(true);
    try {
      await addTask({ title, description, user_id: user.id });
      setTitle("");
      setDescription("");
      if (onTaskAdded) onTaskAdded();
    } catch (err) {
      setError(err.message || "Error adding task");
    }
    setLoading(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        maxLength={100}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        maxLength={300}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
