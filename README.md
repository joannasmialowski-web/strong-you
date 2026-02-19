# StrongYou – wizytówka trenera personalnego

Projekt prezentujący landing page oraz panel administracyjny dla trenera personalnego. Aplikacja działa w trybie **pure front-end** – treści przechowywane są w `localStorage`, a panel CMS pozwala edytować je bez backendu.

## Spis treści
1. [Stack technologiczny](#stack-technologiczny)
2. [Architektura i funkcjonalności](#architektura-i-funkcjonalności)
3. [Konfiguracja i uruchomienie](#konfiguracja-i-uruchomienie)
4. [Testy](#testy)
5. [Struktura katalogów](#struktura-katalogów)
6. [Rozwiązania techniczne](#rozwiązania-techniczne)

---

## Stack technologiczny
- **Angular 21** (standalone) + Angular CLI 18
- **Angular Material**
- **Reactive Forms & RxJS**
- **Angular Signals** – zarządzanie stanem logowania
- **SCSS + CSS variables** – paleta dark-theme, layout responsywny
- **Karma + Jasmine** – testy jednostkowe (serwisy, formularze)

## Architektura i funkcjonalności
- **Publiczna strona (landing)**
  - hero z CTA, sekcja opisowa, kafle „Jak pracuję”, statystyki, formularz kontaktowy z walidacją i snackbarami.
  - Nawigacja desktop + mobilnie (`mat-toolbar` + `mat-sidenav`) z obsługą anchorów i zamykania przez backdrop.
- **Podstrony** (`/osiagniecia`, `/przemiany`, `/galeria`, `/o-mnie`, `/kontakt`, `/umow-trening`) – lazy-loaded standalone components.
- **Panel Administratora**
  - logowanie (hardcoded credentials + `localStorage`)
  - dashboard oraz edycja treści (`/admin/content`) z Reactive Forms (`FormArray` dla kafli i statystyk).
  - zmiany zapisują się w `ContentService`, dzięki czemu landing odświeża się „na żywo”.
- **Brak backendu** – wszystkie dane trzymane są po stronie przeglądarki (`DEFAULT_CONTENT` + `localStorage`).

## Konfiguracja i uruchomienie
```bash
npm install
npm start     # dev server dostępny pod http://localhost:4200
```

### Build produkcyjny
```bash
npm run build   # artefakty w dist/strongyou
```

## Testy
```bash
npm run strongyou
```
- Jednostkowe testy obejmują `AuthService`, `ContentService`, `ContactSectionComponent` oraz `AppComponent`.

## Struktura katalogów
```
src/
 ├─ app/
 │   ├─ core/       # modele, serwisy, guardy
 │   ├─ shared/     # współdzielone komponenty (np. main-nav)
 │   └─ features/
 │        ├─ landing/   # landing + sekcje
 │        ├─ pages/     # lazy-loaded podstrony
 │        └─ admin/     # login, dashboard, content editor
 ├─ assets/        # logo (gym.svg), hero image (images/joanna-trener.jpg)
 ├─ styles.scss    # globalny theme i utility classes
 └─ main.ts / app.config.ts / app.routes.ts
```

## Rozwiązania techniczne
1. **Standalone Angular + lazy loading** – konfiguracja routera via `provideRouter`, `withInMemoryScrolling`, brak NgModule.
2. **Mini CMS bez backendu** – `ContentService` łączy `BehaviorSubject` + `localStorage`, formularze w panelu admina (Reactive Forms + `FormArray`).
3. **Signals w AuthService** – prosty system logowania z pamięcią stanu i guardem na `/admin/**`.
4. **Material + custom CSS** – spójna paleta dark theme, klasy `.section__inner`, `.pill-button` i zmienne `--color-*`.
5. **Responsywne menu** – sticky toolbar + `mat-sidenav` overlay, zamykany przy kliknięciu w tło lub przycisk X.
6. **Formularz kontaktowy** – walidacja (`required`, `minLength`, `email`), snackbar po wysłaniu, log danych dla celów demo.

