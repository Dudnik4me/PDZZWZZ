# Wdrożenie frontendu na GitHub Pages

Projekt jest statycznym frontendem React/Vite przygotowanym jako działający prototyp aplikacji „Platforma do zarządzania zadaniami w zespołach zdalnych”.

## Konta demonstracyjne

| Rola | Login | Hasło | Dostęp w aplikacji |
| --- | --- | --- | --- |
| Menedżer | `michal.dudenko@example.com` | `manager123` | Panel menedżera, dashboard, powiadomienia, raporty |
| Pracownik | `anna.kowalska@example.com` | `pracownik123` | Panel pracownika, dashboard, powiadomienia |
| Pracownik | `piotr.nowak@example.com` | `pracownik123` | Panel pracownika, dashboard, powiadomienia |

## Funkcjonalności dostępne w prototypie

- logowanie demonstracyjne dla roli menedżera i pracownika,
- dashboard z podsumowaniem zadań — dla menedżera obejmuje zespół, a dla pracownika tylko jego zadania,
- dodawanie, przypisywanie i usuwanie zadań przez menedżera,
- zmiana statusu zadania w panelu pracownika,
- generowanie powiadomień po zmianach w zadaniach — pracownik widzi powiadomienia dotyczące swoich zadań,
- widok raportów i statystyk pracy zespołu dostępny wyłącznie dla menedżera.

## Różnice między rolami

| Funkcja | Menedżer | Pracownik |
| --- | --- | --- |
| Dashboard | Widzi zadania całego zespołu | Widzi tylko własne zadania |
| Panel menedżera | Ma dostęp | Brak dostępu |
| Dodawanie zadań | Może dodawać i przypisywać zadania | Brak dostępu |
| Usuwanie zadań | Może usuwać zadania | Brak dostępu |
| Panel pracownika | Brak dostępu | Może obsługiwać swoje zadania |
| Zmiana statusu | Nie wykonuje z poziomu panelu pracownika | Może zmieniać status tylko swoich zadań |
| Powiadomienia | Widzi powiadomienia zespołu | Widzi powiadomienia dotyczące swoich zadań |
| Raporty | Ma dostęp do raportów zespołowych | Brak dostępu |

## Instrukcja publikacji na GitHub Pages

1. Utwórz repozytorium na GitHubie.
2. Wgraj zawartość tego folderu do repozytorium.
3. Upewnij się, że główna gałąź repozytorium nazywa się `main`.
4. Wejdź w `Settings -> Pages`.
5. W sekcji `Build and deployment` ustaw `Source` na `GitHub Actions`.
6. Wykonaj `push` do gałęzi `main`.
7. Po zakończeniu akcji `Deploy frontend to GitHub Pages` link do aplikacji pojawi się w `Settings -> Pages`.

## Zakres technologiczny do opisania w sprawozdaniu

Wdrożona aplikacja jest frontendowym prototypem statycznym. Dane użytkowników, zadań i powiadomień zostały zapisane w pliku `src/data/mockData.js` i są przetwarzane lokalnie w przeglądarce. W tej wersji nie zastosowano backendu Node.js, bazy MongoDB ani integracji Slack, ponieważ celem wdrożenia było udostępnienie działającego interfejsu demonstracyjnego na GitHub Pages. GitHub Pages służy do hostowania statycznych plików strony i nie uruchamia procesów serwerowych ani bazy danych. Elementy serwerowe pozostają więc zakresem projektowym/architektonicznym, a nie częścią wdrożonego prototypu.
