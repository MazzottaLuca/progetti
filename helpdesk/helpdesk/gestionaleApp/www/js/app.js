document.addEventListener("deviceready", () => {
  console.log("Cordova è pronto!");

  // URL del backend
  const API_URL = "http://192.168.1.*:8080/api";//cambiare ogni volta con l'IPv4 nuovo al riavvio del pc

  // =========================
  // LOGIN
  // =========================
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Compila tutti i campi");
        return;
      }

      cordova.plugin.http.setDataSerializer("json");

      cordova.plugin.http.post(
        `${API_URL}/utenti/login`,
        { username, password },
        { "Content-Type": "application/json" },
        function (response) {
          const data = JSON.parse(response.data);

          if (data.ruolo !== "cliente") {
            alert("Solo utenti con ruolo cliente possono accedere all'app.");
            return;
          }

          localStorage.setItem("utente", JSON.stringify(data));
          window.location.href = "tickets.html";
        },
        function (response) {
          alert("Errore login: " + (response.error || response.status));
        }
      );
    });
  }

  // =========================
  // REGISTRAZIONE
  // =========================
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Compila tutti i campi");
        return;
      }

      cordova.plugin.http.setDataSerializer("json");

      cordova.plugin.http.post(
        `${API_URL}/utenti/register`,
        {
          username: username,
          passwordHash: password,
          ruolo: "cliente",
        },
        { "Content-Type": "application/json" },
        function (response) {
          alert("Registrazione completata!");
          window.location.href = "login.html";
        },
        function (response) {
          alert("Errore registrazione: " + (response.error || response.status));
        }
      );
    });
  }

  // =========================
  // NAVIGAZIONE
  // =========================
  const goToRegister = document.getElementById("goToRegister");
  if (goToRegister)
    goToRegister.addEventListener(
      "click",
      () => (window.location.href = "registrazione.html")
    );

  const goToLogin = document.getElementById("goToLogin");
  if (goToLogin)
    goToLogin.addEventListener(
      "click",
      () => (window.location.href = "login.html")
    );

  const goBack = document.getElementById("goBack");
  if (goBack)
    goBack.addEventListener(
      "click",
      () => (window.location.href = "tickets.html")
    );

  // =========================
  // CARICAMENTO TICKET
  // =========================
  const ticketList = document.getElementById("ticketList");

  if (ticketList) {
    console.log("Pagina ticket: caricamento...");

    const utente = JSON.parse(localStorage.getItem("utente"));

    if (!utente) {
      alert("Devi effettuare il login!");
      window.location.href = "login.html";
    } else {
      cordova.plugin.http.get(
        `${API_URL}/tickets/utente/${utente.id}`,
        {},
        {},
        function (response) {
          const tickets = JSON.parse(response.data);
          ticketList.innerHTML = "";

          if (tickets.length === 0) {
            ticketList.innerHTML = "<li>Nessun ticket presente.</li>";
            return;
          }

          tickets.forEach((t) => {
            const li = document.createElement("li");

            const statusDot = document.createElement("span");
            statusDot.style.cssText = `
                            display:inline-block;
                            width:10px;
                            height:10px;
                            border-radius:50%;
                            margin-right:8px;
                        `;

            switch (t.stato) {
              case "APERTO":
                statusDot.style.backgroundColor = "orange";
                break;
              case "IN_LAVORAZIONE":
                statusDot.style.backgroundColor = "blue";
                break;
              case "CHIUSO":
                statusDot.style.backgroundColor = "green";
                break;
              default:
                statusDot.style.backgroundColor = "gray";
            }

            li.appendChild(statusDot);
            li.appendChild(
              document.createTextNode(`#${t.id} - ${t.titolo} (${t.stato})`)
            );
            ticketList.appendChild(li);
          });
        },
        function (response) {
          alert(
            "Errore caricamento ticket: " + (response.error || response.status)
          );
        }
      );
    }
  }

  // =========================
  // BOTTONE NUOVO TICKET
  // =========================
  const newTicketBtn = document.getElementById("newTicketBtn");

  if (newTicketBtn) {
    console.log("Bottone nuovo ticket trovato");
    newTicketBtn.addEventListener("click", () => {
      console.log("Vai a nuovo_ticket.html");
      window.location.href = "nuovo_ticket.html";
    });
  } else {
    console.log("ATTENZIONE: newTicketBtn NON trovato");
  }

  // =========================
  // CREAZIONE NUOVO TICKET
  // =========================
  const newTicketForm = document.getElementById("newTicketForm");

  if (newTicketForm) {
    newTicketForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const titolo = document.getElementById("titolo").value.trim();
      const descrizione = document.getElementById("descrizione").value.trim();

      if (!titolo || !descrizione) {
        alert("Compila tutti i campi");
        return;
      }

      const utente = JSON.parse(localStorage.getItem("utente"));
      if (!utente) {
        alert("Devi effettuare il login!");
        window.location.href = "login.html";
        return;
      }

      cordova.plugin.http.setDataSerializer("json");

      cordova.plugin.http.post(
        `${API_URL}/tickets`,
        {
          titolo: titolo,
          descrizione: descrizione,
          utenteId: utente.id, // <-- CAMBIO QUI
          stato: "APERTO",
        },
        { "Content-Type": "application/json" },
        function (response) {
          alert("Ticket creato correttamente!");
          window.location.href = "tickets.html";
        },
        function (response) {
          console.log("ERRORE CREAZIONE RAW:", response);
          alert(
            "Errore creazione ticket: " + (response.error || response.status)
          );
        }
      );
    });
  }
});
