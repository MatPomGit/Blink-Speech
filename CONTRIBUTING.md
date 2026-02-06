# Przewodnik Współpracy (Contributing Guide)

Dziękujemy za zainteresowanie wkładem w projekt **Blink Speech**! 🎉

Cieszymy się, że chcesz pomóc w tworzeniu technologii wspomagającej komunikację. Ten dokument zawiera wytyczne dotyczące współpracy przy projekcie.

## 📋 Spis Treści

- [Kodeks Postępowania](#kodeks-postępowania)
- [Jak Mogę Pomóc?](#jak-mogę-pomóc)
- [Zgłaszanie Błędów](#zgłaszanie-błędów)
- [Proponowanie Nowych Funkcji](#proponowanie-nowych-funkcji)
- [Proces Pull Request](#proces-pull-request)
- [Standardy Kodu](#standardy-kodu)
- [Struktura Commitów](#struktura-commitów)

---

## 📜 Kodeks Postępowania

Projekt ten przestrzega [Kodeksu Postępowania](./CODE_OF_CONDUCT.md). Uczestnicząc, oczekuje się, że będziesz przestrzegać tego kodeksu. Prosimy o zgłaszanie nieakceptowalnego zachowania.

---

## 🤝 Jak Mogę Pomóc?

Istnieje wiele sposobów, aby przyczynić się do projektu Blink Speech:

### **🐛 Zgłaszanie Błędów**
- Znajdź i zgłaszaj błędy poprzez [GitHub Issues](https://github.com/MatPomGit/Blink-Speech/issues)
- Upewnij się, że błąd nie został już zgłoszony
- Dołącz szczegółowe informacje o reprodukcji

### **💡 Proponowanie Funkcji**
- Zaproponuj nowe funkcje lub ulepszenia poprzez GitHub Discussions
- Wyjaśnij przypadek użycia i korzyści

### **📝 Ulepszanie Dokumentacji**
- Popraw literówki, błędy gramatyczne lub niejasne wyjaśnienia
- Dodaj przykłady kodu lub diagramy
- Przetłumacz dokumentację na inne języki

### **🔧 Kod i Implementacja**
- Napraw zgłoszone błędy
- Implementuj nowe funkcje
- Popraw wydajność
- Dodaj testy jednostkowe

### **🧪 Testowanie**
- Testuj aplikację na różnych przeglądarkach i urządzeniach
- Testuj funkcje dostępności z użyciem czytników ekranu
- Dostarczaj feedback od użytkowników końcowych

---

## 🐛 Zgłaszanie Błędów

Gdy zgłaszasz błąd, dołącz następujące informacje:

```markdown
**Opis błędu**
Krótki i jasny opis problemu.

**Kroki do reprodukcji**
1. Przejdź do '...'
2. Kliknij na '...'
3. Przewiń do '...'
4. Zobacz błąd

**Oczekiwane zachowanie**
Co powinno się stać.

**Rzeczywiste zachowanie**
Co faktycznie się stało.

**Zrzuty ekranu**
Jeśli to możliwe, dodaj zrzuty ekranu.

**Środowisko**
- OS: [np. Windows 11, macOS 13]
- Przeglądarka: [np. Chrome 120, Firefox 119]
- Wersja aplikacji: [np. 1.0.0]

**Dodatkowy kontekst**
Wszelkie inne informacje o problemie.
```

---

## 💡 Proponowanie Nowych Funkcji

Gdy proponujesz nową funkcję:

1. **Sprawdź istniejące propozycje** - Ktoś mógł już zaproponować podobną funkcję
2. **Opisz problem** - Jaki problem ta funkcja rozwiązuje?
3. **Zaproponuj rozwiązanie** - Jak wyobrażasz sobie tę funkcję?
4. **Rozważ alternatywy** - Czy istnieją inne sposoby rozwiązania problemu?
5. **Dodatkowy kontekst** - Zrzuty ekranu, mockupy, przykłady z innych aplikacji

---

## 🔄 Proces Pull Request

### **1. Fork Repozytorium**
```bash
# Sklonuj swój fork
git clone https://github.com/TWOJA-NAZWA-UŻYTKOWNIKA/Blink-Speech.git
cd Blink-Speech
```

### **2. Utwórz Gałąź (Branch)**
```bash
# Utwórz nową gałąź dla swojej funkcji/poprawki
git checkout -b feature/nazwa-funkcji
# lub
git checkout -b fix/nazwa-błędu
```

### **3. Wprowadź Zmiany**
- Napisz czysty, czytelny kod
- Postępuj zgodnie ze standardami kodu projektu
- Dodaj lub zaktualizuj testy
- Zaktualizuj dokumentację

### **4. Commituj Zmiany**
```bash
git add .
git commit -m "feat: dodaj nową funkcję X"
```

### **5. Push do Forka**
```bash
git push origin feature/nazwa-funkcji
```

### **6. Otwórz Pull Request**
- Przejdź do oryginalnego repozytorium na GitHub
- Kliknij "New Pull Request"
- Wybierz swoją gałąź
- Wypełnij szablon PR ze szczegółowym opisem

### **Szablon Pull Request**

```markdown
## Opis
Krótki opis zmian.

## Typ zmiany
- [ ] Poprawka błędu (bug fix)
- [ ] Nowa funkcja (feature)
- [ ] Zmiana łamiąca (breaking change)
- [ ] Dokumentacja

## Jak to zostało przetestowane?
Opisz testy, które wykonałeś.

## Checklist
- [ ] Mój kod przestrzega stylu tego projektu
- [ ] Przeprowadziłem self-review
- [ ] Skomentowałem kod w trudnych obszarach
- [ ] Zaktualizowałem dokumentację
- [ ] Moje zmiany nie generują nowych ostrzeżeń
- [ ] Dodałem testy weryfikujące moją poprawkę/funkcję
- [ ] Wszystkie nowe i istniejące testy przechodzą
```

---

## 🎨 Standardy Kodu

### **TypeScript/JavaScript**
- Używaj TypeScript dla nowego kodu
- Przestrzegaj ESLint i Prettier
- Używaj funkcjonalnych komponentów React z hookami
- Unikaj `any` - używaj konkretnych typów

**Przykład:**
```typescript
// ✅ Dobrze
interface SpeechOptions {
  lang: string;
  rate: number;
  pitch: number;
}

function speak(text: string, options: SpeechOptions): void {
  // implementacja
}

// ❌ Źle
function speak(text: any, options: any) {
  // implementacja
}
```

### **React Components**
- Używaj Functional Components
- Ekstrahuj logikę do custom hooks
- Właściwe nazewnictwo props

**Przykład:**
```tsx
// ✅ Dobrze
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### **CSS/Styling**
- Używaj Tailwind CSS utility classes
- Unikaj inline styles (z wyjątkiem dynamicznych wartości)
- Używaj CSS variables dla kolorów i spacingu

---

## 📝 Struktura Commitów

Używamy [Conventional Commits](https://www.conventionalcommits.org/) dla jasnej historii:

### **Format:**
```
<typ>(<zakres>): <opis>

[opcjonalne ciało]

[opcjonalne stopki]
```

### **Typy:**
- `feat`: Nowa funkcja
- `fix`: Poprawka błędu
- `docs`: Zmiany w dokumentacji
- `style`: Formatowanie, brakujące średniki itp. (bez zmian w kodzie)
- `refactor`: Refaktoryzacja kodu
- `perf`: Ulepszenie wydajności
- `test`: Dodanie lub poprawienie testów
- `chore`: Aktualizacja zadań buildu, konfiguracji itp.

### **Przykłady:**
```bash
feat(gesture): add triple blink detection
fix(speech): resolve voice selection bug on Safari
docs(readme): update installation instructions
style(frontend): format code with prettier
refactor(api): simplify pattern matching logic
perf(detection): optimize EAR calculation
test(hooks): add tests for useSpeechVoices
chore(deps): update dependencies
```

---

## 🧪 Testowanie

### **Przed Pull Request:**
```bash
# Frontend
cd frontend
npm run lint
npm run build
npm run test  # jeśli dostępne

# Backend
cd backend
npm run lint
npm run build
npm run test  # jeśli dostępne
```

### **Testowanie Manualne:**
- Przetestuj w co najmniej 2 przeglądarkach (Chrome, Firefox)
- Sprawdź responsywność na różnych rozdzielczościach
- Przetestuj z czytnikiem ekranu (jeśli dotyczy dostępności)
- Sprawdź konsolę przeglądarki pod kątem błędów

---

## 📚 Zasoby dla Współpracowników

### **Dokumentacja**
- [Przewodnik Instalacji](./docs/installation.md)
- [Przewodnik Deweloperski](./docs/development-guide.md)
- [Architektura Systemu](./docs/architecture.md)
- [Dokumentacja API](./docs/api-documentation.md)

### **Narzędzia**
- [Visual Studio Code](https://code.visualstudio.com/) - Zalecany edytor
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Git](https://git-scm.com/) - Kontrola wersji

---

## ❓ Pytania?

Jeśli masz pytania dotyczące współpracy:

1. Sprawdź [GitHub Discussions](https://github.com/MatPomGit/Blink-Speech/discussions)
2. Przeczytaj [dokumentację](./docs/README.md)
3. Otwórz [nowe zgłoszenie](https://github.com/MatPomGit/Blink-Speech/issues/new) z etykietą "question"

---

## 🙏 Podziękowania

Dziękujemy wszystkim, którzy przyczyniają się do uczynienia Blink Speech lepszym narzędziem dla osób potrzebujących wspomagania komunikacji!

---

*Ostatnia aktualizacja: 2026-02-06*
