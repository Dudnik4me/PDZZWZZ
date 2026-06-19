import { useEffect, useMemo, useState } from "react";
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

const APP_VERSION = "RBAC-2026-06-19";

const roleConfig = {
  Menedżer: {
    defaultView: "manager",
    label: "Tryb: Menedżer",
    views: ["dashboard", "manager", "notifications", "reports"]
  },
  Pracownik: {
    defaultView: "employee",
    label: "Tryb: Pracownik",
    views: ["dashboard", "employee", "notifications"]
  }
};

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "manager", label: "Panel menedżera", icon: ListTodo },
  { id: "employee", label: "Panel pracownika", icon: UserRound },
  { id: "notifications", label: "Powiadomienia", icon: Bell },
  { id: "reports", label: "Raporty", icon: BarChart3 }
];

function AccessDenied({ currentUser }) {
  return (
    <section className="view">
      <article className="panel access-denied">
        <h3>Brak dostępu do wybranego widoku</h3>
        <p>
          Konto <strong>{currentUser.name}</strong> ma rolę{" "}
          <strong>{currentUser.role}</strong>, dlatego nie może korzystać z tej
          funkcji.
        </p>
      </article>
    </section>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeView, setActiveView] = useState("dashboard");
  const [tasks, setTasks] = useState(initialTasks);
  const [notifications, setNotifications] = useState(initialNotifications);

  const employees = useMemo(
    () => initialUsers.filter((user) => user.role === "Pracownik"),
    []
  );

  const availableNavigation = useMemo(
    () =>
      currentUser
        ? navigation.filter((item) =>
            roleConfig[currentUser.role]?.views.includes(item.id)
          )
        : [],
    [currentUser]
  );

  const visibleTasks = useMemo(
    () =>
      currentUser?.role === "Pracownik"
        ? tasks.filter((task) => task.assignee === currentUser.name)
        : tasks,
    [currentUser, tasks]
  );

  const visibleNotifications = useMemo(
    () =>
      currentUser?.role === "Pracownik"
        ? notifications.filter(
            (notification) =>
              !notification.recipients ||
              notification.recipients.includes(currentUser.name)
          )
        : notifications,
    [currentUser, notifications]
  );

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveView(roleConfig[user.role]?.defaultView || "dashboard");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveView("dashboard");
  };

  const isManager = currentUser?.role === "Menedżer";
  const currentRoleConfig = currentUser ? roleConfig[currentUser.role] : null;

  useEffect(() => {
    if (
      currentUser &&
      currentRoleConfig &&
      !currentRoleConfig.views.includes(activeView)
    ) {
      setActiveView(currentRoleConfig.defaultView);
    }
  }, [activeView, currentRoleConfig, currentUser]);

  const addNotification = (type, message, recipients) => {
    const notification = {
      id: Date.now(),
      type,
      message,
      date: new Date().toISOString().slice(0, 10),
      read: false,
      recipients
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
      `Przypisano nowe zadanie: ${newTask.title} dla ${newTask.assignee}.`,
      [newTask.manager, newTask.assignee]
    );
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const task = tasks.find((item) => item.id === taskId);

    if (
      !task ||
      (currentUser?.role === "Pracownik" && task.assignee !== currentUser.name)
    ) {
      return;
    }

    setTasks((previous) =>
      previous.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );

    addNotification(
      "Zmiana statusu",
      `Zmieniono status zadania "${task.title}" na "${newStatus}".`,
      [task.manager, task.assignee]
    );
  };

  const deleteTask = (taskId) => {
    if (!isManager) {
      return;
    }

    const task = tasks.find((item) => item.id === taskId);
    setTasks((previous) => previous.filter((item) => item.id !== taskId));

    if (task) {
      addNotification(
        "Usunięcie zadania",
        `Usunięto zadanie: ${task.title}.`,
        [task.manager, task.assignee]
      );
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, read: true }))
    );
  };

  if (!currentUser) {
    return <LoginView users={initialUsers} onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return (
          <DashboardView
            tasks={visibleTasks}
            notifications={visibleNotifications}
            currentUser={currentUser}
          />
        );
      case "manager":
        if (!isManager) {
          return <AccessDenied currentUser={currentUser} />;
        }

        return (
          <ManagerPanel
            tasks={tasks}
            employees={employees}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
          />
        );
      case "employee":
        if (isManager) {
          return <AccessDenied currentUser={currentUser} />;
        }

        return (
          <EmployeePanel
            tasks={visibleTasks}
            currentUser={currentUser}
            onUpdateStatus={updateTaskStatus}
          />
        );
      case "notifications":
        return (
          <NotificationsView
            notifications={visibleNotifications}
            onMarkAllAsRead={markAllNotificationsAsRead}
          />
        );
      case "reports":
        if (!isManager) {
          return <AccessDenied currentUser={currentUser} />;
        }

        return <ReportsView tasks={tasks} users={initialUsers} />;
      default:
        return (
          <DashboardView
            tasks={visibleTasks}
            notifications={visibleNotifications}
            currentUser={currentUser}
          />
        );
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
          {availableNavigation.map((item) => {
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

        <button className="logout-button" onClick={handleLogout}>
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
            Frontend statyczny / {currentRoleConfig?.label}
          </div>
        </header>

        <div className="version-badge">Wersja aplikacji: {APP_VERSION}</div>

        {renderView()}
      </main>
    </div>
  );
}

export default App;
