/**
 * api.js — Tutte le chiamate HTTP al backend Spring Boot.
 *
 * Su emulatore Android, il PC host è raggiungibile su 10.0.2.2
 * Su dispositivo fisico nella stessa rete, usa l'IP del PC (es. 192.168.1.X)
 */

const API_BASE = "http://192.168.1.*:8080/api"; //cambiare sempre con ipv4 attuale

// Chiave localStorage per il token JWT
const TOKEN_KEY = "emote_token";
const USER_KEY = "emote_user";

/* ---- helpers ---- */

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function saveSession(token, utenteId, nomeUtente) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify({ utenteId, nomeUtente }));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function isLoggedIn() {
  return !!getToken();
}

async function request(method, path, body = null, auth = true) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = "Bearer " + token;
  }

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(API_BASE + path, opts);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.errore || `Errore HTTP ${res.status}`);
    }
    return data;
  } catch (e) {
    console.error("FETCH ERROR:", e.message, method, API_BASE + path);
    throw e;
  }
}

/* ---- API pubbliche ---- */

const Api = {
  async login(nomeUtente, password) {
    const data = await request(
      "POST",
      "/auth/login",
      { nomeUtente, password },
      false,
    );
    saveSession(data.token, data.utenteId, data.nomeUtente);
    return data;
  },

  async register(nomeUtente, email, password) {
    const data = await request(
      "POST",
      "/auth/register",
      { nomeUtente, email, password },
      false,
    );
    saveSession(data.token, data.utenteId, data.nomeUtente);
    return data;
  },

  logout() {
    clearSession();
  },

  async getCommenti() {
    return await request("GET", "/commenti");
  },

  async creaCommento(testo) {
    return await request("POST", "/commenti", { testo });
  },

  async reagisci(commentoId, emote) {
    return await request("POST", "/reazioni", { commentoId, emote });
  },

  async getReazioni(commentoId) {
    return await request("GET", `/reazioni/${commentoId}`);
  },

  isLoggedIn,
  getUser,
};
