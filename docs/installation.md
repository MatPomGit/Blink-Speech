# Przewodnik Instalacji

Ten przewodnik przeprowadzi Cię krok po kroku przez proces instalacji Blink Speech zarówno dla środowiska deweloperskiego (do nauki i tworzenia), jak i produkcyjnego (wersja końcowa dla użytkowników).

## 📋 Wymagania Wstępne

### Wymagania Systemowe
- **System Operacyjny**: Windows 10 lub nowszy, macOS 10.15 lub nowszy, Ubuntu 18.04 lub nowszy
- **Node.js**: Wersja 18.0 lub wyższa (środowisko uruchomieniowe JavaScript potrzebne do działania aplikacji)
- **Przeglądarka**: Chrome 80+, Firefox 75+, Safari 13+, lub Edge 80+ (nowsze wersje zapewniają lepszą obsługę kamery i technologii webowych)
- **Kamera**: Kamera internetowa z rozdzielczością minimum 720p (wyższa rozdzielczość = lepsza dokładność detekcji)
- **Pamięć RAM**: Co najmniej 2GB dostępnej pamięci (aplikacja przetwarza obraz z kamery w czasie rzeczywistym)
- **Sieć**: HTTPS wymagane dla dostępu do kamery (serwer deweloperski ma wbudowaną obsługę HTTPS)

### Wymagane Narzędzia
- **Git**: System kontroli wersji (służy do pobierania i zarządzania kodem projektu)
- **Menedżer Pakietów**: npm, yarn, lub pnpm (pnpm zalecany - szybszy i oszczędniejszy w użyciu dysku)
- **Edytor Kodu**: VS Code zalecany z rozszerzeniami:
  - TypeScript and JavaScript Language Features (wsparcie dla języka TypeScript)
  - Tailwind CSS IntelliSense (autouzupełnianie dla stylów CSS)
  - ES7+ React/Redux/React-Native snippets (skróty dla kodu React)

## 🚀 Szybki Start

### 1. Sklonuj Repozytorium
**Co to robi:** Pobiera całą kopię projektu z GitHub na Twój komputer, tworząc lokalną wersję do pracy.

```bash
git clone https://github.com/akshad-exe/Blink-Speech.git
cd Blink-Speech
```

**Wyjaśnienie kroków:**
- `git clone` - pobiera projekt z internetu
- `cd Blink-Speech` - przechodzi do folderu z projektem (cd = change directory)

### 2. Instalacja Zależności

**Co to są zależności?** To zewnętrzne biblioteki i narzędzia, których projekt potrzebuje do działania (np. React, TypeScript, biblioteki do rozpoznawania obrazu).

#### Konfiguracja Frontendu
**Frontend** to część aplikacji, którą widzi użytkownik w przeglądarce (interfejs, wizualizacje, interakcje).

```bash
cd frontend
pnpm install
# lub (jeśli nie masz pnpm)
npm install
# lub (jeśli używasz yarn)
yarn install
```

**Co się dzieje:** Menedżer pakietów czyta plik `package.json`, pobiera wszystkie wymagane biblioteki i zapisuje je w folderze `node_modules`.

#### Konfiguracja Backendu
**Backend** to część serwerowa aplikacji (API, baza danych, logika biznesowa).

```bash
cd ../backend
pnpm install
# lub
npm install
# lub
yarn install
```

**Wskazówka:** `../backend` oznacza "wyjdź z obecnego folderu i wejdź do folderu backend".

### 3. Konfiguracja Środowiska

**Co to są zmienne środowiskowe?** To ustawienia i klucze dostępu, które aplikacja potrzebuje, ale nie powinny być publicznie widoczne w kodzie (np. hasła do bazy danych, klucze API).

#### Zmienne Środowiskowe dla Frontendu
Utwórz plik `frontend/.env.local` i wpisz następującą zawartość:

**Co to robi:** Konfiguruje połączenie z bazą danych Supabase i podstawowe ustawienia aplikacji.

```env
# Konfiguracja Supabase (baza danych w chmurze)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Opcjonalnie: Analityka i monitoring (śledzenie wersji i środowiska)
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
```

**Gdzie znaleźć te wartości?** Znajdziesz je w panelu Supabase → Settings → API (krok 4 opisuje to szczegółowo).

#### Zmienne Środowiskowe dla Backendu
Utwórz plik `backend/.env`:

**Co to robi:** Konfiguruje serwer, bazę danych oraz opcjonalnie usługę SMS (Twilio).

```env
# Konfiguracja Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Konfiguracja Twilio SMS (Opcjonalnie - do wysyłania powiadomień SMS)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Konfiguracja Deweloperska
NODE_ENV=development
PORT=3001
```

**Uwaga:** `SERVICE_ROLE_KEY` to specjalny klucz z pełnymi uprawnieniami - nigdy nie udostępniaj go publicznie!

### 4. Konfiguracja Bazy Danych

#### Konfiguracja Supabase
**Co to jest Supabase?** To platforma bazy danych PostgreSQL w chmurze z gotowymi narzędziami do autoryzacji, storage i API.

**Kroki:**
1. Załóż nowy projekt na [supabase.com](https://supabase.com) (rejestracja jest darmowa)
2. Przejdź do Settings → API, aby znaleźć swój URL i klucze dostępu
3. Wykonaj poniższy kod SQL w SQL Editor (zakładka "SQL Editor" w panelu Supabase):

**Co robi ten kod SQL:** Tworzy tabelę `patterns` do przechowywania mapowań gestów na komendy, wraz z indeksami dla szybszego wyszukiwania i automatycznymi timestampami.

```sql
-- Tworzenie tabeli 'patterns' dla mapowań gestów
CREATE TABLE patterns (
    sid TEXT PRIMARY KEY,
    mapping JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tworzenie indeksu dla lepszej wydajności zapytań
-- (indeks przyspiesza wyszukiwanie rekordów w bazie)
CREATE INDEX idx_patterns_sid ON patterns(sid);

-- Włączanie Row Level Security (opcjonalne, ale zalecane dla bezpieczeństwa)
-- (RLS kontroluje, kto może odczytywać/modyfikować dane)
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;

-- Tworzenie polityki dla anonimowego dostępu (dostosuj według potrzeb)
-- (ta polityka pozwala wszystkim na dostęp - w produkcji warto to ograniczyć)
CREATE POLICY "Allow anonymous access" ON patterns
    FOR ALL USING (true);

-- Tworzenie funkcji do automatycznej aktualizacji pola 'updated_at'
-- (funkcja trigger - automatycznie ustawia datę modyfikacji przy każdej zmianie)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Tworzenie triggera do automatycznej aktualizacji timestampów
-- (trigger uruchamia funkcję przed każdą aktualizacją rekordu)
CREATE TRIGGER update_patterns_updated_at 
    BEFORE UPDATE ON patterns 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

**Wyjaśnienie struktury tabeli:**
- `sid` (TEXT) - unikalny identyfikator sesji użytkownika
- `mapping` (JSONB) - przechowuje mapowanie gestów w formacie JSON
- `created_at` - data utworzenia rekordu (automatyczna)
- `updated_at` - data ostatniej modyfikacji (automatycznie aktualizowana)

### 5. Uruchomienie Serwerów Deweloperskich

**Co to jest serwer deweloperski?** To lokalna aplikacja, która uruchamia Twój projekt na komputerze, automatycznie odświeża zmiany i pokazuje błędy w czasie rzeczywistym.

**Ważne:** Potrzebujesz dwóch osobnych terminali (okien konsoli), ponieważ frontend i backend działają równocześnie jako osobne procesy.

#### Terminal 1 - Serwer Frontendu
Otwórz pierwsze okno terminala i wykonaj:

```bash
cd frontend
pnpm dev
# lub
npm run dev
# lub
yarn dev
```

**Co się dzieje:** Uruchamia serwer Vite, który kompiluje kod React i udostępnia aplikację w przeglądarce.

Frontend będzie dostępny pod adresem `https://localhost:5173`

#### Terminal 2 - Serwer Backendu
Otwórz drugie okno terminala i wykonaj:

```bash
cd backend
pnpm dev
# lub
npm run dev
# lub
yarn dev
```

**Co się dzieje:** Uruchamia serwer Next.js, który obsługuje API i komunikację z bazą danych.

Backend API będzie dostępne pod adresem `http://localhost:3001`

**Wskazówka dla początkujących:** 
- `localhost` to adres Twojego własnego komputera
- Numery portów (5173, 3001) to "adresy" różnych aplikacji na tym samym komputerze
- Nie zamykaj tych okien terminala - serwery muszą działać podczas pracy z aplikacją

### 6. Weryfikacja Instalacji

**Sprawdź, czy wszystko działa poprawnie:**

1. **Otwórz przeglądarkę** i wejdź na `https://localhost:5173`
   - Powinieneś zobaczyć interfejs aplikacji Blink Speech

2. **Zezwól na dostęp do kamery** gdy przeglądarka o to poprosi
   - To jest niezbędne, aby aplikacja mogła rozpoznawać gesty i ruchy oczu
   - Możesz zmienić te uprawnienia w ustawieniach przeglądarki

3. **Ukończ proces kalibracji** (kalibracja = dostosowanie systemu do Twoich ruchów)
   - Aplikacja nauczy się rozpoznawać Twoje specyficzne gesty i spojrzenia
   - To jednorazowy proces przy pierwszym uruchomieniu

4. **Przetestuj detekcję gestów** w interfejsie sesji
   - Spróbuj wykonać różne gesty i sprawdź, czy są wykrywane
   - Sprawdź, czy kamera prawidłowo śledzi ruchy Twoich oczu

**Jeśli wszystko działa - gratulacje! 🎉 Instalacja zakończona pomyślnie.**

## 🔧 Konfiguracja Środowiska Deweloperskiego

### Konfiguracja IDE (Zintegrowanego Środowiska Programistycznego)

#### Ustawienia VS Code
**Co to robi:** Automatyzuje formatowanie kodu i włącza pomocne funkcje edytora.

Utwórz plik `.vscode/settings.json` w katalogu głównym projektu:
```json
{
  "typescript.preferences.includePackageJsonAutoImports": "auto",
  "typescript.suggest.autoImports": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

#### VS Code Extensions
Install the following extensions:
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

### Git Hooks Setup
Set up pre-commit hooks to ensure code quality:

```bash
# Install husky for git hooks
cd frontend
pnpm add -D husky lint-staged

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

Add to `frontend/package.json`:
```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### Environment-Specific Configuration

#### Development
```env
# frontend/.env.development
VITE_API_BASE_URL=http://localhost:3001
VITE_LOG_LEVEL=debug
VITE_ENABLE_DEVTOOLS=true
```

#### Production
```env
# frontend/.env.production
VITE_API_BASE_URL=https://your-api-domain.com
VITE_LOG_LEVEL=error
VITE_ENABLE_DEVTOOLS=false
```

## 🌐 Wdrożenie Produkcyjne

### Wdrożenie Frontendu (Vercel)

**Co to jest wdrożenie?** Publikacja aplikacji w internecie, aby inni mogli z niej korzystać.

1. **Zbuduj projekt** (stwórz zoptymalizowaną wersję do publikacji):
```bash
cd frontend
pnpm build
```
**Co się dzieje:** Vite kompiluje i optymalizuje cały kod do folderu `dist` - gotowa wersja do publikacji.

2. **Wdróż na Vercel** (platforma hostingowa):
```bash
# Instalacja Vercel CLI (narzędzie linii poleceń)
npm i -g vercel

# Wdrożenie (publikacja w internecie)
vercel --prod
```
**Co się dzieje:** Vercel przesyła Twój projekt na swoje serwery i przypisuje mu publiczny adres URL.

3. **Skonfiguruj zmienne środowiskowe** w panelu Vercel (Dashboard):
   - `VITE_SUPABASE_URL` - adres Twojej bazy danych
   - `VITE_SUPABASE_ANON_KEY` - klucz dostępu publicznego

### Wdrożenie Backendu (Vercel Functions)

**Vercel Functions:** Funkcje serverless - kod uruchamiany tylko gdy ktoś wysyła zapytanie (oszczędza zasoby).

1. **Skonfiguruj plik vercel.json** w katalogu backend:
```json
{
  "functions": {
    "pages/**/*.ts": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/pages/$1"
    }
  ]
}
```

2. **Wdróż backend**:
```bash
cd backend
vercel --prod
```

### Alternatywa: Wdrożenie z Docker

**Co to jest Docker?** Technologia konteneryzacji - pakuje aplikację ze wszystkimi zależnościami w jeden "kontener", który działa wszędzie identycznie.

#### Dockerfile dla Frontendu
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose
**Co to jest Docker Compose?** Narzędzie do uruchamiania wielu kontenerów (frontend + backend) jednocześnie.

```yaml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - VITE_SUPABASE_URL=${SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
  
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - SUPABASE_URL=${SUPABASE_URL}
      - SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
```

## 🔍 Rozwiązywanie Problemów

### Najczęstsze Problemy

#### Brak Dostępu do Kamery
**Problem:** Przeglądarka blokuje dostęp do kamery
**Rozwiązanie:** 
- Upewnij się, że używasz HTTPS (lub localhost) - kamery nie działają przez HTTP
- Sprawdź uprawnienia przeglądarki w Ustawieniach → Prywatność → Kamera
- Spróbuj innej przeglądarki (Chrome zwykle najlepiej obsługuje kamery)

#### Błąd Ładowania Modeli MediaPipe
**Problem:** Nie udaje się załadować modeli TensorFlow.js
**Przyczyna:** Brak połączenia z internetem lub blokada przez przeglądarkę
**Rozwiązanie:**
```bash
# Wyczyść pamięć podręczną przeglądarki (cache)
# Sprawdź połączenie internetowe
# Upewnij się, że HTTPS jest włączone
```

#### Błędy Kompilacji
**Problem:** TypeScript zgłasza błędy podczas budowania
**Rozwiązanie:**
```bash
# Usuń node_modules i przeinstaluj zależności (często pomaga)
rm -rf node_modules package-lock.json
npm install

# Sprawdź wersję TypeScript (powinna być zgodna z wymaganiami)
npx tsc --version

# Ponownie zbuduj projekt
npm run build
```
**Wyjaśnienie:** `rm -rf` usuwa katalog, reinstalacja pobiera świeże pakiety.

#### Błąd Inicjalizacji WebGazer
**Problem:** Śledzenie wzroku nie działa
**Rozwiązanie:**
- Zapewnij dobre oświetlenie (jasne światło, bez odbić)
- Sprawdź jakość kamery i jej pozycję (kamera powinna być na poziomie oczu)
- Zaczekaj 10-15 sekund na inicjalizację systemu

### Problemy z Wydajnością

#### Wysokie Użycie Procesora (CPU)
**Co robić:**
- Zmniejsz rozdzielczość wideo w ustawieniach `getUserMedia` (niższa jakość = mniej obliczeń)
- Dostosuj częstotliwość detekcji w hooku `useGestureSpeech` (rzadsze sprawdzanie = mniej pracy)
- Zamknij inne karty przeglądarki podczas korzystania z aplikacji

#### Wycieki Pamięci (Memory Leaks)
**Co to są wycieki pamięci?** Program zajmuje coraz więcej pamięci RAM i jej nie zwalnia.
**Jak naprawić:**
- Upewnij się, że hooków `useEffect` mają funkcje czyszczące (cleanup)
- Zatrzymuj strumienie wideo przy odmontowywaniu komponentu
- Monitoruj kartę Memory w narzędziach deweloperskich przeglądarki

### Porady dla Developerów

1. **Włącz szczegółowe logowanie** (aby widzieć więcej informacji diagnostycznych):
```typescript
// Dodaj do pliku .env.development
VITE_LOG_LEVEL=debug
```
**Co to robi:** Wyświetla wszystkie komunikaty debugowania w konsoli przeglądarki.

2. **Testuj z różnymi kamerami:**
- Wbudowane kamery laptopów (często niższa jakość)
- Zewnętrzne kamery USB (lepsza jakość, ale różne sterowniki)
- Różne rozdzielczości i liczby klatek na sekundę (fps)

3. **Profiluj wydajność** (sprawdzaj, co zużywa zasoby):
```bash
# Użyj React DevTools Profiler (sprawdza renderowanie komponentów)
# Monitoruj wydajność TensorFlow.js (ile czasu zajmuje detekcja)
# Sprawdź dokładność WebGazer (jak precyzyjnie śledzi wzrok)
```

## 📦 Skrypty Pakietów

**Co to są skrypty?** Gotowe polecenia zdefiniowane w `package.json`, które możesz uruchomić przez `npm run [nazwa_skryptu]`.

### Skrypty Frontendu
```json
{
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "lint": "eslint .",
  "preview": "vite preview",
  "type-check": "tsc --noEmit"
}
```

**Wyjaśnienie poszczególnych skryptów:**
- `dev` - uruchamia serwer deweloperski z hot-reload (automatyczne odświeżanie)
- `build` - tworzy zoptymalizowaną wersję produkcyjną
- `build:dev` - buduje wersję z debugowaniem
- `lint` - sprawdza kod pod kątem błędów i złych praktyk
- `preview` - podgląd zbudowanej wersji przed wdrożeniem
- `type-check` - sprawdza typy TypeScript bez kompilacji

### Skrypty Backendu
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

**Wyjaśnienie:**
- `dev` - uruchamia serwer Next.js w trybie deweloperskim
- `build` - kompiluje aplikację do produkcji
- `start` - uruchamia skompilowaną aplikację produkcyjną
- `lint` - analizuje kod pod kątem problemów

## 🔒 Kwestie Bezpieczeństwa

**Dlaczego bezpieczeństwo jest ważne?** Złe praktyki mogą prowadzić do wycieku danych, hakowania lub kradzieży kluczy API.

### Bezpieczeństwo podczas Deweloperki

**Najważniejsze zasady:**
- **NIGDY** nie commituj plików `.env` do systemu kontroli wersji (Git)
  - *Dlaczego?* Pliki `.env` zawierają hasła i klucze - jeśli wrzucisz je na GitHub, każdy może je zobaczyć!
  - *Jak się zabezpieczyć?* Dodaj `.env` do pliku `.gitignore`

- **Używaj różnych kluczy API** dla deweloperki i produkcji
  - *Dlaczego?* Jeśli klucz deweloperski wycieknie, produkcja pozostaje bezpieczna

- **Implementuj właściwe polityki CORS** (Cross-Origin Resource Sharing)
  - *Co to jest CORS?* Mechanizm kontrolujący, które strony mogą komunikować się z Twoim API
  - *Dlaczego?* Zapobiega atakom z obcych domen

- **Włącz HTTPS w środowisku deweloperskim**
  - *Dlaczego?* Niektóre API (jak kamera) działają tylko przez HTTPS

### Bezpieczeństwo w Produkcji

**Lista kontrolna przed publikacją:**
- ✅ Skonfiguruj zmienne środowiskowe bezpiecznie (przez panel hostingu, nie w kodzie)
- ✅ Włącz nagłówki bezpieczeństwa (security headers) - chronią przed atakami XSS, clickjacking
- ✅ Implementuj rate limiting - ogranicza liczbę zapytań, zapobiega atakom DDoS
- ✅ Używaj certyfikatów HTTPS - szyfruje komunikację między użytkownikiem a serwerem
- ✅ Przeprowadzaj regularne audyty bezpieczeństwa - sprawdzaj biblioteki pod kątem luk

**Dodatkowe wskazówki:**
- Aktualizuj regularnie zależności (`npm update`)
- Używaj `npm audit` do sprawdzania znanych luk bezpieczeństwa
- Nie wystawiaj wrażliwych endpointów publicznie
- Loguj podejrzane aktywności

---

**Gratulacje! 🎉** Jesteś teraz gotowy do rozpoczęcia pracy z Blink Speech! 

Sprawdź [Development Guide](./development-guide.md) po szczegółowe instrukcje dotyczące procesu deweloperskiego i najlepszych praktyk.
