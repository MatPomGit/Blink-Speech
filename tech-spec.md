# **Dokument Specyfikacji Technicznej (Tech Spec)**
## **Nazwa Projektu:** Blink Speech
**Wersja:** 1.0  
**Data:** 11-Aug-2025  
**Autor:** Akshad Jogi  

---

## **1. Przegląd Systemu**
Blink Speech to narzędzie komunikacji wspomagającej, działające po stronie klienta w przeglądarce internetowej. Aplikacja tłumaczy wzorce mrugnięć i gesty wzroku na wypowiadane frazy. System wykorzystuje wizję komputerową (computer vision) do śledzenia oczu oraz syntezę mowy do komunikacji. Zapewnia pełne wsparcie pracy offline oraz opcjonalną synchronizację z chmurą.

**Dla początkujących:** Wizja komputerowa to dziedzina informatyki, która pozwala komputerom "widzieć" i interpretować obrazy z kamery. W naszym przypadku analizujemy obraz twarzy użytkownika, aby wykryć ruchy oczu i mrugnięcia.

---

## **2. Zakres i Cele Projektu**
- Wykrywanie wzorców mrugnięć oraz kierunków spojrzenia w czasie rzeczywistym
- Mapowanie gestów na frazy z możliwością konfiguracji przez użytkownika
- Generowanie wyjścia głosowego (text-to-speech) oraz wyświetlanie frazy w interfejsie użytkownika
- Przechowywanie preferencji użytkownika lokalnie z opcjonalną kopią zapasową w chmurze

**Edukacyjnie:** System działa w czasie rzeczywistym, co oznacza, że przetwarzanie obrazu z kamery, rozpoznawanie gestów i generowanie mowy następuje natychmiast, z minimalnym opóźnieniem (latencją).

---

## **3. Przegląd Architektury**
**Frontend (warstwa prezentacji):**  React 18, Tailwind CSS, Zustand  
**Warstwa Detekcji (rozpoznawanie gestów):** MediaPipe FaceLandmarker (główny), WebGazer.js (zapasowy)  
**Przechowywanie Danych:** localForage (IndexedDB), Supabase (PostgreSQL)  
**Synteza Mowy:** Web Speech API  
**Opcjonalne Integracje:** Supabase Realtime, Twilio SMS API

**Przepływ Danych (Data Flow):**
1. **Obraz z kamery** → Silnik detekcji (detection engine)
2. **Obliczanie EAR** (Eye Aspect Ratio - współczynnik proporcji oka) oraz **kierunku spojrzenia**
3. **Identyfikacja wzorca** i mapowanie na frazę
4. **Wyjście frazy** poprzez Web Speech API oraz interfejs użytkownika
5. **Opcjonalna synchronizacja** z Supabase (chmura)

**Wyjaśnienie dla studentów:**  
- **EAR (Eye Aspect Ratio)** to matematyczny wskaźnik opisujący stosunek wysokości do szerokości oka. Gdy oko jest otwarte, wartość EAR jest wysoka; gdy zamknięte (mrugnięcie), wartość spada. To kluczowy algorytm w detekcji mrugnięć.
- **Przepływ danych** opisuje drogę, jaką przechodzą informacje w systemie - od kamery, przez analizę, po końcowy efekt (mowę).

---

## **4. Szczegóły Frontendu**
### Strony Aplikacji:
- **Strona Powitalna (Landing Page):** Inicjalizacja sesji użytkownika, prośba o uprawnienia dostępu do kamery
- **Strona Kalibracji (Calibration Page):** Kalibracja spojrzenia w 5 punktach, dane przechowywane lokalnie
- **Strona Aktywnej Sesji (Active Session Page):** Wykrywanie gestów, wyświetlanie fraz, edytor mapowania

**Wyjaśnienie kalibracji:** Kalibracja to proces, w którym użytkownik patrzy na 5 punktów na ekranie, aby system "nauczył się" interpretować pozycję jego oczu. Każdy człowiek ma nieco inną anatomię twarzy, dlatego kalibracja jest kluczowa dla dokładności.

### Komponenty React:
- `GestureGrid` - interfejs użytkownika wyświetlający dostępne gesty
- `PhrasePreview` - wyświetla aktualnie wybraną frazę
- `CalibrationDots` - interfejs procesu kalibracji
- `MappingEditor` - interfejs do niestandardowego mapowania gestów na frazy

**Dla początkujących:** Komponenty to samodzielne, wielokrotnego użytku elementy interfejsu użytkownika w React. Każdy komponent odpowiada za jedną konkretną funkcjonalność (np. `GestureGrid` tylko za wyświetlanie siatki gestów).

---

## **5. Szczegóły Backendu/API**
**Ścieżka Bazowa:** `/api`

**Endpointy API:**
1. `GET /patterns/:sid` → Zwraca mapowanie dla konkretnego ID sesji
2. `POST /patterns/:sid` → Zapisuje/aktualizuje mapowanie

**Wyjaśnienie:** API (Application Programming Interface) to zestaw reguł, które pozwalają różnym częściom aplikacji komunikować się ze sobą. Endpointy to konkretne "adresy", pod którymi dostępne są określone funkcje.

**Schemat Bazy Danych (Supabase):**
| Kolumna | Typ | Opis |
|--------|------|-------------|
| sid | TEXT (PK) | Identyfikator sesji użytkownika |
| mapping | JSONB | Mapowanie gestów na frazy w formacie JSON |

**Edukacyjnie:**  
- **PK (Primary Key)** - klucz główny, unikalny identyfikator każdego rekordu w bazie danych
- **JSONB** - typ danych PostgreSQL do przechowywania dokumentów JSON w binarnej, zoptymalizowanej formie, co pozwala na szybkie zapytania

---

## **6. Logika Główna (Core Logic)**
### Wykrywanie Mrugnięć (Blink Detection):
- Wykorzystuje **EAR (Eye Aspect Ratio)** do detekcji mrugnięć
- Klasyfikacja oparta na progach (threshold-based) dla: pojedynczego mrugnięcia, podwójnego, potrójnego oraz długiego mrugnięcia

**Algorytm EAR:**  
EAR = (|p2 - p6| + |p3 - p5|) / (2 * |p1 - p4|)  
gdzie p1-p6 to punkty landmarków wokół oka. Gdy EAR spada poniżej progu (np. 0.2), system rejestruje mrugnięcie.

### Wykrywanie Kierunku Spojrzenia (Gaze Detection):
- Określa kierunek na podstawie odchylenia od skalibrowanego centrum
- Porównuje aktualną pozycję źrenicy z danymi referencyjnymi z kalibracji

**Dla studentów:** System zapamiętuje, gdzie użytkownik patrzył podczas kalibracji (centrum), a następnie porównuje bieżącą pozycję oczu, aby określić kierunek: lewo, prawo, góra, dół.

### Dopasowywanie Wzorców (Pattern Matching):
- Łączy dane o mrugnięciach i spojrzeniu w klucz (np. `doubleBlink_lookLeft`)
- Wyszukiwanie w mapowaniu JSON - struktura klucz-wartość, gdzie klucz to gest, a wartość to fraza

**Przykład:**
```json
{
  "doubleBlink_lookLeft": "Chcę pić wodę",
  "tripleBlink_center": "Potrzebuję pomocy"
}
```

### Wyjście Głosowe (Speech Output):
- **Web Speech API** generuje syntetyczną mowę
- Fraza jest jednocześnie wyświetlana w interfejsie użytkownika

**Edukacyjnie:** Web Speech API to wbudowana w przeglądarkę funkcjonalność, która zamienia tekst na mowę. Nie wymaga dodatkowych bibliotek - działa natywnie w nowoczesnych przeglądarkach.

---

## **7. Stos Technologiczny i Narzędzia**
- **Frontend:** Next.js, React, Tailwind CSS, Zustand
- **Detekcja:** MediaPipe, WebGazer.js
- **Przechowywanie:** localForage, Supabase
- **Synteza Mowy:** Web Speech API
- **Budowanie:** pnpm, Node.js
- **Deployment (wdrożenie):** Vercel/Netlify

**Przegląd technologii dla początkujących:**
- **React** - biblioteka JavaScript do budowania interfejsów użytkownika
- **Next.js** - framework oparty na React, dodający routing i server-side rendering
- **Tailwind CSS** - utility-first framework CSS do szybkiego stylowania
- **Zustand** - lekka biblioteka do zarządzania stanem aplikacji
- **MediaPipe** - framework Google do rozwiązań machine learning w czasie rzeczywistym
- **IndexedDB** - baza danych w przeglądarce do przechowywania dużych ilości danych lokalnie
- **pnpm** - szybki menedżer pakietów JavaScript (alternatywa dla npm)

---

## **8. Wymagania Wydajnościowe**
- Opóźnienie (latencja) detekcji mrugnięć/spojrzenia: **<150ms**
- Wyjście głosowe: **<1s** po rozpoznaniu wzorca

**Dlaczego to ważne:** W aplikacjach czasu rzeczywistego, szczególnie wspomagających komunikację, każde opóźnienie wpływa na doświadczenie użytkownika. 150ms to czas, który człowiek prawie nie zauważa, co zapewnia naturalność interakcji.

---

## **9. Bezpieczeństwo**
- Dane wideo **nie opuszczają** przeglądarki klienta, chyba że użytkownik włączy synchronizację z chmurą
- Wymagane połączenie **HTTPS** (szyfrowana komunikacja)
- Klucze API przechowywane w zmiennych środowiskowych (environment variables)

**Edukacyjnie:**  
- **Client-side processing** - przetwarzanie po stronie klienta oznacza, że cała analiza obrazu z kamery odbywa się w przeglądarce użytkownika, zapewniając prywatność
- **HTTPS** - protokół bezpiecznego przesyłania danych, szyfruje komunikację między przeglądarką a serwerem
- **Environment variables** - zmienne konfiguracyjne przechowywane poza kodem, co zapobiega przypadkowemu ujawnieniu wrażliwych danych (np. kluczy API)

---

## **10. Plan Wdrożenia (Deployment)**
1. Wdrożenie frontendu i tras backendowych poprzez Vercel
2. Konfiguracja Supabase do przechowywania danych w bazie
3. Ustawienie zmiennych środowiskowych (API keys, connection strings)

**Dla studentów:** Deployment to proces publikowania aplikacji w internecie, aby była dostępna dla użytkowników. Vercel to platforma, która automatyzuje ten proces dla aplikacji Next.js.

---

## **11. Przyszłe Usprawnienia**
- Pakiety fraz w wielu językach (multi-language phrase packs)
- Adaptacyjna czułość gestów (dostosowanie do indywidualnych potrzeb użytkownika)
- Wsparcie dla urządzeń mobilnych/tabletów
- Wspomaganie detekcji wzorców przez AI (uczenie maszynowe do lepszego rozpoznawania gestów)