# Synteza Mowy (Speech Synthesis) - Dokumentacja Techniczna

## 🗣️ **Przegląd**

Blink Speech wykorzystuje natywne **Web Speech API** do przekształcania tekstu na mowę (Text-to-Speech, TTS). Wszystkie operacje syntezy mowy odbywają się lokalnie w przeglądarce użytkownika, zapewniając prywatność i eliminując potrzebę połączenia z zewnętrznymi usługami.

**Dla początkujących:** Web Speech API to wbudowana funkcjonalność nowoczesnych przeglądarek, która pozwala na syntezę mowy bez dodatkowych bibliotek czy połączenia internetowego.

---

## 🏗️ **Architektura Systemu**

```
┌─────────────────────────────────────────┐
│     Detekcja Gestu (Gesture Detected)  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Mapowanie Gest → Fraza                 │
│  (Gesture-to-Phrase Mapping)            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Moduł Syntezy Mowy                     │
│  (Speech Synthesis Module)              │
│  ├─ Wybór głosu (Voice Selection)       │
│  ├─ Konfiguracja (Rate, Pitch, Volume)  │
│  └─ Kolejkowanie (Queue Management)     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  Web Speech API                         │
│  window.speechSynthesis                 │
└──────────────┬──────────────────────────┘
               │
               ▼
         Wyjście Audio
```

---

## 🔧 **Implementacja**

### **Podstawowa Funkcja TTS**

```typescript
// lib/tts.ts lub utils/speechSynthesis.ts

export interface SpeechOptions {
  lang?: string;
  rate?: number;    // 0.1 - 10 (default: 1)
  pitch?: number;   // 0 - 2 (default: 1)
  volume?: number;  // 0 - 1 (default: 1)
  voice?: SpeechSynthesisVoice;
}

export function speak(text: string, options: SpeechOptions = {}): void {
  // Walidacja środowiska
  if (!text || typeof window === 'undefined') {
    console.warn('Speech synthesis: Invalid text or not in browser environment');
    return;
  }

  // Sprawdzenie wsparcia API
  if (!('speechSynthesis' in window)) {
    console.error('Web Speech API is not supported in this browser');
    return;
  }

  // Utworzenie utterance (wypowiedzi)
  const utterance = new SpeechSynthesisUtterance(text);

  // Konfiguracja parametrów
  utterance.lang = options.lang || 'pl-PL';
  utterance.rate = options.rate || 1.0;
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;

  // Opcjonalny wybór głosu
  if (options.voice) {
    utterance.voice = options.voice;
  }

  // Event handlers dla monitorowania
  utterance.onstart = () => {
    console.log('Speech started:', text);
  };

  utterance.onend = () => {
    console.log('Speech ended');
  };

  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event.error);
  };

  // Wypowiedzenie tekstu
  window.speechSynthesis.speak(utterance);
}

// Funkcja zatrzymania mowy
export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Funkcja pauzy
export function pauseSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
}

// Funkcja wznowienia
export function resumeSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
}
```

**Wyjaśnienie parametrów:**
- **rate**: Szybkość mowy (1.0 = normalna, 0.5 = wolniejsza, 2.0 = szybsza)
- **pitch**: Wysokość głosu (1.0 = normalna, 0.5 = niższy, 2.0 = wyższy)
- **volume**: Głośność (0.0 = cicho, 1.0 = maksymalna głośność)

---

## 🎙️ **Zarządzanie Głosami**

### **Pobieranie Dostępnych Głosów**

```typescript
// hooks/useSpeechVoices.ts
import { useState, useEffect } from 'react';

export function useSpeechVoices(lang: string = 'pl-PL') {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadVoices() {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Filtruj głosy dla wybranego języka
      const filteredVoices = availableVoices.filter(
        voice => voice.lang.startsWith(lang.split('-')[0])
      );
      
      setVoices(filteredVoices.length > 0 ? filteredVoices : availableVoices);
      setLoading(false);
    }

    // Głosy mogą nie być dostępne od razu
    loadVoices();
    
    // Event listener na zmianę głosów
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [lang]);

  return { voices, loading };
}
```

**Dla początkujących:** Głosy w Web Speech API są ładowane asynchronicznie, dlatego potrzebujemy event listenera `onvoiceschanged` aby upewnić się, że mamy dostęp do wszystkich dostępnych głosów.

---

## ⚙️ **Konfiguracja i Personalizacja**

### **Komponent Ustawień Mowy**

```tsx
// components/SpeechSettings.tsx
import React from 'react';
import { useSpeechVoices } from '@/hooks/useSpeechVoices';

interface SpeechSettingsProps {
  onSettingsChange: (settings: SpeechOptions) => void;
}

export function SpeechSettings({ onSettingsChange }: SpeechSettingsProps) {
  const { voices } = useSpeechVoices('pl-PL');
  const [settings, setSettings] = useState<SpeechOptions>({
    lang: 'pl-PL',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  });

  const updateSetting = (key: keyof SpeechOptions, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="speech-settings">
      <h3>Ustawienia Mowy</h3>
      
      {/* Wybór głosu */}
      <label>
        Głos:
        <select onChange={(e) => {
          const voice = voices.find(v => v.name === e.target.value);
          updateSetting('voice', voice);
        }}>
          {voices.map(voice => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </label>

      {/* Szybkość mowy */}
      <label>
        Szybkość: {settings.rate}x
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.rate}
          onChange={(e) => updateSetting('rate', parseFloat(e.target.value))}
        />
      </label>

      {/* Wysokość głosu */}
      <label>
        Wysokość: {settings.pitch}
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={settings.pitch}
          onChange={(e) => updateSetting('pitch', parseFloat(e.target.value))}
        />
      </label>

      {/* Głośność */}
      <label>
        Głośność: {Math.round(settings.volume * 100)}%
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={settings.volume}
          onChange={(e) => updateSetting('volume', parseFloat(e.target.value))}
        />
      </label>

      {/* Test przycisk */}
      <button onClick={() => speak('To jest test syntezy mowy', settings)}>
        Testuj Mowę
      </button>
    </div>
  );
}
```

---

## 🌍 **Wsparcie Wielu Języków**

### **Dostępne Języki i Głosy**

| Język | Kod | Przykładowe Głosy | Wsparcie |
|-------|-----|-------------------|----------|
| Polski | `pl-PL` | Google polski, Microsoft Paulina | ✅ Pełne |
| Angielski (US) | `en-US` | Google US English, Microsoft David | ✅ Pełne |
| Angielski (UK) | `en-GB` | Google UK English, Microsoft Hazel | ✅ Pełne |
| Niemiecki | `de-DE` | Google Deutsch, Microsoft Stefan | ✅ Pełne |
| Francuski | `fr-FR` | Google français, Microsoft Julie | ✅ Pełne |
| Hiszpański | `es-ES` | Google español, Microsoft Helena | ✅ Pełne |

**Uwaga:** Dostępne głosy zależą od systemu operacyjnego i przeglądarki użytkownika.

### **Automatyczne Wykrywanie Języka**

```typescript
export function detectLanguage(text: string): string {
  // Prosta detekcja na podstawie znaków
  const polishChars = /[ąćęłńóśźż]/i;
  const cyrillicChars = /[а-яА-ЯЁё]/;
  
  if (polishChars.test(text)) return 'pl-PL';
  if (cyrillicChars.test(text)) return 'ru-RU';
  
  return 'en-US'; // Domyślny
}

export function speakAuto(text: string, options: SpeechOptions = {}): void {
  const lang = detectLanguage(text);
  speak(text, { ...options, lang });
}
```

---

## 📊 **Kompatybilność Przeglądarek**

| Przeglądarka | Wersja | Wsparcie | Uwagi |
|--------------|--------|----------|-------|
| **Chrome** | 33+ | ✅ Pełne | Najlepsze wsparcie, wiele głosów |
| **Firefox** | 49+ | ✅ Pełne | Dobre wsparcie |
| **Safari** | 7+ | ✅ Dobre | Ograniczone głosy na iOS |
| **Edge** | 14+ | ✅ Pełne | Oparte na Chromium |
| **Opera** | 21+ | ✅ Pełne | Oparte na Chromium |
| **IE** | - | ❌ Brak | Nie wspierane |

**Sprawdzanie wsparcia:**
```typescript
export function isSpeechSynthesisSupported(): boolean {
  return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}
```

---

## 🔍 **Rozwiązywanie Problemów**

### **Częste Problemy**

#### **Problem: Brak dźwięku**
**Rozwiązanie:**
1. Sprawdź czy głośność systemowa jest włączona
2. Sprawdź czy `volume` w opcjach jest > 0
3. Sprawdź czy przeglądarka ma uprawnienia do odtwarzania dźwięku

#### **Problem: Mowa nie działa na iOS Safari**
**Rozwiązanie:**
- iOS Safari wymaga bezpośredniej interakcji użytkownika przed odtworzeniem dźwięku
- Upewnij się, że `speak()` jest wywoływane w response na kliknięcie/dotyk użytkownika

```typescript
// Workaround dla iOS
export function initializeSpeechSynthesis(): void {
  if (window.speechSynthesis && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const utterance = new SpeechSynthesisUtterance('');
    utterance.volume = 0;
    window.speechSynthesis.speak(utterance);
  }
}
```

#### **Problem: Głosy nie ładują się od razu**
**Rozwiązanie:**
```typescript
function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise(resolve => {
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        resolve(voices);
      };
    }
  });
}
```

---

## 🚀 **Optymalizacje Wydajności**

### **Kolejkowanie Fraz**

```typescript
// Zarządzanie kolejką fraz
class SpeechQueue {
  private queue: string[] = [];
  private isSpeaking: boolean = false;

  add(text: string): void {
    this.queue.push(text);
    this.processQueue();
  }

  private processQueue(): void {
    if (this.isSpeaking || this.queue.length === 0) return;

    this.isSpeaking = true;
    const text = this.queue.shift()!;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      this.isSpeaking = false;
      this.processQueue(); // Przetwórz kolejną frazę
    };

    window.speechSynthesis.speak(utterance);
  }

  clear(): void {
    this.queue = [];
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
  }
}

export const speechQueue = new SpeechQueue();
```

### **Caching Głosów**

```typescript
let cachedVoices: SpeechSynthesisVoice[] | null = null;

export function getVoicesCached(): SpeechSynthesisVoice[] {
  if (cachedVoices === null) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  return cachedVoices;
}
```

---

## 📚 **Najlepsze Praktyki**

1. **Zawsze sprawdzaj wsparcie API** przed użyciem
2. **Używaj event handlerów** (`onstart`, `onend`, `onerror`) do monitorowania
3. **Implementuj kolejkowanie** dla wielu fraz
4. **Zapisuj preferencje użytkownika** (głos, szybkość, wysokość) w localStorage
5. **Testuj na różnych przeglądarkach** i systemach operacyjnych
6. **Zapewnij feedback wizualny** podczas mowy (np. animacja mikrofonu)
7. **Obsługuj błędy gracefully** z fallbackami

---

## 🔗 **Zasoby Dodatkowe**

- [MDN Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [W3C Speech API Specification](https://w3c.github.io/speech-api/)
- [Can I Use: Speech Synthesis](https://caniuse.com/speech-synthesis)

---

## 📝 **Przykład Pełnej Integracji**

```typescript
// hooks/useGestureSpeech.ts
import { useState, useEffect } from 'react';
import { speak, SpeechOptions } from '@/lib/tts';

export function useGestureSpeech(gestureMapping: Record<string, string>) {
  const [speechSettings, setSpeechSettings] = useState<SpeechOptions>({
    lang: 'pl-PL',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
  });

  const speakGesture = (gestureKey: string): void => {
    const phrase = gestureMapping[gestureKey];
    if (phrase) {
      speak(phrase, speechSettings);
    }
  };

  return {
    speakGesture,
    speechSettings,
    setSpeechSettings,
  };
}
```

---

*Ostatnia aktualizacja: 2026-02-06*
