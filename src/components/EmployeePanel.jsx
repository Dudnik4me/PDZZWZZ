const statuses = ["Nowe", "W trakcie", "Weryfikowane", "Zakończone", "Opóźnione"];

function EmployeePanel({ tasks, currentUser, onUpdateStatus }) {
  const employeeTasks = tasks.filter((task) => task.assignee === currentUser.name);

  return (
    <section className="view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Panel pracownika</p>
          <h3>Obsługa przypisanych zadań</h3>
        </div>
        <span className="status-pill">Zmiana statusów</span>
      </div>

      <div className="task-list">
        {employeeTasks.length === 0 && (
          <p className="empty-state">
            Brak zadań przypisanych do tego pracownika.
          </p>
        )}

        {employeeTasks.map((task) => (
          <article className="task-card" key={task.id}>
            <div className="task-card-header">
              <div>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
              </div>
              <span className={`badge ${task.status.toLowerCase().replaceAll(" ", "-")}`}>
                {task.status}
              </span>
            </div>

            <div className="task-meta">
              <span>Przypisano do: <strong>{task.assignee}</strong></span>
              <span>Priorytet: <strong>{task.priority}</strong></span>
              <span>Termin: <strong>{task.deadline}</strong></span>
            </div>

            <label className="status-change">
              Aktualny status
              <select
                value={task.status}
                onChange={(event) => onUpdateStatus(task.id, event.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}

export default EmployeePanel;
