import TaskForm from "./TaskForm.jsx";
import TaskList from "./TaskList.jsx";

function ManagerPanel({ tasks, employees, onAddTask, onDeleteTask }) {
  return (
    <section className="view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Panel menedżera</p>
          <h3>Zarządzanie zadaniami zespołu</h3>
        </div>
        <span className="status-pill">Tryb: Menedżer</span>
      </div>

      <article className="panel">
        <h4>Dodanie i przypisanie zadania</h4>
        <TaskForm employees={employees} onAddTask={onAddTask} />
      </article>

      <article className="panel">
        <h4>Lista zadań</h4>
        <TaskList tasks={tasks} onDeleteTask={onDeleteTask} />
      </article>
    </section>
  );
}

export default ManagerPanel;