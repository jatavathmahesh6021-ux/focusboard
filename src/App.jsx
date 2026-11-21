import React, { useState } from "react";
import { ListTodo, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import sampleTasks from "./data/sampleTasks";
import useLocalStorage from "./hooks/useLocalStorage";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", sampleTasks);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const totalTasks = tasks.length;

  let inProgressCount = 0;
  let completedCount = 0;

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].status === "In progress") {
      inProgressCount = inProgressCount + 1;
    }
    if (tasks[i].status === "Completed") {
      completedCount = completedCount + 1;
    }
  }

  let completionPercentage = 0;
  if (totalTasks > 0) {
    completionPercentage = Math.round((completedCount / totalTasks) * 100);
  }

  function handleNavChange(navId) {
    setActiveNav(navId);
    if (navId === "completed") {
      setStatusFilter("Completed");
    } else if (navId === "tasks" || navId === "dashboard") {
      setStatusFilter("All");
    }
  }

  function handleOpenCreateForm() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function handleOpenEditForm(task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
    setEditingTask(null);
  }

  function handleSaveTask(taskData) {
    if (editingTask) {
      const updatedTasks = tasks.map(function (item) {
        if (item.id === editingTask.id) {
          return {
            id: item.id,
            title: taskData.title,
            description: taskData.description,
            category: taskData.category,
            status: taskData.status,
            priority: taskData.priority,
            dueDate: taskData.dueDate
          };
        }
        return item;
      });
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        title: taskData.title,
        description: taskData.description,
        category: taskData.category,
        status: taskData.status,
        priority: taskData.priority,
        dueDate: taskData.dueDate
      };
      setTasks([newTask, ...tasks]);
    }
  }

  function handleRequestDelete(task) {
    setTaskToDelete(task);
  }

  function handleCancelDelete() {
    setTaskToDelete(null);
  }

  function handleConfirmDelete() {
    if (!taskToDelete) {
      return;
    }
    const remainingTasks = tasks.filter(function (item) {
      return item.id !== taskToDelete.id;
    });
    setTasks(remainingTasks);
    setTaskToDelete(null);
  }

  function handleStatusChange(taskId, newStatus) {
    const updatedTasks = tasks.map(function (item) {
      if (item.id === taskId) {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          status: newStatus,
          priority: item.priority,
          dueDate: item.dueDate
        };
      }
      return item;
    });
    setTasks(updatedTasks);
  }

  function handleResetFilters() {
    setSearchQuery("");
    setStatusFilter("All");
    setPriorityFilter("All");
    setActiveNav("dashboard");
  }

  const filteredTasks = tasks.filter(function (task) {
    const titleLower = task.title.toLowerCase();
    const queryLower = searchQuery.trim().toLowerCase();
    const matchesSearch = titleLower.includes(queryLower);

    const matchesStatus = statusFilter === "All" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="app-layout">
      {isSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={function () {
            setIsSidebarOpen(false);
          }}
        />
      )}

      <Sidebar
        activeNav={activeNav}
        setActiveNav={handleNavChange}
        isOpen={isSidebarOpen}
        onClose={function () {
          setIsSidebarOpen(false);
        }}
      />

      <div className="main-wrapper">
        <Header
          onOpenSidebar={function () {
            setIsSidebarOpen(true);
          }}
          onOpenCreateForm={handleOpenCreateForm}
        />

        <main className="main-content">
          <section className="stats-grid" aria-label="Task Statistics">
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={<ListTodo size={20} />}
              variant="blue"
            />
            <StatCard
              title="In Progress"
              value={inProgressCount}
              icon={<Clock size={20} />}
              variant="amber"
            />
            <StatCard
              title="Completed"
              value={completedCount}
              icon={<CheckCircle2 size={20} />}
              variant="green"
            />
            <StatCard
              title="Completion Rate"
              value={completionPercentage + "%"}
              icon={<TrendingUp size={20} />}
              variant="purple"
            />
          </section>

          <FocusNotes />

          <section className="tasks-section" aria-label="Task Management">
            <div className="tasks-toolbar">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              <FilterTabs
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                onResetFilters={handleResetFilters}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onEdit={handleOpenEditForm}
              onDelete={handleRequestDelete}
              onStatusChange={handleStatusChange}
            />
          </section>
        </main>
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      {taskToDelete && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-modal-title"
        >
          <div className="modal-content confirm-modal">
            <h2 id="delete-modal-title" className="modal-title">
              Delete Task
            </h2>
            <p className="confirm-text">
              Are you sure you want to delete "{taskToDelete.title}"? This action cannot be undone.
            </p>
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger"
                onClick={handleConfirmDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;