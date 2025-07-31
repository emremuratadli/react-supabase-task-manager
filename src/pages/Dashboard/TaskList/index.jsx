import React from "react";
import TaskItem from "../TaskItem";

export default function TaskList({ tasks, loading, onDelete }) {
  if (loading) return <div>Loading...</div>;
  if (!tasks.length) return <div>No tasks found.</div>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
}
