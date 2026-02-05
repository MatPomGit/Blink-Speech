# Blink Speech - Kompletna Dokumentacja

> **Zamieniamy mrugnięcia i spojrzenia w głos – komunikacja bez barier.**

Witaj w kompleksowej dokumentacji projektu **Blink Speech** – narzędzia do wspomagania komunikacji, które przekształca wzorce mrugnięć oczu i gesty wzroku w wypowiadane frazy, wykorzystując widzenie komputerowe (computer vision) i syntezę mowy (speech synthesis).

## 📚 Struktura Dokumentacji

Dokumentacja jest podzielona na następujące sekcje, które pomogą Ci zrozumieć projekt od podstaw:

### 🏗️ **Architektura i Projektowanie**
- [**Przegląd Architektury**](./architecture.md) - Projektowanie systemu, przepływ danych i architektura techniczna. Dowiesz się, jak poszczególne komponenty współpracują ze sobą, tworząc spójną aplikację.
- [**Komponenty Frontend**](./frontend-components.md) - Komponenty React, hooki (hooks) i narzędzia pomocnicze. Poznasz strukturę interfejsu użytkownika i jak jest zbudowany.
- [**Dokumentacja API**](./api-documentation.md) - Endpointy backendu, schemat bazy danych i integracje z zewnętrznymi serwisami. Tu znajdziesz szczegółowy opis wszystkich punktów końcowych API.

### 🚀 **Pierwsze Kroki**
- [**Przewodnik Instalacji**](./installation.md) - Kompletna instrukcja konfiguracji środowiska deweloperskiego i produkcyjnego. Krok po kroku nauczysz się, jak uruchomić projekt na swoim komputerze.
- [**Instrukcja Użytkownika**](./user-guide.md) - Jak efektywnie korzystać z aplikacji. Przewodnik dla końcowych użytkowników wyjaśniający wszystkie funkcje.
- [**Konfiguracja**](./configuration.md) - Zmienne środowiskowe (environment variables) i ustawienia systemowe. Poznasz wszystkie opcje konfiguracyjne projektu.

### 💻 **Rozwój Projektu**
- [**Przewodnik Dewelopera**](./development-guide.md) - Konfiguracja środowiska deweloperskiego, workflow i zasady kontrybucji do projektu. Niezbędnik dla każdego, kto chce rozwijać ten projekt.
- [**Detekcja Gestów**](./gesture-detection.md) - Implementacja widzenia komputerowego i algorytmy rozpoznawania mrugnięć. Szczegółowe wyjaśnienie, jak działa system wykrywania gestów okulomotorycznych.
<!-- - [**Synteza Mowy**](./speech-synthesis.md) - Szczegóły implementacji text-to-speech -->

### 🚀 **Wdrożenie i Operacje**
- [**Przewodnik Wdrożenia**](./deployment.md) - Instrukcje wdrażania aplikacji na środowisko produkcyjne. Dowiesz się, jak opublikować aplikację w Internecie.
- [**Rozwiązywanie Problemów**](./troubleshooting.md) - Najczęstsze problemy i ich rozwiązania. Pomoc w diagnostyce i naprawie typowych błędów.

---

## 🎯 Szybki Start

Aby szybko rozpocząć pracę z projektem, wykonaj poniższe kroki:

1. **Sklonuj repozytorium** (pobierz kod źródłowy na swój komputer)
   ```bash
   git clone https://github.com/akshad-exe/Blink-Speech.git
   cd Blink-Speech
   ```

2. **Postępuj zgodnie z [Przewodnikiem Instalacji](./installation.md)** – tam znajdziesz szczegółowe instrukcje konfiguracji

3. **Przeczytaj [Instrukcję Użytkownika](./user-guide.md)** – poznasz wszystkie funkcje aplikacji i nauczysz się z nich korzystać

4. **Sprawdź [Przewodnik Dewelopera](./development-guide.md)** – jeśli chcesz przyczynić się do rozwoju projektu

---

## 🛠️ Stos Technologiczny

Poniższa tabela przedstawia technologie użyte w projekcie wraz z ich przeznaczeniem:

| Komponent | Technologia | Przeznaczenie |
|-----------|------------|---------|
| **Frontend** | React 18 + Vite | Nowoczesny framework do budowy aplikacji webowych. React to biblioteka do tworzenia interfejsów użytkownika, a Vite to szybkie narzędzie do budowania projektu. |
| **Biblioteka UI** | Radix UI + Tailwind CSS | Dostępne komponenty i stylowanie. Radix UI dostarcza gotowe, dostępne komponenty, a Tailwind CSS to narzędzie do szybkiego stylowania. |
| **Widzenie Komputerowe** | MediaPipe + WebGazer.js | Śledzenie oczu i wykrywanie mrugnięć. To biblioteki, które analizują obraz z kamery, aby wykrywać ruchy oczu. |
| **Uczenie Maszynowe** | TensorFlow.js | Wykrywanie punktów charakterystycznych twarzy (face landmarks). TensorFlow.js to biblioteka uczenia maszynowego działająca w przeglądarce. |
| **Backend** | Next.js API Routes | Endpointy RESTful API. Next.js pozwala tworzyć punkty końcowe API bezpośrednio w aplikacji. |
| **Baza Danych** | Supabase (PostgreSQL) | Przechowywanie danych użytkowników i mapowań gestów. Supabase to platforma backendowa oparta na PostgreSQL. |
| **Uwierzytelnianie** | Supabase Auth | Zarządzanie sesjami użytkowników. System logowania i rejestracji użytkowników. |
| **Pamięć Lokalna** | IndexedDB (localForage) | Lokalne przechowywanie danych w przeglądarce. Dane są zapisywane na urządzeniu użytkownika. |
| **Synteza Mowy** | Web Speech API | Synteza tekstu na mowę (text-to-speech). API przeglądarki, które wypowiada tekst głosem. |
| **SMS** | Twilio | Powiadomienia SMS w sytuacjach awaryjnych. Usługa do wysyłania wiadomości tekstowych. |
| **Wdrożenie** | Vercel | Hosting i ciągła integracja/wdrażanie (CI/CD). Platforma do publikacji aplikacji webowych. |

---

## 🏥 Zastosowania i Wpływ Społeczny

### Główne Przypadki Użycia
- **Opieka Intensywna**: Pacjenci na OIT (oddziale intensywnej terapii), powrót do zdrowia po operacji, zespół locked-in syndrome (pacjenci całkowicie sparaliżowani, ale świadomi)
- **Dostępność**: Choroba ALS (stwardnienie zanikowe boczne), dystrofia mięśniowa, niepełnosprawność ruchowa
- **Stany Tymczasowe**: Okres pooperacyjny, ciężkie zapalenie krtani, rekonwalescencja po intubacji
- **Sytuacje Awaryjne**: Kiedy tradycyjna komunikacja jest niemożliwa

### Kluczowe Funkcje
- ✅ **Bez Instalacji** - Działa w każdej nowoczesnej przeglądarce internetowej, wystarczy otworzyć stronę
- ✅ **Prywatność Na Pierwszym Miejscu** - Całe przetwarzanie odbywa się po stronie klienta (w przeglądarce), dane nie są wysyłane do serwera
- ✅ **Konfigurowalność** - Użytkownik może samodzielnie definiować mapowania gestów na frazy
- ✅ **Gotowość Offline** - Podstawowe funkcje działają bez połączenia z Internetem
- ✅ **Responsywność** - Działa na komputerach stacjonarnych, tabletach i urządzeniach mobilnych
- ✅ **Dostępność** - Interfejs zaprojektowany zgodnie ze standardami WCAG (Web Content Accessibility Guidelines)

---

## 🤝 Zespół

| Rola | Imię i Nazwisko | GitHub |
|------|------|---------|
| 🧠 **Lider Projektu** | Md Athar Jamal Makki | [@atharhive](https://github.com/atharhive) |
| 🎨 **Frontend** | Akshad Jogi | [@akshad-exe](https://github.com/akshad-exe) |
| 🛠 **Backend** | Ayush Sarkar | [@dev-Ninjaa](https://github.com/dev-Ninjaa) |

---

## 📋 Szybka Referencja

### Najpopularniejsze Wzorce Gestów
- **Pojedyncze Mrugnięcie**: Podstawowe potwierdzenie, sygnał "zrozumiałem"
- **Podwójne Mrugnięcie**: "Tak" lub potwierdzenie zgody
- **Potrójne Mrugnięcie**: "Nie" lub odmowa
- **Długie Mrugnięcie**: "Dziękuję" lub "Stop" (zatrzymaj akcję)
- **Mrugnięcie + Spojrzenie**: Polecenia kierunkowe (pomoc, woda, itp.) – kombinacja mrugnięcia z kierunkiem spojrzenia

### Specyfikacje Wydajności
- **Opóźnienie Detekcji**: <150ms (mniej niż 150 milisekund od gestu do wykrycia)
- **Wyjście Mowy**: <1s po rozpoznaniu wzorca (wypowiedź następuje w ciągu sekundy)
- **Wsparcie Przeglądarek**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+ (działa w najnowszych wersjach popularnych przeglądarek)
- **Wymagania Sprzętowe**: Kamera internetowa (webcam), minimum 2GB RAM

---

## 🔗 Zasoby Zewnętrzne

- [**Demo na Żywo**](https://blink-speech.vercel.app) - Wypróbuj aplikację bez instalacji
- [**Repozytorium Projektu**](https://github.com/akshad-exe/Blink-Speech) - Kod źródłowy projektu
- [**Zgłaszanie Problemów**](https://github.com/akshad-exe/Blink-Speech/issues) - Zgłaszaj błędy lub proponuj nowe funkcje
- [**Dokumentacja WebGazer.js**](https://webgazer.cs.brown.edu/) - Biblioteka do śledzenia wzroku (eye tracking)
- [**MediaPipe Face Mesh**](https://google.github.io/mediapipe/solutions/face_mesh.html) - Wykrywanie punktów charakterystycznych twarzy

---

## 📄 Licencja

Ten projekt jest udostępniony na licencji MIT License. Szczegóły znajdziesz w pliku [LICENSE](../LICENSE).

---

**Potrzebujesz pomocy?** Sprawdź nasz [Przewodnik Rozwiązywania Problemów](./troubleshooting.md) lub [otwórz nowe zgłoszenie](https://github.com/akshad-exe/Blink-Speech/issues/new).
