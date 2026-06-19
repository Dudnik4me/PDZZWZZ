import { BellRing, CheckCheck } from "lucide-react";

function NotificationsView({ notifications, onMarkAllAsRead }) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <section className="view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Powiadomienia</p>
          <h3>Centrum komunikatów systemowych</h3>
        </div>
        <button className="secondary-button" onClick={onMarkAllAsRead}>
          <CheckCheck size={17} />
          Oznacz jako odczytane
        </button>
      </div>

      <article className="panel notification-summary">
        <BellRing size={26} />
        <div>
          <strong>{unreadCount}</strong>
          <span>nieodczytane powiadomienia</span>
        </div>
      </article>

      <div className="notification-list">
        {notifications.map((notification) => (
          <article
            className={notification.read ? "notification-item read" : "notification-item"}
            key={notification.id}
          >
            <div>
              <strong>{notification.type}</strong>
              <p>{notification.message}</p>
            </div>
            <span>{notification.date}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default NotificationsView;