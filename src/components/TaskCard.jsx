import React from "react";
import { Calendar, Edit2, Trash2, Tag } from "lucide-react";

function TaskCard(props) {
  const task = props.task;
  const onEdit = props.onEdit;
  const onDelete = props.onDelete;
  const onStatusChange = props.onStatusChange;

  function handleStatusSelect(event) {
    onStatusChange(task.id, event.target.value);
  }

  function getPriorityClass(priority) {
    if (priority === "High") {
      return "badge priority-high";
    } else if (priority === "Medium") {
      return "badge priority-medium";
    } else {
      return "badge priority-low";
    }
  }

  function getStatusClass(status) {
    if (status === "Completed") {
      return "status-badge status-completed";
    } else if (status === "In progress") {
      return "status-badge status-progress";
    } else {
      return "status-badge status-todo";
    }
  }

  return (
    <article className="task-card">
      <div className="task-card-header">
        <div className="task-badges">
          <span className={getStatusClass(task.status)}>{task.status}</span>
          <span className={getPriorityClass(task.priority)}>{task.priority} Priority</span>
          {task.category && (
            <span className="badge category-badge">
              <Tag size={12} />
              <span>{task.category}</span>
            </span>
          )}
        </div>

        <div className="task-actions">
          <button
            type="button"
            className="icon-action-btn edit-btn"
            onClick={function () {
              onEdit(task);
            }}
            aria-label={"Edit task " + task.title}
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            className="icon-action-btn delete-btn"
            onClick={function () {
              onDelete(task);
            }}
            aria-label={"Delete task " + task.title}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="task-card-body">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>

      <div className="task-card-footer">
        <div className="task-due-date">
          <Calendar size={15} />
          <span>Due: {task.dueDate}</span>
        </div>

        <div className="task-status-control">
          <label htmlFor={"status-select-" + task.id} className="sr-only">
            Change status for {task.title}
          </label>
          <select
            id={"status-select-" + task.id}
            className="card-status-select"
            value={task.status}
            onChange={handleStatusSelect}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;