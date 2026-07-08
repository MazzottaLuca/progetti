# 💸 FairSplit - Divisione Spese per Coinquilini/Coppie

Un'applicazione essenziale per registrare "chi ha pagato cosa" (bollette, spesa, affitto) e calcolare automaticamente a fine mese i conguagli, indicando esattamente chi deve mandare soldi a chi.

## Caratteristiche

✨ **Registrazione Spese**: Registra ogni spesa indicando chi ha pagato e chi ha beneficiato
📊 **Calcolo Automatico**: Calcola automaticamente i conguagli a fine mese
💰 **Debiti Semplificati**: Mostra esattamente chi deve pagare a chi
🔄 **Sincronizzazione in Tempo Reale**: Sincronizza i dati tra più utenti istantaneamente
📱 **Responsive Design**: Funziona su desktop, tablet e smartphone

## Installazione

### Prerequisiti
- Node.js (v14+)
- npm

### Setup Iniziale

1. Naviga nella cartella del progetto:
```bash
cd "path/to/Nuova cartella"
```

2. Installa le dipendenze:
```bash
npm install
```

## Avvio dell'Applicazione

### Modalità Produzione
```bash
npm start
```

### Modalità Sviluppo (con auto-reload)
```bash
npm run dev
```

L'applicazione sarà disponibile su: **http://localhost:3000**

## Come Usare

### 1. Aggiungi Coinquilini
- Inserisci il nome del coinquilino nel campo "Nome coinquilino"
- Clicca "Aggiungi"
- I nomi appariranno come chip sotto il campo

### 2. Registra una Spesa
- **Descrizione**: Es. "Affitto", "Spesa alimentare", "Bolletta luce"
- **Importo**: Inserisci l'importo in euro
- **Pagato da**: Seleziona chi ha pagato
- **Divisa tra**: Seleziona i coinquilini che condividono la spesa
- Clicca "Registra Spesa"

### 3. Visualizza Conguagli
Nella sezione "Conguagli Finali" vedrai:
- **Saldi**: Per ogni coinquilino, quanto deve ricevere o pagare
- **Debiti Semplificati**: Indica esattamente chi deve pagare a chi

### 4. Gestisci Spese
- Visualizza tutte le spese registrate in "Storico Spese"
- Clicca "Elimina" per rimuovere una spesa errata
- I conguagli verranno ricalcolati automaticamente

## Struttura del Progetto

```
├── public/
│   ├── index.html          # Interface HTML
│   ├── script.js           # Logica frontend + Socket.io
│   └── style.css           # Stili CSS
├── server/
│   ├── index.js            # Server Express + Socket.io
│   └── store.js            # Gestione persistenza dati
├── data.json               # File dei dati (auto-generato)
├── package.json            # Dipendenze del progetto
└── README.md              # Questo file
```

## Come Funziona il Calcolo dei Conguagli

1. **Calcolo Saldi**: Per ogni spesa, chi ha pagato ottiene un credito e chi condivide ottiene un debito
2. **Semplificazione Debiti**: L'algoritmo identifica i trasferimenti minimi necessari tra le persone
3. **Sincronizzazione**: I dati vengono sincronizzati in tempo reale tra tutti gli utenti connessi

### Esempio
- Mario paga 60€ per la spesa (da dividere tra Mario, Giulia, Luca)
- Mario paga 90€ di affitto (da dividere tra tutti)
- Giulia paga 45€ di luce (per se stessa)

Risultato automatico:
- Giulia deve pagare X a Mario
- Luca deve pagare Y a Mario

## Dati Persistenti

I dati vengono salvati automaticamente in `data.json` e ripristinati al riavvio dell'applicazione.

## Tecnologie Utilizzate

- **Frontend**: HTML5, CSS3, JavaScript vanilla, Socket.io Client
- **Backend**: Node.js, Express.js, Socket.io
- **Persistenza**: JSON (file system)
- **Comunicazione**: WebSocket via Socket.io

## Supporto Multi-Utente

L'applicazione supporta la connessione di più utenti simultaneamente grazie a Socket.io:
- Gli utenti vedono in tempo reale i dati aggiornati
- Le modifiche di un utente vengono comunicate a tutti gli altri
- Perfetto per coinquilini o coppie che condividono l'app

## Nota Importante

Tutti i dati sono salvati localmente nel file `data.json`. Non è richiesto alcun account o login. L'accesso è completamente locale.

---

**FairSplit v1.0** | Sviluppato con ❤️ per semplificare la divisione delle spese
