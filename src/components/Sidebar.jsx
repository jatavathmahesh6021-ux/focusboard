import React from "react";
import { LayoutDashboard, CheckSquare, StickyNote, CheckCircle2, X } from "lucide-react";

function Sidebar(props) {
  const activeNav = props.activeNav;
  const setActiveNav = props.setActiveNav;
  const isOpen = props.isOpen;
  const onClose = props.onClose;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "All Tasks", icon: CheckSquare },
    { id: "notes", label: "Focus Notes", icon: StickyNote },
    { id: "completed", label: "Completed", icon: CheckCircle2 }
  ];

  function handleNavClick(itemId) {
    setActiveNav(itemId);
    if (onClose) {
      onClose();
    }
  }

  return (
    <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"} aria-label="Sidebar Navigation">
      <div className="sidebar-header">
        <div className="brand-box">
          <div className="brand-logo">FB</div>
          <span className="brand-name">FocusBoard</span>
        </div>
        <button
          type="button"
          className="close-sidebar-btn"
          onClick={onClose}
          aria-label="Close navigation menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map(function (item) {
            const IconComponent = item.icon;
            const isActive = activeNav === item.id;

            return (
              <li key={item.id} className="nav-item">
                <button
                  type="button"
                  className={isActive ? "nav-button nav-button-active" : "nav-button"}
                  onClick={function () {
                    handleNavClick(item.id);
                  }}
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-footer-text">FocusBoard Workspace</p>
      </div>
    </aside>
  );
}

export default Sidebar;