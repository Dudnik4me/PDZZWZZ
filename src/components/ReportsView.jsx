function ReportsView({ tasks, users }) {
  const employees = users.filter((user) => user.role === "Pracownik");

  const completed = tasks.filter((task) => task.status === "Zakończone").length;
  const delayed = tasks.filter((task) => task.status === "Opóźnione").length;
  const inProgress = tasks.filter((task) => task.status === "W trakcie").length;

  return (
    <section className="view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Raporty</p>
          <h3>Raport tygodniowy i statystyki pracowników</h3>
        </div>
        <span className="status-pill">Raport demonstracyjny</span>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <div>
            <span>Zakończone zadania</span>
            <strong>{completed}</strong>
          </div>
        </article>

        <article className="stat-card">
          <div>
            <span>Zadania w trakcie</span>
            <strong>{inProgress}</strong>
          </div>
        </article>

        <article className="stat-card">
          <div>
            <span>Zadania opóźnione</span>
            <strong>{delayed}</strong>
          </div>
        </article>

        <article className="stat-card">
          <div>
            <span>Liczba pracowników</span>
            <strong>{employees.length}</strong>
          </div>
        </article>
      </div>

      <article className="panel">
        <h4>Statystyki pracowników</h4>
        <div className="table">
          <div className="table-row table-header">
            <span>Pracownik</span>
            <span>Wszystkie</span>
            <span>Zakończone</span>
            <span>W trakcie</span>
            <span>Opóźnione</span>
          </div>

          {employees.map((employee) => {
            const employeeTasks = tasks.filter(
              (task) => task.assignee === employee.name
            );

            return (
              <div className="table-row" key={employee.id}>
                <span>{employee.name}</span>
                <span>{employeeTasks.length}</span>
                <span>
                  {employeeTasks.filter((task) => task.status === "Zakończone").length}
                </span>
                <span>
                  {employeeTasks.filter((task) => task.status === "W trakcie").length}
                </span>
                <span>
                  {employeeTasks.filter((task) => task.status === "Opóźnione").length}
                </span>
              </div>
            );
          })}
        </div>
      </article>

      <article className="panel">
        <h4>Zadania opóźnione</h4>
        {tasks.filter((task) => task.status === "Opóźnione").length === 0 ? (
          <p className="empty-state">Brak zadań opóźnionych.</p>
        ) : (
          <div className="task-list">
            {tasks
              .filter((task) => task.status === "Opóźnione")
              .map((task) => (
                <div className="task-card" key={task.id}>
                  <div className="task-card-header">
                    <div>
                      <h4>{task.title}</h4>
                      <p>{task.description}</p>
                    </div>
                    <span className="badge opóźnione">Opóźnione</span>
                  </div>
                  <div className="task-meta">
                    <span>Pracownik: <strong>{task.assignee}</strong></span>
                    <span>Termin: <strong>{task.deadline}</strong></span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </article>
    </section>
  );
}

export default ReportsView;