export const initialUsers = [
  {
    id: 1,
    name: "Michał Dudenko",
    role: "Menedżer",
    email: "michal.dudenko@example.com",
    password: "manager123"
  },
  {
    id: 2,
    name: "Anna Kowalska",
    role: "Pracownik",
    email: "anna.kowalska@example.com",
    password: "pracownik123"
  },
  {
    id: 3,
    name: "Piotr Nowak",
    role: "Pracownik",
    email: "piotr.nowak@example.com",
    password: "pracownik123"
  }
];

export const initialTasks = [
  {
    id: 1,
    title: "Przygotowanie widoku dashboardu",
    description: "Utworzenie panelu prezentującego postęp zadań i statusy.",
    assignee: "Anna Kowalska",
    manager: "Michał Dudenko",
    status: "W trakcie",
    priority: "Wysoki",
    deadline: "2026-06-05",
    createdAt: "2026-05-27"
  },
  {
    id: 2,
    title: "Implementacja raportu tygodniowego",
    description: "Przygotowanie widoku raportu z podsumowaniem pracy zespołu.",
    assignee: "Piotr Nowak",
    manager: "Michał Dudenko",
    status: "Nowe",
    priority: "Średni",
    deadline: "2026-06-10",
    createdAt: "2026-05-27"
  },
  {
    id: 3,
    title: "Obsługa powiadomień o zmianie statusu",
    description: "Dodanie komunikatów informujących o zmianach w zadaniach.",
    assignee: "Anna Kowalska",
    manager: "Michał Dudenko",
    status: "Zakończone",
    priority: "Krytyczny",
    deadline: "2026-05-30",
    createdAt: "2026-05-26"
  },
  {
    id: 4,
    title: "Konfiguracja integracji Slack",
    description: "Zasymulowanie kanału komunikacji dla powiadomień systemowych.",
    assignee: "Piotr Nowak",
    manager: "Michał Dudenko",
    status: "Opóźnione",
    priority: "Wysoki",
    deadline: "2026-05-24",
    createdAt: "2026-05-20"
  }
];

export const initialNotifications = [
  {
    id: 1,
    type: "Nowe zadanie",
    message: "Przypisano zadanie: Przygotowanie widoku dashboardu.",
    date: "2026-05-27",
    read: false
  },
  {
    id: 2,
    type: "Zmiana statusu",
    message: "Zadanie Obsługa powiadomień o zmianie statusu zostało zakończone.",
    date: "2026-05-27",
    read: false
  },
  {
    id: 3,
    type: "Termin",
    message: "Zbliża się termin realizacji zadania: Implementacja raportu tygodniowego.",
    date: "2026-05-27",
    read: true
  }
];
