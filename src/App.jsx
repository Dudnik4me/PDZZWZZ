import { useMemo, useState } from "react";
import {
  LayoutDashboard,
  ListTodo,
  Bell,
  BarChart3,
  UserRound,
  LogOut
} from "lucide-react";

import LoginView from "./components/LoginView.jsx";
import DashboardView from "./components/DashboardView.jsx";
import ManagerPanel from "./components/ManagerPanel.jsx";
import EmployeePanel from "./components/EmployeePanel.jsx";
import NotificationsView from "./components/NotificationsView.jsx";
import ReportsView from "./components/ReportsView.jsx";

import {
  initialNotifications,
  initialTasks,
  initialUsers
} from "./data/mockData.js";

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "manager", label: "Panel menedżera", icon: ListTodo },
  { id: "employee", label: "Panel pracownika", icon: UserRound },
  { id: "notifications", label: "Powiadomienia", icon: Bell },
  { id: "reports", label: "Raporty", icon: BarChart3 }
];

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(initialNotifications);

  const employees = useMemo(
    () => initialUsers.filter((user) => user.role === "Pracownik"),
    []
  );

  const addNotification = (type, message) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      date: new Date().toISOString().slice(0, 10),
      read: false
    };

    setNotifications((previous) => [notification, ...previous]);
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      manager: currentUser?.name || "Michał Dudenko",
      status: "Nowe",
      createdAt: new Date().toISOString().slice(0, 10),
      ...taskData
    };

    setTasks((previous) => [newTask, ...previous]);
    addNotification(
      "Nowe zadanie",
      `Przypisano nowe zadanie: ${newTask.title} dla ${newTask.assignee}.`
    );
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    setTasks((previous) =>
      previous.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );

    if (task) {
      addNotification(
        "Zmiana statusu",
        `Zmieniono status zadania "${task.title}" na "${newStatus}".`
      );
    }
  };

  const deleteTask = (taskId) => {
    const task = tasks.find((item) => item.id === taskId);
    setTasks((previous) => previous.filter((item) => item.id !== taskId));

    if (task) {
      addNotification("Usunięcie zadania", `Usunięto zadanie: ${task.title}.`);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  if (!currentUser) {
    return <LoginView users={initialUsers} onLogin={setCurrentUser} />;
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView tasks={tasks} notifications={notifications} />;
      case "manager":
        return (
          <ManagerPanel
            tasks={tasks}
            employees={employees}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
          />
        );
      case "employee":
        return (
          <EmployeePanel
            tasks={tasks}
            currentUser={currentUser}
            onUpdateStatus={updateTaskStatus}
          />
        );
      case "notifications":
        return (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={markAllNotificationsAsRead}
          />
        );
      case "reports":
        return <ReportsView tasks={tasks} users={initialUsers} />;
      default:
        return <DashboardView tasks={tasks} notifications={notifications} />;
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">PZ</div>
          <div>
            <h1>TaskFlow Remote</h1>
            <p>Platforma zarządzania zadaniami</p>
          </div>
        </div>

        <nav className="nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={activeView === item.id ? "nav-item active" : "nav-item"}
                onClick={() => setActiveView(item.id)}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="user-card">
          <div className="avatar">{currentUser.name.charAt(0)}</div>
          <div>
            <strong>{currentUser.name}</strong>
            <span>{currentUser.role}</span>
          </div>
        </div>

        <button className="logout-button" onClick={() => setCurrentUser(null)}>
          <LogOut size={17} />
          Wyloguj
        </button>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Projekt PWST</p>
            <h2>Platforma do zarządzania zadaniami w zespołach zdalnych</h2>
          </div>
          <div className="topbar-badge">
            Frontend statyczny / dane demonstracyjne
          </div>
        </header>

        {renderView()}
      </main>
    </div>
  );
}

export default App;
