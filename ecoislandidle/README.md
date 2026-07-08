# 🌍 Eco Island Clicker

Un **Idle Game offline** sviluppato in HTML/CSS/JavaScript puro, compilabile per Android con **Capacitor** e **Gradle**.

## 📋 Caratteristiche

✅ **100% Offline** - Funziona completamente senza connessione internet  
✅ **State Locale** - Lo stato del gioco si resetta alla chiusura (design puro, nessun localStorage)  
✅ **Feedback Tattile** - Vibrazione su Android per interazione del click  
✅ **Progressione Isola** - 3 stage visivi basati sui punti accumulati:
- **Stadio 1 (0-10k):** Isola inquinata con smog grigio
- **Stadio 2 (10k-50k):** Isola in transizione con cielo azzurro
- **Stadio 3 (50k+):** Isola rigenerata in paradiso verde

✅ **Shop Dinamico** - 6 potenziamenti con costo esponenziale e generazione di PPS  
✅ **Grafica SVG** - Asset vettoriali scalabili per qualsiasi schermo  
✅ **Mobile-First** - Layout completamente responsive

---

## 🚀 Installazione e Build

### Prerequisiti
- **Node.js** (v18+)
- **npm** o **yarn**
- **Java JDK** (per Gradle/Android)
- **Android SDK** (per compilazione APK)

### 1️⃣ Setup Locale

```bash
# Navigare nella cartella del progetto
cd ecoislandidle

# Installare dipendenze npm
npm install

# Sincronizzare con Capacitor
npx capacitor sync
```

### 2️⃣ Build per Android

```bash
# Build APK (debug)
npm run android

# O manualmente
npx capacitor build android

# Per compilare in gradle (dentro android/)
cd android
./gradlew build
./gradlew assembleDebug
```

### 3️⃣ Test nel Browser (dev)

Apri `public/index.html` nel browser per testare il funzionamento.

---

## 📁 Struttura Progetto

```
ecoislandidle/
├── public/                          # Web app statica
│   ├── index.html                  # HTML principale
│   ├── style.css                   # Stylesheet (mobile-first)
│   ├── app.js                      # Logica di gioco
│   ├── manifest.json               # PWA manifest
│   └── service-worker.js           # Caching offline
├── eco_island_assets/              # Asset grafici (SVG)
│   ├── backgrounds/                # 3 stage dell'isola
│   ├── upgrades/                   # Icone potenziamenti (6x)
│   ├── ui/                         # Icone UI e header
│   └── effects/                    # Particelle di effetto
├── capacitor.config.json           # Config Capacitor
├── package.json                    # Dipendenze npm
├── .gitignore                      # File da ignorare
└── README.md                       # Questo file
```

---

## 🎮 Gameplay

1. **Clicca l'isola** per guadagnare "Punti Natura" (+1 per click)
2. **Acquista potenziamenti** nello shop per generare PPS passivi
3. **Osserva l'isola trasformarsi** dai 3 stage man mano che accumuli punti
4. **Accumula infinitamente** - Nessun tetto massimo, il gioco cresce esponenzialmente

### Potenziamenti Disponibili

| Nome | Costo Base | PPS | Descrizione |
|------|-----------|-----|-------------|
| 🌳 Albero | 10 | 0.1 | Aumenta ossigeno |
| ☀️ Pannello Solare | 100 | 1 | Energia pulita |
| 💨 Turbina Eolica | 500 | 5 | Sfrutta il vento |
| 🌧️ Nuvola Pioggia | 2,000 | 20 | Irrigazione naturale |
| ♻️ Compostiera | 5,000 | 50 | Terreno fertile |
| 🛩️ Idrovolante | 15,000 | 150 | Trasporti puliti |

---

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Grid, Flexbox, Gradients, Animazioni
- **JavaScript ES6+** - Logica di gioco pura
- **Capacitor 5.x** - Ponte nativo per Android
- **Gradle** - Build system Android
- **Service Worker** - Caching offline

---

## 📱 Device Target

- **Android 7.0+** (API 24+)
- **Orientamento:** Portrait (consigliato)
- **Risoluzione:** Smartphone (480px - 1080px width)

---

## 📝 Note di Sviluppo

- ✅ Zero dipendenze esterne (no jQuery, no framework)
- ✅ State interamente in memoria (nessun database)
- ✅ Resetta al riavvio app (design intenzionale)
- ⚠️ Il service worker cachizza gli asset ma non persiste il gameState
- 🎯 Ottimizzato per bassa latenza e high-performance su device Android

---

## 🔒 Privacy & Permessi

L'app **NON** richiede:
- Internet
- Storage
- Camera
- Localization
- Contatti

**Completamente offline-first e privacy-safe.**

---

## 📄 Licenza

MIT - Libero di modificare e distribuire.

---

**Divertiti a rigenerare l'isola! 🌿🌍**
