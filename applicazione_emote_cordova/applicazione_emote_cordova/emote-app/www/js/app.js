/**
 * app.js — Logica principale dell'app Emote.
 * Gestisce la navigazione tra schermate e tutti gli eventi UI.
 */

/* ============================================================
   UTILS
   ============================================================ */

function show(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function showError(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.remove("hidden");
}

function hideError(id) {
  document.getElementById(id).classList.add("hidden");
}

function setLoading(btnId, loading) {
  const btn = document.getElementById(btnId);
  btn.disabled = loading;
  btn.textContent = loading ? "Attendere..." : btn.dataset.label;
}

function avatarColor(nome) {
  const colors = [
    "#7c6af7",
    "#f76a8a",
    "#6af7c8",
    "#f7c86a",
    "#6ab4f7",
    "#c86af7",
  ];
  let hash = 0;
  for (let i = 0; i < nome.length; i++)
    hash = nome.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function formatData(isoString) {
  const d = new Date(isoString);
  const ora = d.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const data = d.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
  });
  return `${data} ${ora}`;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str || ""));
  return div.innerHTML;
}

/* ============================================================
   NAVIGAZIONE
   ============================================================ */

document.getElementById("go-register").addEventListener("click", () => {
  show("screen-register");
  hideError("register-error");
});

document.getElementById("go-login").addEventListener("click", () => {
  show("screen-login");
  hideError("login-error");
});

/* ============================================================
   LOGIN
   ============================================================ */

document.getElementById("btn-login").dataset.label = "Accedi";

document.getElementById("btn-login").addEventListener("click", async () => {
  hideError("login-error");
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    showError("login-error", "Compila tutti i campi.");
    return;
  }

  setLoading("btn-login", true);
  try {
    await Api.login(username, password);

    // Mostra home e forza ricarica completa del feed
    show("screen-home");
    document.getElementById("feed").innerHTML = ""; // pulisce feed
    await inizializzaHome(); // ricarica commenti e reazioni aggiornati
  } catch (e) {
    showError("login-error", e.message);
  } finally {
    setLoading("btn-login", false);
  }
});

/* ============================================================
   REGISTRAZIONE
   ============================================================ */

document.getElementById("btn-register").dataset.label = "Crea account";

document.getElementById("btn-register").addEventListener("click", async () => {
  hideError("register-error");
  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if (!username || !email || !password) {
    showError("register-error", "Compila tutti i campi.");
    return;
  }
  if (password.length < 6) {
    showError("register-error", "La password deve avere almeno 6 caratteri.");
    return;
  }

  setLoading("btn-register", true);
  try {
    await Api.register(username, email, password);

    // Dopo la registrazione, forza login: l'utente deve inserire password
    show("screen-login");
    hideError("login-error");
    document.getElementById("login-username").value = username;
    document.getElementById("login-password").value = "";
  } catch (e) {
    showError("register-error", e.message);
  } finally {
    setLoading("btn-register", false);
  }
});
/* ============================================================
   HOME
   ============================================================ */

async function inizializzaHome() {
  const user = Api.getUser();
  const headerUserEl = document.getElementById("header-username");
  if (headerUserEl) {
    headerUserEl.textContent = user ? "@" + user.nomeUtente : "";
  }

  await caricaFeed();
  startPollingFeed();
}
/* === POLLING AUTOMATICO FEED === */
let pollingFeedInterval = null;

async function startPollingFeed() {
  if (pollingFeedInterval) clearInterval(pollingFeedInterval);

  pollingFeedInterval = setInterval(async () => {
    try {
      const feed = document.getElementById("feed");
      if (!feed) return; // Se il feed non esiste, interrompe il polling

      const commenti = await Api.getCommenti();

      commenti.forEach((c) => {
        // Se il commento non è già nel feed
        if (!feed.querySelector(`.commento-card[data-id='${c.id}']`)) {
          const card = creaCardCommento(c);
          if (card) feed.prepend(card); // Controlla che card sia valida
        }
      });

      // Aggiorna le reazioni di tutte le card presenti
      document.querySelectorAll(".commento-card").forEach((c) => {
        if (c && c.dataset && c.dataset.id) caricaReazioni(c.dataset.id);
      });
    } catch (_) {
      // silenzioso
    }
  }, 3000); // ogni 3 secondi
}
/* ---- FEED ---- */

async function caricaFeed() {
  const feed = document.getElementById("feed");
  const loading = document.getElementById("feed-loading");

  if (!feed) return;

  feed.innerHTML = "";

  if (loading) {
    feed.appendChild(loading);
    loading.classList.remove("hidden");
  }

  try {
    const commenti = await Api.getCommenti();

    if (loading) loading.classList.add("hidden");

    if (!commenti || commenti.length === 0) {
      feed.innerHTML =
        '<p style="text-align:center;color:var(--text-muted);padding-top:60px;">Nessun commento ancora.<br>Sii il primo! 👇</p>';
      return;
    }

    commenti.forEach((c, i) => {
      const card = creaCardCommento(c);
      if (!card) return;

      card.style.animationDelay = `${i * 0.05}s`;
      feed.appendChild(card);
    });
  } catch (e) {
    if (loading) loading.classList.add("hidden");

    feed.innerHTML = `<p style="text-align:center;color:var(--accent2);padding-top:60px;">
      Errore nel caricamento.<br>${escapeHtml(e.message)}
    </p>`;
  }
}

function creaCardCommento(c) {
  const card = document.createElement("div");
  card.className = "commento-card";
  card.dataset.id = c.id;
  card.dataset.testo = c.testoCommento;

  const iniziale = (c.nomeUtente || "?")[0].toUpperCase();
  const colore = avatarColor(c.nomeUtente || "");

  card.innerHTML = `
        <div class="commento-top">
            <div class="commento-autore">
                <div class="avatar" style="background:${colore}">${iniziale}</div>
                <span class="commento-nome">${escapeHtml(c.nomeUtente)}</span>
            </div>
            <span class="commento-data">${formatData(c.creatoIl)}</span>
        </div>
        <p class="commento-testo">${escapeHtml(c.testoCommento)}</p>
        <div class="reazioni-lista" id="reazioni-${c.id}"></div>
        <button class="btn-reagisci" data-id="${c.id}" data-testo="${escapeHtml(c.testoCommento)}">
            + Reagisci
        </button>
    `;

  caricaReazioni(c.id);
  return card;
}

async function caricaReazioni(commentoId) {
  try {
    const reazioni = await Api.getReazioni(commentoId);
    const container = document.getElementById(`reazioni-${commentoId}`);
    if (!container) return;

    container.innerHTML = "";
    reazioni.forEach((r) => {
      const chip = document.createElement("div");
      chip.className = "reazione-chip";
      chip.title = r.rispostaGenerata || "";
      chip.innerHTML = `
        <span class="emote-label">${r.emote}</span> 
        <strong>${escapeHtml(r.nomeUtente)}:</strong> 
        <span>${escapeHtml(r.rispostaGenerata || "")}</span>
      `;
      container.appendChild(chip);
    });
  } catch (_) {
    // silenzioso
  }
}

/* ---- LOGOUT ---- */

document.getElementById("btn-logout").addEventListener("click", () => {
  Api.logout();
  show("screen-login");
  document.getElementById("feed").innerHTML = "";
});

/* ---- FAB: apri modal nuovo commento ---- */

document.getElementById("btn-fab").addEventListener("click", () => {
  document.getElementById("nuovo-testo").value = "";
  hideError("nuovo-error");
  document.getElementById("modal-nuovo").classList.remove("hidden");
});

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal-nuovo").classList.add("hidden");
});

/* ---- INVIA NUOVO COMMENTO ---- */

document.getElementById("btn-invia-commento").dataset.label = "Pubblica";

document
  .getElementById("btn-invia-commento")
  .addEventListener("click", async () => {
    hideError("nuovo-error");
    const testo = document.getElementById("nuovo-testo").value.trim();
    if (!testo) {
      showError("nuovo-error", "Scrivi qualcosa prima di pubblicare.");
      return;
    }

    setLoading("btn-invia-commento", true);
    try {
      const nuovoCommento = await Api.creaCommento(testo);
      document.getElementById("modal-nuovo").classList.add("hidden");

      const feed = document.getElementById("feed");

      // Rimuove eventuale messaggio "sei il primo a commentare"
      const primoMsg = feed.querySelector("p");
      if (primoMsg) primoMsg.remove();

      // Inserisce subito il commento nel feed
      const card = creaCardCommento(nuovoCommento);
      feed.prepend(card);

      // Carica immediatamente eventuali reazioni già presenti (anche se appena creato)
      caricaReazioni(nuovoCommento.id);

      // Aggiorna periodicamente le reazioni di tutti i commenti
      setInterval(() => {
        document.querySelectorAll(".commento-card").forEach((c) => {
          caricaReazioni(c.dataset.id);
        });
      }, 5000);
    } catch (e) {
      showError("nuovo-error", e.message);
    } finally {
      setLoading("btn-invia-commento", false);
    }
  });

/* ============================================================
   MODAL REAZIONE
   ============================================================ */

let commentoSelezionato = null;

document.getElementById("feed").addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-reagisci");
  if (!btn) return;

  commentoSelezionato = {
    id: parseInt(btn.dataset.id),
    testo: btn.dataset.testo,
  };

  document.getElementById("reazione-preview").textContent =
    commentoSelezionato.testo.length > 120
      ? commentoSelezionato.testo.substring(0, 120) + "..."
      : commentoSelezionato.testo;

  document.getElementById("reazione-loading").classList.add("hidden");
  document.getElementById("reazione-risultato").classList.add("hidden");
  document.getElementById("modal-reazione").classList.remove("hidden");
});

document.getElementById("reazione-close").addEventListener("click", () => {
  document.getElementById("modal-reazione").classList.add("hidden");
  commentoSelezionato = null;
});

document
  .getElementById("modal-reazione")
  .addEventListener("click", async (e) => {
    const btn = e.target.closest(".emote-btn");
    if (!btn || !commentoSelezionato) return;

    const emote = btn.dataset.emote;
    const loadingEl = document.getElementById("reazione-loading");
    const risultatoEl = document.getElementById("reazione-risultato");

    document.querySelectorAll(".emote-btn").forEach((b) => (b.disabled = true));
    loadingEl.classList.remove("hidden");
    risultatoEl.classList.add("hidden");

    try {
      const risposta = await Api.reagisci(commentoSelezionato.id, emote);

      loadingEl.classList.add("hidden");
      risultatoEl.innerHTML = `
          <span class="emote-risposta">${emote}</span>
          ${escapeHtml(risposta.rispostaGenerata)}
      `;
      risultatoEl.classList.remove("hidden");

      caricaReazioni(commentoSelezionato.id);
    } catch (e) {
      loadingEl.classList.add("hidden");
      risultatoEl.innerHTML = `<span style="color:var(--accent2)">Errore: ${escapeHtml(e.message)}</span>`;
      risultatoEl.classList.remove("hidden");
    } finally {
      document
        .querySelectorAll(".emote-btn")
        .forEach((b) => (b.disabled = false));
    }
  });

/* ============================================================
   AVVIO
   ============================================================ */

document.addEventListener(
  "deviceready",
  () => {
    if (Api.isLoggedIn()) {
      show("screen-home");
      inizializzaHome();
    } else {
      show("screen-login");
    }
  },
  false,
);

if (typeof cordova === "undefined") {
  if (Api.isLoggedIn()) {
    show("screen-home");
    inizializzaHome();
  } else {
    show("screen-login");
  }
}
