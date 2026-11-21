import React from "react";
import TaskCard from "./TaskCard";
import { ClipboardList } from "lucide-react";

function TaskList(props) {
  const tasks = props.tasks;
  const onEdit = props.onEdit;
  const onDelete = props.onDelete;
  const onStatusChange = props.onStatusChange;

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <ClipboardList size={42} className="empty-icon" />
        <h3 className="empty-title">No tasks found</h3>
        <p className="empty-text">
          Try changing your search or filters, or click Add Task to create a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(function (task) {
        return (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}

export default TaskList;