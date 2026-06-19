import { AlertTriangle, CheckCircle2, Clock, ListChecks } from "lucide-react";

function DashboardView({ tasks, notifications }) {
  const countByStatus = (status) =>
    tasks.filter((task) => task.status === status).length;

  const completed = countByStatus("Zakończone");
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  const stats = [
    {
      label: "Wszystkie zadania",
      value: tasks.length,
      icon: ListChecks
    },
    {
      label: "W trakcie",
      value: countByStatus("W trakcie"),
      icon: Clock
    },
    {
      label: "Zakończone",
      value: completed,
      icon: CheckCircle2
    },
    {
      label: "Opóźnione",
      value: countByStatus("Opóźnione"),
      icon: AlertTriangle
    }
  ];

  return (
    <section className="view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h3>Aktualny stan pracy zespołu</h3>
        </div>
        <span className="status-pill">Postęp: {progress}%</span>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="stat-card" key={stat.label}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>
              <div>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            </article>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <h4>Realizacja zadań</h4>
          <div className="progress-wrapper">
            <div className="progress-bar">
              <div style={{ width: `${progress}%` }} />
            </div>
            <span>{completed} z {tasks.length} zadań zakończonych</span>
          </div>

          <div className="status-summary">
            <div>
              <strong>{countByStatus("Nowe")}</strong>
              <span>Nowe</span>
            </div>
            <div>
              <strong>{countByStatus("W trakcie")}</strong>
              <span>W trakcie</span>
            </div>
            <div>
              <strong>{countByStatus("Weryfikowane")}</strong>
              <span>Weryfikowane</span>
            </div>
            <div>
              <strong>{countByStatus("Opóźnione")}</strong>
              <span>Opóźnione</span>
            </div>
          </div>
        </article>

        <article className="panel">
          <h4>Ostatnie powiadomienia</h4>
          <div className="notification-list compact">
            {notifications.slice(0, 4).map((notification) => (
              <div className="notification-item" key={notification.id}>
                <strong>{notification.type}</strong>
                <p>{notification.message}</p>
                <span>{notification.date}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="panel">
        <h4>Ostatnie zadania</h4>
        <div className="table">
          <div className="table-row table-header">
            <span>Zadanie</span>
            <span>Pracownik</span>
            <span>Status</span>
            <span>Priorytet</span>
            <span>Termin</span>
          </div>

          {tasks.slice(0, 5).map((task) => (
            <div className="table-row" key={task.id}>
              <span>{task.title}</span>
              <span>{task.assignee}</span>
              <span>
                <span className={`badge ${task.status.toLowerCase().replaceAll(" ", "-")}`}>
                  {task.status}
                </span>
              </span>
              <span>{task.priority}</span>
              <span>{task.deadline}</span>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default DashboardView;