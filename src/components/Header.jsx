import React from "react";
import { Menu, Plus } from "lucide-react";

function Header(props) {
  const onOpenSidebar = props.onOpenSidebar;
  const onOpenCreateForm = props.onOpenCreateForm;

  return (
    <header className="top-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div>
          <h1 className="page-title">Task Overview</h1>
          <p className="page-subtitle">Manage your daily tasks and stay focused</p>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="add-task-btn"
          onClick={onOpenCreateForm}
        >
          <Plus size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}

export default Header;