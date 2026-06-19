import { useState } from "react";
import { CheckCircle2, Lock, Mail } from "lucide-react";

function LoginView({ users, onLogin }) {
  const [email, setEmail] = useState(users[0]?.email || "");
  const [password, setPassword] = useState(users[0]?.password || "");
  const [error, setError] = useState("");

  const demoAccounts = [
    users.find((user) => user.role === "Menedżer"),
    users.find((user) => user.role === "Pracownik")
  ].filter(Boolean);

  const fillDemoCredentials = (user) => {
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user = users.find(
      (item) => item.email === email.trim() && item.password === password
    );

    if (!user) {
      setError("Nieprawidłowy login lub hasło dla konta demonstracyjnego.");
      return;
    }

    setError("");
    onLogin(user);
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="hero-badge">Frontend aplikacji</div>
        <h1>Platforma do zarządzania zadaniami w zespołach zdalnych</h1>
        <p>
          Interfejs webowy przygotowany na podstawie dokumentacji projektowej,
          modelu dziedziny, wymagań oraz zaprojektowanych widoków systemu.
        </p>

        <div className="hero-list">
          <div>
            <CheckCircle2 size={20} />
            Zarządzanie zadaniami i przypisaniami
          </div>
          <div>
            <CheckCircle2 size={20} />
            Dashboard postępów i statusów
          </div>
          <div>
            <CheckCircle2 size={20} />
            Powiadomienia oraz raportowanie
          </div>
        </div>
      </section>

      <section className="login-card">
        <h2>Logowanie demonstracyjne</h2>
        <p>
          Zaloguj się jednym z kont testowych, aby przejść do działającego
          prototypu aplikacji.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Adres e-mail
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="np. michal.dudenko@example.com"
              />
            </div>
          </label>

          <label>
            Hasło
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Wpisz hasło"
              />
            </div>
          </label>

          {error && <div className="form-error">{error}</div>}

          <button className="primary-button" type="submit">
            Zaloguj do aplikacji
          </button>
        </form>

        <div className="demo-accounts">
          <h3>Konta do sprawdzenia aplikacji</h3>
          {demoAccounts.map((user) => (
            <button
              className="demo-account"
              key={user.id}
              type="button"
              onClick={() => fillDemoCredentials(user)}
            >
              <span>
                <strong>{user.role}</strong>
                {user.email}
              </span>
              <code>{user.password}</code>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LoginView;
