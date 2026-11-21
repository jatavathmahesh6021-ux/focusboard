import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

function TaskForm(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const onSave = props.onSave;
  const editingTask = props.editingTask;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Development");
  const [status, setStatus] = useState("To do");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(function () {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
      setCategory(editingTask.category || "Development");
      setStatus(editingTask.status || "To do");
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setCategory("Development");
      setStatus("To do");
      setPriority("Medium");
      setDueDate("");
    }
    setErrorMessage("");
  }, [editingTask, isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      setErrorMessage("Task title is required and cannot be empty.");
      return;
    }

    if (dueDate === "") {
      setErrorMessage("Please select a due date for the task.");
      return;
    }

    const taskData = {
      title: trimmedTitle,
      description: description.trim(),
      category: category,
      status: status,
      priority: priority,
      dueDate: dueDate
    };

    onSave(taskData);
    onClose();
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="form-modal-title">
      <div className="modal-content">
        <div className="modal-header">
          <h2 id="form-modal-title" className="modal-title">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close task form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {errorMessage !== "" && (
            <div className="form-error" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Title *
            </label>
            <input
              id="task-title"
              type="text"
              className="form-input"
              placeholder="Enter task title"
              value={title}
              onChange={function (e) {
                setTitle(e.target.value);
              }}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description
            </label>
            <textarea
              id="task-description"
              className="form-textarea"
              rows="3"
              placeholder="Enter task details (optional)"
              value={description}
              onChange={function (e) {
                setDescription(e.target.value);
              }}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <select
                id="task-category"
                className="form-select"
                value={category}
                onChange={function (e) {
                  setCategory(e.target.value);
                }}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="Research">Research</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-status" className="form-label">
                Status *
              </label>
              <select
                id="task-status"
                className="form-select"
                value={status}
                onChange={function (e) {
                  setStatus(e.target.value);
                }}
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-priority" className="form-label">
                Priority *
              </label>
              <select
                id="task-priority"
                className="form-select"
                value={priority}
                onChange={function (e) {
                  setPriority(e.target.value);
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label">
                Due Date *
              </label>
              <input
                id="task-due-date"
                type="date"
                className="form-input"
                value={dueDate}
                onChange={function (e) {
                  setDueDate(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingTask ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;