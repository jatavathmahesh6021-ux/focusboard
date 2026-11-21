import React from "react";
import { RotateCcw } from "lucide-react";

function FilterTabs(props) {
  const statusFilter = props.statusFilter;
  const setStatusFilter = props.setStatusFilter;
  const priorityFilter = props.priorityFilter;
  const setPriorityFilter = props.setPriorityFilter;
  const onResetFilters = props.onResetFilters;

  const statusOptions = ["All", "To do", "In progress", "Completed"];

  function handlePriorityChange(event) {
    setPriorityFilter(event.target.value);
  }

  return (
    <div className="filter-controls">
      <div className="status-tabs" role="tablist" aria-label="Filter by task status">
        {statusOptions.map(function (status) {
          const isActive = statusFilter === status;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={isActive ? "status-tab status-tab-active" : "status-tab"}
              onClick={function () {
                setStatusFilter(status);
              }}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="priority-filter-box">
        <label htmlFor="priority-select" className="filter-label">
          Priority:
        </label>
        <select
          id="priority-select"
          className="priority-select"
          value={priorityFilter}
          onChange={handlePriorityChange}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          type="button"
          className="reset-filter-btn"
          onClick={onResetFilters}
          aria-label="Reset all filters"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
}

export default FilterTabs;