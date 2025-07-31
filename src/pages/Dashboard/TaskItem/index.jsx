import React from "react";

export default function TaskItem({ task, onDelete }) {
  return (
    <div className="task-item">
      <div className="task-item-title" title={task.title}>
        {task.title}
      </div>
      <div className="task-item-desc" title={task.description}>
        {task.description}
      </div>
      <button className="task-delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}
