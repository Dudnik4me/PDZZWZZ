import { Trash2 } from "lucide-react";

function TaskList({ tasks, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
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
            <span>Pracownik: <strong>{task.assignee}</strong></span>
            <span>Priorytet: <strong>{task.priority}</strong></span>
            <span>Termin: <strong>{task.deadline}</strong></span>
          </div>

          {onDeleteTask && (
            <button className="danger-button" onClick={() => onDeleteTask(task.id)}>
              <Trash2 size={16} />
              Usuń zadanie
            </button>
          )}
        </article>
      ))}
    </div>
  );
}

export default TaskList;