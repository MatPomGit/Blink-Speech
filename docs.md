# Blink Speech: Kompletna Dokumentacja Techniczna

> **Zamieniamy mrugnięcia i spojrzenia w głos – komunikacja bez granic.**

**Blink Speech** to działająca w przeglądarce aplikacja wspomagająca komunikację, która przekształca intencjonalne wzorce mrugnięć i gesty wzrokowe w wypowiadane frazy. Zbudowana przy użyciu nowoczesnych technologii webowych, działa całkowicie po stronie klienta, zapewniając prywatność użytkownika dzięki podejściu wymagającemu zero instalacji i priorytetowi anonimowości. 👁️‍🗨️ → 🗣️

---

## 📚 **Nawigacja po Dokumentacji**

### 🚀 **Pierwsze Kroki**
- [**📖 Kompletny Pakiet Dokumentacji**](./docs/README.md) - Główny hub dokumentacji
- [**🛠️ Przewodnik Instalacji**](./docs/installation.md) - Konfiguracja dla środowiska deweloperskiego i produkcyjnego
- [**👤 Przewodnik Użytkownika**](./docs/user-guide.md) - Jak efektywnie korzystać z Blink Speech
- [**🔧 Konfiguracja**](./docs/configuration.md) - Zmienne środowiskowe i ustawienia

### 🏗️ **Architektura i Rozwój**
- [**🏛️ Architektura Systemu**](./docs/architecture.md) - Projekt techniczny i przepływ danych
- [**💻 Przewodnik Deweloperski**](./docs/development-guide.md) - Przepływy pracy i najlepsze praktyki dla programistów
- [**🧩 Komponenty Frontend**](./docs/frontend-components.md) - Komponenty React i hooki
- [**🔗 Dokumentacja API**](./docs/api-documentation.md) - Endpointy backendu i baza danych

### 🔬 **Kluczowe Technologie**
- [**👁️ Detekcja Gestów**](./docs/gesture-detection.md) - Implementacja widzenia komputerowego
- [**🎵 Synteza Mowy**](./docs/speech-synthesis.md) - Integracja text-to-speech
- [**🌐 Architektura Frontend**](./docs/frontend.md) - Implementacja React + Vite

### 🚀 **Operacje**
- [**🚀 Przewodnik Wdrożenia**](./docs/deployment.md) - Strategie wdrażania produkcyjnego
- [**🔍 Rozwiązywanie Problemów**](./docs/troubleshooting.md) - Typowe problemy i rozwiązania

---

## 🛠️ **Aktualny Stos Technologiczny**

![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![WebGazer.js](https://img.shields.io/badge/WebGazer.js-FF6F00?style=for-the-badge&logo=javascript&logoColor=white)
![MediaPipe](https://img.shields.io/badge/MediaPipe-4285F4?style=for-the-badge&logo=google&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js_API-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Web Speech API](https://img.shields.io/badge/Web_Speech_API-FF4081?style=for-the-badge&logo=googlechrome&logoColor=white)

---

## 🎯 **Szybki Start**

1. **📥 Klonowanie i Instalacja**
   ```bash
   git clone https://github.com/MatPomGit/Blink-Speech.git
   cd Blink-Speech
   cd frontend && npm install
   cd ../backend && npm install
   ```

2. **⚙️ Konfiguracja Środowiska**
   - Skonfiguruj projekt [Supabase](https://supabase.com)
   - Skonfiguruj zmienne środowiskowe (zobacz [Przewodnik Konfiguracji](./docs/configuration.md))

3. **🚀 Uruchomienie w Trybie Deweloperskim**
   ```bash
   # Frontend (Terminal 1)
   cd frontend && npm run dev
   
   # Backend (Terminal 2)  
   cd backend && npm run dev
   ```

4. **🎯 Rozpoczęcie Użytkowania**
   - Otwórz `https://localhost:5173`
   - Pozwól na dostęp do kamery
   - Ukończ kalibrację
   - Zacznij komunikować się przy użyciu gestów!

---

## 🧠 **Podstawowe Koncepcje**

Blink Speech wykorzystuje zaawansowane widzenie komputerowe do tłumaczenia ruchów oczu na mowę poprzez wykrywanie dwóch podstawowych sygnałów wejściowych przez kamerę internetową użytkownika: **wzorców mrugnięć** i **kierunków spojrzenia**. Te sygnały są łączone w celu wywołania predefiniowanych lub w pełni konfigurowalnych fraz.

**Wyjaśnienie:** System działa w czasie rzeczywistym, analizując obraz z kamery i wykrywając charakterystyczne ruchy oczu. Każde mrugnięcie jest rejestrowane z dokładnością co do milisekundy, a system rozpoznaje różne typy mrugnięć na podstawie ich czasu trwania i częstotliwości występowania.

### 🎯 **Obsługiwane Gesty**

| Typ Gestu | Wzorzec | Domyślna Fraza | Przypadek Użycia |
|-------------|---------|----------------|----------|
| **Pojedyncze Mrugnięcie** | Jedno szybkie mrugnięcie | "Hello" | Potwierdzenie uwagi |
| **Podwójne Mrugnięcie** | Dwa mrugnięcia w ciągu 400ms | "Yes" | Odpowiedź twierdząca |
| **Potrójne Mrugnięcie** | Trzy mrugnięcia w ciągu 700ms | "No" | Odpowiedź negatywna |
| **Długie Mrugnięcie** | Trzymanie mrugnięcia >800ms | "Thank you" | Wyrażenie wdzięczności |
| **Mrugnięcie + Spojrzenie** | Dowolne mrugnięcie + kierunek | Niestandardowe frazy | Złożona komunikacja |

**Dla początkujących:** Każdy typ gestu ma specyficzne parametry czasowe. Na przykład, podwójne mrugnięcie wymaga dwóch mrugnięć w bardzo krótkim czasie (400 milisekund = 0.4 sekundy). System musi być wystarczająco inteligentny, aby odróżnić intencjonalne gesty od naturalnych, spontanicznych mrugnięć.

### 🌍 **Zastosowania w Świecie Rzeczywistym**

- **🏥 Ochrona Zdrowia**: Pacjenci na OIT, komunikacja po operacji, zespół locked-in (całkowite porażenie przy zachowanej świadomości)
- **♿ Dostępność**: ALS (stwardnienie zanikowe boczne), dystrofia mięśniowa, zaburzenia motoryczne
- **⏰ Tymczasowe**: Rekonwalescencja po utracie mowy, chirurgia jamy ustnej, intubacja
- **🚨 Sytuacje Awaryjne**: Gdy tradycyjna komunikacja zawodzi

### 🔬 **Technologia Detekcji**

**System Główny**: MediaPipe FaceLandmarker dla wysokoprecyzyjnego śledzenia punktów charakterystycznych twarzy  
**System Zapasowy**: WebGazer.js dla szerszej kompatybilności z przeglądarkami

**Wyjaśnienie:** Aplikacja wykorzystuje dwupoziomową strategię detekcji. Najpierw próbuje użyć MediaPipe, które oferuje najlepszą dokładność dzięki zaawansowanym algorytmom uczenia maszynowego. Jeśli MediaPipe nie jest dostępne lub zawodzi, system automatycznie przełącza się na WebGazer.js, zapewniając działanie aplikacji nawet na starszych urządzeniach.

#### **Detekcja Mrugnięć (Metoda EAR)**

**Wyjaśnienie techniczne:** Eye Aspect Ratio (EAR) to matematyczny sposób określenia, czy oko jest otwarte czy zamknięte. Algorytm ten analizuje położenie sześciu kluczowych punktów wokół oka i oblicza stosunek pionowych do poziomych odległości między nimi.

- **Algorytm**: Obliczanie Eye Aspect Ratio (EAR) z wykorzystaniem punktów charakterystycznych twarzy
- **Próg**: Dynamiczne dostosowywanie progu (typowo ~0.25)
  - **Dla początkujących:** Gdy wartość EAR spada poniżej progu 0.25, system rozpoznaje to jako mrugnięcie. Próg jest "dynamiczny", co oznacza, że dostosowuje się do indywidualnych cech użytkownika podczas kalibracji
- **Wzorce**: Pojedyncze, podwójne (400ms), potrójne (700ms), długie (800ms+) mrugnięcia
- **Dokładność**: >95% skuteczności detekcji w optymalnych warunkach

**Matematyka za EAR:**
```
EAR = (||p2-p6|| + ||p3-p5||) / (2 * ||p1-p4||)
```
Gdzie p1-p6 to współrzędne punktów wokół oka. Gdy oko jest otwarte, EAR jest wysoki (~0.3-0.4). Gdy oko jest zamknięte, EAR drastycznie spada (<0.2).

#### **Śledzenie Spojrzenia (Gaze Tracking)**

- **Kalibracja**: System kalibracji 5-punktowej dla spersonalizowanego śledzenia
  - **Wyjaśnienie:** Użytkownik patrzy kolejno na 5 punktów na ekranie (zazwyczaj: środek, góra, dół, lewo, prawo). System "uczy się" charakterystycznych wzorców ruchu źrenic dla każdego kierunku spojrzenia u danego użytkownika
- **Kierunki**: Detekcja spojrzenia w lewo, prawo, góra, dół, środek
- **Precyzja**: Próg ±100px (konfigurowalny)
  - **Dla początkujących:** System toleruje odchylenie do 100 pikseli od idealnego punktu. Dzięki temu nie trzeba patrzeć idealnie dokładnie – system jest "wyrozumiały" dla naturalnych ruchów oka
- **Trwałość**: Dane kalibracji przechowywane lokalnie
  - **Wyjaśnienie:** Po pierwszej kalibracji dane są zapisywane w przeglądarce (IndexedDB), więc nie musisz kalibrować systemu przy każdym użyciu

### 🗂️ **Mapowanie Gest-na-Mowę**

**Mapowania Domyślne**: Predefiniowane podstawowe frazy do natychmiastowego użycia  
**Mapowania Niestandardowe**: W pełni konfigurowalne przez użytkownika poprzez intuicyjny interfejs  
**Przechowywanie**: Lokalna pamięć przeglądarki z opcjonalną synchronizacją w chmurze przez Supabase

**Wyjaśnienie:** System działa jak "słownik gestów". Każdy gest (np. "podwójne mrugnięcie + spojrzenie w lewo") jest kluczem, a przypisana fraza (np. "Potrzebuję pomocy") jest wartością. Użytkownik może dowolnie edytować te powiązania.

#### **Struktura Mapowania**
```json
{
  "singleBlink": "Hello",
  "doubleBlink": "Yes", 
  "tripleBlink": "No",
  "longBlink": "Thank you",
  "singleBlink_lookLeft": "I need help",
  "doubleBlink_lookUp": "Water please",
  "tripleBlink_lookRight": "Emergency",
  "longBlink_lookDown": "I'm tired"
}
```

**Dla początkujących:** Powyższy JSON (JavaScript Object Notation) to standardowy format danych. Każda linia definiuje jedno mapowanie: nazwa gestu po lewej stronie (klucz), fraza po prawej stronie (wartość). System odczytuje ten plik i wie, co powiedzieć dla każdego wykrytego gestu.

#### **Funkcje Personalizacji**
- **🎨 Edytor Wizualny**: Interfejs mapowania gestów typu "wskaż i kliknij"
- **📱 Import/Export**: Udostępnianie mapowań między urządzeniami
- **🌐 Wielojęzyczność**: Wsparcie dla dowolnego języka i frazy
- **🔄 Aktualizacje w Czasie Rzeczywistym**: Zmiany stosowane natychmiast bez restartu

-----

## 🔄 **Ścieżka Użytkownika i Funkcje**

### **1. 🚀 Wdrożenie (Użytkownicy Po Raz Pierwszy)**
- **Powitanie**: Wprowadzenie do możliwości Blink Speech
- **Uprawnienia**: Bezpieczne żądanie dostępu do kamery z jasnymi wyjaśnieniami
  - **Wyjaśnienie:** Aplikacja wymaga dostępu do kamery, aby analizować ruchy oczu. Przetwarzanie odbywa się całkowicie lokalnie w przeglądarce – żadne nagranie wideo nie jest wysyłane do internetu
- **Kalibracja**: Interaktywna kalibracja spojrzenia w 5 punktach z wizualną informacją zwrotną
  - **Dla początkujących:** To kluczowy krok! System "uczy się" Twoich indywidualnych cech oczu i ruchów źrenic. Patrz uważnie na każdy punkt przez kilka sekund
- **Samouczek**: Opcjonalne ćwiczenie gestów z informacją zwrotną w czasie rzeczywistym

### **2. 🎯 Aktywna Sesja**
- **Detekcja na Żywo**: Rozpoznawanie gestów w czasie rzeczywistym z wizualnymi wskaźnikami
  - **Wyjaśnienie:** Na ekranie widzisz małe ikony lub wskaźniki pokazujące, kiedy system wykrywa mrugnięcie lub kierunek spojrzenia. To pomaga w nauce i pewności używania systemu
- **Podgląd Frazy**: Wyraźne wyświetlanie wykrytych fraz przed wypowiedzeniem
- **Niestandardowe Kontrolki**: Przełącznik mowy, głośność, prędkość i wybór głosu
- **Edytor Mapowań**: Edycja mapowań gest-na-frazę na żywo podczas użytkowania

### **3. 🔧 Funkcje Zaawansowane**
- **Optymalizacja Wydajności**: Adaptacyjna częstotliwość klatek i dostosowanie progu
  - **Wyjaśnienie:** System automatycznie dostosowuje się do mocy Twojego komputera. Na wolniejszym urządzeniu zmniejsza częstotliwość analizy klatek wideo, aby działać płynnie
- **Dostępność**: Wysoki kontrast, duży tekst, kompatybilność z czytnikami ekranu  
- **Tryb Awaryjny**: Szybki dostęp do krytycznych fraz komunikacyjnych
  - **Dla początkujących:** Specjalny tryb umożliwiający natychmiastowy dostęp do najważniejszych komunikatów (np. "Pomocy!", "Źle się czuję", "Wezwij lekarza")
- **Zarządzanie Danymi**: Export/import ustawień, opcje synchronizacji w chmurze

### **4. 🛡️ Prywatność i Bezpieczeństwo**
- **Przetwarzanie Lokalne**: Cała analiza wideo odbywa się na urządzeniu
  - **Wyjaśnienie:** To kluczowa cecha! Obraz z kamery jest analizowany przez JavaScript działający w Twojej przeglądarce. Żadne dane wideo nie są wysyłane na serwery zewnętrzne
- **Brak Transmisji Danych**: Wideo nigdy nie opuszcza Twojej przeglądarki
- **Bezpieczne Przechowywanie**: Zaszyfrowana pamięć lokalna dla wrażliwych ustawień
- **Anonimowe Użytkowanie**: Nie są wymagane ani zbierane żadne dane osobowe

-----

---

## ⚡ **Wydajność i Specyfikacje**

### **Wymagania Systemowe**
- **Przeglądarka**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Sprzęt**: 2GB RAM, kamera internetowa (zalecane 720p)
  - **Dla początkujących:** Wystarczy standardowy laptop z wbudowaną kamerą. Lepsza jakość kamery (720p lub wyższa) oznacza lepszą dokładność detekcji
- **Sieć**: Wymagane HTTPS (automatyczne w środowisku deweloperskim)
  - **Wyjaśnienie:** Nowoczesne przeglądarki wymagają bezpiecznego połączenia HTTPS do dostępu do kamery ze względów bezpieczeństwa
- **Pamięć**: ~50MB na pełną pamięć podręczną aplikacji

### **Metryki Wydajności**
- **Opóźnienie Detekcji**: <150ms od gestu do rozpoznania
  - **Wyjaśnienie:** System wykrywa mrugnięcie w mniej niż jedną szóstą sekundy – tak szybko, że dla użytkownika wydaje się to natychmiastowe
- **Opóźnienie Mowy**: <1s od gestu do wyjścia audio
- **Częstotliwość Klatek**: 15-30 FPS (adaptacyjna w zależności od urządzenia)
  - **Dla początkujących:** FPS (frames per second) to liczba analizowanych klatek wideo na sekundę. System automatycznie dostosowuje tę wartość – na mocniejszym komputerze analizuje 30 klatek/s, na słabszym 15 klatek/s
- **Dokładność**: >95% rozpoznawania gestów w optymalnych warunkach

### **Kompatybilność Przeglądarek**
| Funkcja | Chrome | Firefox | Safari | Edge |
|---------|:------:|:-------:|:------:|:----:|
| MediaPipe | ✅ | ✅ | ✅ | ✅ |
| WebGazer | ✅ | ✅ | ⚠️ | ✅ |
| Speech API | ✅ | ✅ | ✅ | ✅ |
| IndexedDB | ✅ | ✅ | ✅ | ✅ |

**Legenda:** ✅ = Pełne wsparcie, ⚠️ = Częściowe wsparcie lub ograniczenia

---

## 🔧 **Implementacja Techniczna**

### **Aktualna Architektura**

**Wyjaśnienie architektury:** System Blink Speech składa się z dwóch głównych części: frontendu (działa w przeglądarce użytkownika) i backendu (serwer API). Frontend zajmuje się całą analizą wideo i wykrywaniem gestów lokalnie, podczas gdy backend zarządza przechowywaniem niestandardowych mapowań gestów i opcjonalnymi funkcjami jak SMS.

```
┌─────────────────────────────────────────┐
│           KLIENT (Przeglądarka)         │
├─────────────────────────────────────────┤
│  React 18 + TypeScript + Vite          │
│  ├─ MediaPipe (Punkty Charakterystyczne)│
│  ├─ WebGazer.js (Śledzenie Wzroku)     │
│  ├─ Web Speech API (TTS)               │
│  ├─ LocalForage (Przechowywanie Danych)│
│  └─ Radix UI + Tailwind (Interfejs)    │
└─────────────────────────────────────────┘
                    │ HTTPS/WSS
┌─────────────────────────────────────────┐
│           SERWER (API)                  │
├─────────────────────────────────────────┤
│  Next.js API Routes                    │
│  ├─ Supabase (Baza Danych)             │
│  ├─ Twilio (Integracja SMS)            │
│  └─ Uwierzytelnianie i Przechowywanie  │
└─────────────────────────────────────────┘
```

**Dla początkujących - komponenty stosu:**
- **React 18**: Biblioteka JavaScript do budowania interfejsów użytkownika
- **TypeScript**: JavaScript z typowaniem, które pomaga wykrywać błędy podczas programowania
- **Vite**: Szybkie narzędzie do budowania aplikacji webowych
- **MediaPipe**: Biblioteka Google do analizy twarzy i punktów charakterystycznych
- **WebGazer.js**: Biblioteka do śledzenia wzroku w przeglądarce
- **Web Speech API**: Natywne API przeglądarki do syntezy mowy (text-to-speech)
- **LocalForage**: Biblioteka do przechowywania danych lokalnie w przeglądarce
- **Supabase**: Backend-as-a-Service z bazą danych PostgreSQL
- **Twilio**: Usługa do wysyłania SMS-ów

### **Struktura Projektu**
```
Blink-Speech/
├── frontend/          # Aplikacja React + Vite
│   ├── src/
│   │   ├── components/  # Komponenty UI
│   │   ├── hooks/      # Niestandardowe hooki React
│   │   ├── pages/      # Komponenty tras  
│   │   ├── utils/      # Funkcje narzędziowe
│   │   └── types/      # Definicje TypeScript
│   └── package.json
├── backend/           # Trasy API Next.js
│   ├── pages/api/     # Endpointy API
│   └── package.json
├── docs/             # Kompletna dokumentacja
└── README.md         # Przegląd projektu
```

### Logika Rozpoznawania Gestów

**Wyjaśnienie przepływu:** Ta logika znajduje się w niestandardowym hooku (np. `hooks/useGestureSpeech.ts`), który przetwarza strumień wideo klatka po klatce. Dla każdej klatki system:
1. Wykrywa twarz i punkty charakterystyczne
2. Oblicza EAR (Eye Aspect Ratio) aby określić stan oka
3. Określa kierunek spojrzenia na podstawie pozycji źrenicy
4. Rejestruje timestampy (znaczniki czasu) mrugnięć
5. Analizuje wzorce mrugnięć aby rozpoznać gesty
6. Wywołuje odpowiednią frazę przez Web Speech API

```ts
// Uproszczona logika przetwarzania klatek
let blinkTimestamps: number[] = [];

async function processFrame(videoElement) {
  // Preferuj MediaPipe dla punktów charakterystycznych wysokiej wierności
  const faces = await mediaPipeModel.estimateFaces({ input: videoElement });
  
  if (faces.length > 0) {
    const landmarks = faces[0].scaledMesh;
    const ear = calculateEAR(landmarks); // Oblicz Eye Aspect Ratio
    const gazeDir = gazeDirection(landmarks);

    // Wykryj mrugnięcie gdy EAR spada poniżej progu
    if (ear < DYNAMIC_BLINK_THRESHOLD) {
      blinkTimestamps.push(performance.now());
    }
    // Wykryj wzorzec z timestampów i kierunku spojrzenia, następnie mów
    detectPatternAndSpeak(blinkTimestamps, gazeDir); 
  } else {
    // Powrót do WebGazer jeśli MediaPipe zawiedzie
    // WebGazer może użyć jasności obszarów oka jako przybliżenia
  }
}
```

**Wyjaśnienie funkcji calculateEAR:**
Funkcja `calculateEAR` implementuje wzór matematyczny opisany wcześniej. Pobiera 6 punktów charakterystycznych wokół oka i oblicza stosunek odległości pionowych do poziomych. Niska wartość (< 0.25) oznacza zamknięte oko.

**Wyjaśnienie funkcji detectPatternAndSpeak:**
Ta funkcja analizuje tablicę `blinkTimestamps` (znaczników czasu mrugnięć) aby określić, czy wykryto specyficzny wzorzec:
- Jeśli dwa timestampy są w odległości < 400ms = podwójne mrugnięcie
- Jeśli trzy timestampy są w odległości < 700ms = potrójne mrugnięcie
- Jeśli jedno mrugnięcie trwa > 800ms = długie mrugnięcie
System następnie łączy wykryty wzorzec z kierunkiem spojrzenia i wyszukuje odpowiednią frazę w mapowaniu.

### Endpointy API i Trwałość Danych

Niestandardowe mapowania fraz są przechowywane w bazie danych **Supabase** i dostępne poprzez trasę API Next.js.

**Wyjaśnienie architektury danych:** 
- **Frontend** (przeglądarka): Tymczasowo przechowuje mapowania w LocalStorage/IndexedDB
- **Backend** (Supabase): Trwale przechowuje mapowania w bazie PostgreSQL
- **API** (Next.js): Pośredniczy między frontendem a bazą danych

**Schemat Bazy Danych:**

  * **Tabela**: `patterns`
  * **Kolumny**:
      * `sid`: `TEXT PRIMARY KEY` - unikalny identyfikator sesji użytkownika
      * `mapping`: `JSONB` - obiekt JSON zawierający pełne mapowanie gestów

**Wyjaśnienie typów danych:**
- `TEXT PRIMARY KEY`: Kolumna tekstowa będąca głównym kluczem (unikalny identyfikator rekordu)
- `JSONB`: Specjalny typ PostgreSQL do przechowywania danych JSON w binarnym formacie – szybszy i bardziej wydajny niż zwykły tekst JSON

**Trasa API**: `pages/api/patterns/[sid].ts`

```ts
// pages/api/patterns/[sid].ts
import { createClient } from '@supabase/supabase-js';

// Inicjalizacja klienta Supabase
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const { sid } = req.query;

  if (req.method === 'GET') {
    // Pobierz mapowanie dla danego użytkownika
    const { data } = await sb.from('patterns').select('mapping').eq('sid', sid).single();
    // Zwróć niestandardowe mapowanie lub domyślne
    res.status(200).json({ mapping: data?.mapping ?? defaultMapping });
  } 
  else if (req.method === 'POST') {
    const { mapping } = req.body;
    // 'upsert' tworzy lub aktualizuje mapowanie użytkownika
    // Jeśli rekord z danym sid istnieje - aktualizuje, jeśli nie - tworzy nowy
    await sb.from('patterns').upsert({ sid, mapping }, { onConflict: 'sid' });
    res.status(201).json({ success: true });
  }
}
```

**Dla początkujących - metody HTTP:**
- **GET**: Pobiera dane (tutaj: odczytuje mapowanie z bazy)
- **POST**: Wysyła dane do zapisania (tutaj: zapisuje/aktualizuje mapowanie)
- **upsert**: Operacja "update or insert" - jeśli rekord istnieje to go aktualizuje, jeśli nie to tworzy nowy

### Synteza Mowy (Text-to-Speech)

Prosta funkcja narzędziowa opakowuje Web Speech API dla łatwego użycia.

```ts
// lib/tts.ts
export function speak(text: string, lang = 'en-US') {
  if (!text || typeof window === 'undefined') return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}
```

**Wyjaśnienie działania:**
1. Funkcja sprawdza czy tekst nie jest pusty i czy kod działa w przeglądarce (nie na serwerze)
2. Tworzy obiekt `SpeechSynthesisUtterance` - reprezentuje tekst do wypowiedzenia
3. Ustawia język (domyślnie angielski amerykański)
4. Wywołuje `window.speechSynthesis.speak()` - natywne API przeglądarki syntetyzuje i wypowiada tekst

**Dla początkujących:** Web Speech API jest wbudowane w nowoczesne przeglądarki. Nie wymaga żadnych zewnętrznych bibliotek czy połączenia internetowego - synteza głosu dzieje się całkowicie lokalnie w przeglądarce.


---

## 🚀 **Rozpoczęcie Pracy - Kolejne Kroki**

### **Dla Użytkowników**
1. 📖 Przeczytaj [Przewodnik Użytkownika](./docs/user-guide.md) aby uzyskać szczegółowe instrukcje użytkowania
2. 🔧 Sprawdź [Rozwiązywanie Problemów](./docs/troubleshooting.md) jeśli napotkasz problemy
3. ⚙️ Dowiedz się o opcjach [Konfiguracji](./docs/configuration.md)

### **Dla Programistów**
1. 🛠️ Postępuj zgodnie z [Przewodnikiem Instalacji](./docs/installation.md) aby skonfigurować środowisko
2. 💻 Przeczytaj [Przewodnik Deweloperski](./docs/development-guide.md) aby poznać przepływy pracy  
3. 🏗️ Zrozum projekt [Architektury](./docs/architecture.md)
4. 🧩 Eksploruj [Dokumentację Komponentów](./docs/frontend-components.md)

### **Dla Wdrożenia**
1. 🚀 Postępuj zgodnie z [Przewodnikiem Wdrożenia](./docs/deployment.md) dla środowiska produkcyjnego
2. 🔒 Przejrzyj kwestie bezpieczeństwa i najlepsze praktyki
3. 📊 Skonfiguruj monitorowanie i analitykę

---

## 📚 **Dodatkowe Zasoby**

**Wyjaśnienie:** Poniższa tabela zawiera linki do zewnętrznych bibliotek, frameworków i zasobów edukacyjnych wykorzystywanych w projekcie Blink Speech. Każdy zasób jest opisany z perspektywy jego roli w projekcie.

| Kategoria | Nazwa i Link | Cel |
|----------|-------------|---------|
| **Śledzenie Wzroku** | [WebGazer.js](https://webgazer.cs.brown.edu/) | Śledzenie spojrzenia w przeglądarce z użyciem kamery internetowej, działa bez dodatkowego sprzętu. **Dla początkujących:** To biblioteka JavaScript, która używa uczenia maszynowego do przewidywania, gdzie użytkownik patrzy na ekran, bazując tylko na obrazie z kamery. |
| **Śledzenie Wzroku** | [MediaPipe FaceLandmarker (Web)](https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/web_js) | Wysokiej jakości detekcja punktów charakterystycznych twarzy i tęczówki w przeglądarce przez TensorFlow.js. **Wyjaśnienie:** MediaPipe to zestaw narzędzi Google do analizy mediów. FaceLandmarker wykrywa 468 punktów 3D na twarzy w czasie rzeczywistym. |
| **Detekcja Mrugnięć** | [Eye Aspect Ratio (EAR) Method](https://www.pyimagesearch.com/2017/04/24/eye-blink-detection-opencv-python-dlib/) | Technika detekcji mrugnięć wykorzystująca punkty charakterystyczne twarzy i współczynnik proporcji. **Wyjaśnienie techniczna:** Metoda EAR została opublikowana w 2016 roku i stała się standardem w detekcji mrugnięć ze względu na prostotę i skuteczność. |
| **Przykładowy Kod Detekcji Mrugnięć** | [LearnOpenCV Eye Blink Detection](https://github.com/spmallick/learnopencv/tree/master/Eye-Blink-Detection) | Implementacja detekcji mrugnięć EAR w OpenCV + Dlib. **Dla początkujących:** To repozytorium GitHub zawiera działający przykład kodu w Pythonie, który możesz uruchomić lokalnie aby zrozumieć koncepcję. |
| **Wyjście Mowy** | [Web Speech API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) | Natywne API przeglądarki do syntezy mowy (Text-to-Speech) i rozpoznawania mowy. **Wyjaśnienie:** To standardowe API dostępne we wszystkich nowoczesnych przeglądarkach – nie wymaga instalacji dodatkowych bibliotek. |
| **Wyjście Mowy (Python)** | [gTTS – Google Text-to-Speech](https://github.com/pndurette/gTTS) | Biblioteka po stronie serwera do syntezy mowy w Pythonie. **Nota:** Nie jest używana w obecnej wersji Blink Speech (która działa całkowicie w przeglądarce), ale może być przydatna dla rozszerzeń serwerowych. |
| **Framework Frontend** | [Next.js](https://nextjs.org/) | Framework React do budowania pełnowarstwowych aplikacji webowych. **Dla początkujących:** Next.js rozszerza React o funkcje serwerowe, routing oparty na plikach i optymalizacje wydajności. |
| **Zarządzanie Stanem** | [Zustand](https://zustand-demo.pmnd.rs/) | Lekka biblioteka do zarządzania stanem dla React. **Wyjaśnienie:** Zustand pozwala różnym komponentom React współdzielić i synchronizować dane bez "prop drilling" (przekazywania props przez wiele poziomów). |
| **Stylizacja** | [Tailwind CSS](https://tailwindcss.com/) | Framework CSS typu utility-first do stylizacji. **Dla początkujących:** Zamiast pisać własne klasy CSS, używasz gotowych klas jak `flex`, `text-center`, `bg-blue-500` bezpośrednio w HTML/JSX. |
| **Przechowywanie Trwałe** | [localForage](https://localforage.github.io/localForage/) | Wrapper dla IndexedDB, WebSQL i localStorage do przechowywania danych kalibracji. **Wyjaśnienie:** localForage automatycznie wybiera najlepszą dostępną metodę przechowywania w danej przeglądarce, ukrywając złożoność API. |
| **Backend & Baza Danych** | [Supabase](https://supabase.com/) | Backend-as-a-Service z PostgreSQL, uwierzytelnianiem i funkcjami bezserwerowymi. **Dla początkujących:** Supabase to "otwarta alternatywa dla Firebase" – zapewnia gotową bazę danych, API i uwierzytelnianie bez konieczności konfigurowania własnego serwera. |
| **Komunikacja w Czasie Rzeczywistym** | [Supabase Realtime](https://supabase.com/docs/guides/realtime) | Aktualizacje w czasie rzeczywistym oparte na WebSocket z Supabase. **Wyjaśnienie:** Pozwala na natychmiastową synchronizację zmian w bazie danych między urządzeniami bez odświeżania strony. |
| **Opcjonalne API SMS** | [Twilio SMS API](https://www.twilio.com/docs/sms) | Programowe wysyłanie fraz jako wiadomości SMS. **Przypadek użycia:** Użytkownik może skonfigurować wysyłanie pilnych komunikatów (np. "Pomocy!") bezpośrednio jako SMS do opiekuna. |
| **Biblioteka Widzenia Komputerowego** | [OpenCV.js](https://docs.opencv.org/4.x/d5/d10/tutorial_js_root.html) | Wersja JavaScript OpenCV do analizy obrazu/wideo. **Wyjaśnienie:** OpenCV (Open Computer Vision) to najpopularniejsza biblioteka do przetwarzania obrazów. Wersja .js działa w przeglądarce. |
| **Modele ML w JS** | [TensorFlow.js](https://www.tensorflow.org/js) | Uruchamianie modeli uczenia maszynowego bezpośrednio w przeglądarce. **Dla początkujących:** TensorFlow.js pozwala na inference (przewidywania) modeli AI bez wysyłania danych na serwer – wszystko dzieje się lokalnie w przeglądarce użytkownika. |
| **Przykład Śledzenia Gestów** | [GazeTracking (Python)](https://github.com/antoinelame/GazeTracking) | Biblioteka do śledzenia ruchów oczu w Pythonie, przydatna do prototypowania. **Nota:** Napisana w Pythonie, więc nie jest bezpośrednio używana w projekcie webowym, ale doskonała do nauki koncepcji i eksperymentów. |

