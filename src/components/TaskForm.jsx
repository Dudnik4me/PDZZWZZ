import { useState } from "react";

function TaskForm({ employees, onAddTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: employees[0]?.name || "",
    priority: "Średni",
    deadline: ""
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.deadline) {
      return;
    }

    onAddTask(formData);

    setFormData({
      title: "",
      description: "",
      assignee: employees[0]?.name || "",
      priority: "Średni",
      deadline: ""
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Tytuł zadania
          <input
            value={formData.title}
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="np. Przygotowanie raportu"
          />
        </label>

        <label>
          Pracownik
          <select
            value={formData.assignee}
            onChange={(event) => updateField("assignee", event.target.value)}
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.name}>
                {employee.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Priorytet
          <select
            value={formData.priority}
            onChange={(event) => updateField("priority", event.target.value)}
          >
            <option>Niski</option>
            <option>Średni</option>
            <option>Wysoki</option>
            <option>Krytyczny</option>
          </select>
        </label>

        <label>
          Termin realizacji
          <input
            type="date"
            value={formData.deadline}
            onChange={(event) => updateField("deadline", event.target.value)}
          />
        </label>
      </div>

      <label>
        Opis zadania
        <textarea
          value={formData.description}
          onChange={(event) => updateField("description", event.target.value)}
          placeholder="Krótki opis zakresu prac"
        />
      </label>

      <button className="primary-button" type="submit">
        Dodaj i przypisz zadanie
      </button>
    </form>
  );
}

export default TaskForm;