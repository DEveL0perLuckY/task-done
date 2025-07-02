import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onEdit, onDelete, darkMode }) {
  if (!tasks.length) return <p className="text-gray-500">No tasks to show</p>;

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
}
