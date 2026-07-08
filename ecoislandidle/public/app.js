/**
 * SVG Inline - Asset embedded per evitare problemi di path
 * Nota: viewBox usa coordinate interne, non dipende da width/height
 */
const SVG_ASSETS = {
    islandSmog: (width = 500) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 640" width="240" height="240"><defs><radialGradient id="skySmog" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#7a7a7a"/><stop offset="100%" stop-color="#3a3a3a"/></radialGradient><filter id="blur4"><feGaussianBlur stdDeviation="4"/></filter></defs><rect width="${width}" height="640" fill="url(#skySmog)"/><ellipse cx="${width*0.15}" cy="80" rx="80" ry="35" fill="#8a8a8a" opacity="0.7" filter="url(#blur4)"/><ellipse cx="${width*0.55}" cy="60" rx="100" ry="40" fill="#909090" opacity="0.6" filter="url(#blur4)"/><ellipse cx="${width*0.85}" cy="90" rx="70" ry="30" fill="#7a7a7a" opacity="0.7" filter="url(#blur4)"/><rect x="0" y="420" width="${width}" height="220" fill="#2a3a4a" rx="20"/><ellipse cx="${width/2}" cy="470" rx="${width/2.2}" ry="100" fill="#3a4a5a"/><path d="M0 440 Q${width*0.125} 430 ${width*0.25} 440 Q${width*0.375} 450 ${width*0.5} 440 Q${width*0.625} 430 ${width*0.75} 440 Q${width*0.875} 450 ${width} 440" fill="none" stroke="#3a4a5a" stroke-width="2" opacity="0.6"/></svg>`,
    
    islandPartial: (width = 500) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 640" width="240" height="240"><defs><linearGradient id="skyBlue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#4a90e2"/></linearGradient></defs><rect width="${width}" height="640" fill="url(#skyBlue)"/><circle cx="${width*0.85}" cy="80" r="40" fill="#FFD700" opacity="0.8"/><rect x="0" y="420" width="${width}" height="220" fill="#8BC34A" rx="20"/><ellipse cx="${width/2}" cy="470" rx="${width/2.2}" ry="100" fill="#7CB342"/><path d="M0 440 Q${width*0.125} 430 ${width*0.25} 440 Q${width*0.375} 450 ${width*0.5} 440 Q${width*0.625} 430 ${width*0.75} 440 Q${width*0.875} 450 ${width} 440" fill="none" stroke="#558B2F" stroke-width="2" opacity="0.8"/><circle cx="${width*0.3}" cy="370" r="20" fill="#2E7D32"/><circle cx="${width*0.5}" cy="350" r="25" fill="#2E7D32"/><circle cx="${width*0.75}" cy="380" r="18" fill="#2E7D32"/></svg>`,
    
    islandParadise: (width = 500) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 640" width="240" height="240"><defs><linearGradient id="skyGreen" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#87CEEB"/><stop offset="100%" stop-color="#2E8B57"/></linearGradient></defs><rect width="${width}" height="640" fill="url(#skyGreen)"/><circle cx="${width*0.85}" cy="80" r="50" fill="#FFD700" opacity="0.9"/><rect x="0" y="420" width="${width}" height="220" fill="#7CFC00" rx="20"/><ellipse cx="${width/2}" cy="470" rx="${width/2.2}" ry="100" fill="#32CD32"/><path d="M0 440 Q${width*0.125} 430 ${width*0.25} 440 Q${width*0.375} 450 ${width*0.5} 440 Q${width*0.625} 430 ${width*0.75} 440 Q${width*0.875} 450 ${width} 440" fill="none" stroke="#228B22" stroke-width="2" opacity="0.9"/><circle cx="${width*0.25}" cy="350" r="25" fill="#00AA44"/><circle cx="${width*0.5}" cy="330" r="30" fill="#00AA44"/><circle cx="${width*0.75}" cy="360" r="22" fill="#00AA44"/><flower><polygon points="${width/2},280 ${width/2+10},295 ${width/2-15},300 ${width/2-5},315 ${width/2-20},310 ${width/2-25},325 ${width/2-35},310 ${width/2-40},325 ${width/2-55},315 ${width/2-45},300 ${width/2-60},295 ${width/2-50},280 ${width/2-65},270 ${width/2-35},270 ${width/2},260 ${width/2+35},270" fill="#FF69B4"/></flower></svg>`,

    // Potenziamenti
    upgradeTree: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><rect x="54" y="78" width="20" height="36" rx="6" fill="#6a4a30"/><ellipse cx="64" cy="48" rx="34" ry="30" fill="#3a9030"/><ellipse cx="38" cy="58" rx="22" ry="20" fill="#2a7020"/><ellipse cx="90" cy="56" rx="20" ry="18" fill="#2a7020"/><ellipse cx="64" cy="40" rx="28" ry="26" fill="#70cc50"/></svg>`,
    
    upgradeSolar: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><circle cx="64" cy="64" r="50" fill="#FFD700"/><g stroke="#FFA500" stroke-width="4" stroke-linecap="round"><line x1="64" y1="20" x2="64" y2="4"/><line x1="64" y1="124" x2="64" y2="108"/><line x1="20" y1="64" x2="4" y2="64"/><line x1="124" y1="64" x2="108" y2="64"/><line x1="30" y1="30" x2="18" y2="18"/><line x1="110" y1="110" x2="98" y2="98"/><line x1="98" y1="30" x2="110" y2="18"/><line x1="18" y1="110" x2="30" y2="98"/></g></svg>`,
    
    upgradeTurbine: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><circle cx="64" cy="64" r="12" fill="#333"/><g fill="#87CEEB"><polygon points="64,0 70,40 58,40"/><polygon points="64,128 70,88 58,88" transform="rotate(180 64 64)"/><polygon points="0,64 40,70 40,58" transform="rotate(270 64 64)"/><polygon points="128,64 88,70 88,58" transform="rotate(90 64 64)"/></g></svg>`,
    
    upgradeRain: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><path d="M64 20 Q50 35 50 50 Q50 75 64 80 Q78 75 78 50 Q78 35 64 20" fill="#A0BFFF" opacity="0.9"/><g stroke="#4169E1" stroke-width="2" stroke-linecap="round"><line x1="45" y1="100" x2="40" y2="120"/><line x1="64" y1="110" x2="60" y2="130"/><line x1="83" y1="100" x2="88" y2="120"/></g></svg>`,
    
    upgradeCompost: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><rect x="35" y="45" width="58" height="50" rx="4" fill="#8B4513" stroke="#654321" stroke-width="2"/><circle cx="50" cy="60" r="6" fill="#A0522D"/><circle cx="78" cy="70" r="5" fill="#A0522D"/><circle cx="64" cy="85" r="7" fill="#A0522D"/><circle cx="55" cy="75" r="4" fill="#8B7355"/><g fill="#2E7D32"><rect x="40" y="30" width="4" height="20"/><circle cx="42" cy="25" r="6"/></g></svg>`,
    
    upgradeFly: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><ellipse cx="64" cy="70" rx="25" ry="15" fill="#0099FF"/><polygon points="64,55 45,65 64,75 83,65" fill="#FFB600"/><g stroke="#333" stroke-width="2" stroke-linecap="round"><line x1="39" y1="65" x2="20" y2="60"/><line x1="89" y1="65" x2="108" y2="60"/></g></svg>`
};

// ========================================
// STATE GLOBALE DEL GIOCO
// ========================================

const gameState = {
    // Punti e statistiche principali
    punti: 0,
    puntiPerClick: 1,
    puntiAlSecondo: 0,
    puntiTotaliAccumulati: 0,
    secondiAlProssimoGuadagnoAuto: 10,
    
    // Survival a Tempo
    survivalTarget: 100,
    survivalTimer: 30,
    islandStage: 1,
    
    // Modalità edit per trascinamento upgrade
    editMode: false,
    upgradePositions: {}, // { 'upgradeId-instance': {x, y} }

    potenziamenti: [
        {
            id: 1,
            nome: "Pianta un Albero",
            costo: 10,
            costoBase: 10,
            quantita: 0,
            produzionePPS: 0.1,
            moltiplicatoreCosto: 1.15,
            emoji: "🌳",
            svgKey: "upgradeTree"
        },
        {
            id: 2,
            nome: "Pannello Solare",
            costo: 100,
            costoBase: 100,
            quantita: 0,
            produzionePPS: 1,
            moltiplicatoreCosto: 1.15,
            emoji: "☀️",
            svgKey: "upgradeSolar"
        },
        {
            id: 3,
            nome: "Turbina Eolica",
            costo: 500,
            costoBase: 500,
            quantita: 0,
            produzionePPS: 5,
            moltiplicatoreCosto: 1.15,
            emoji: "💨",
            svgKey: "upgradeTurbine"
        },
        {
            id: 4,
            nome: "Nuvola di Pioggia",
            costo: 2000,
            costoBase: 2000,
            quantita: 0,
            produzionePPS: 20,
            moltiplicatoreCosto: 1.15,
            emoji: "🌧️",
            svgKey: "upgradeRain"
        },
        {
            id: 5,
            nome: "Compostiera",
            costo: 5000,
            costoBase: 5000,
            quantita: 0,
            produzionePPS: 50,
            moltiplicatoreCosto: 1.15,
            emoji: "♻️",
            svgKey: "upgradeCompost"
        },
        {
            id: 6,
            nome: "Idrovolante Pulitore",
            costo: 15000,
            costoBase: 15000,
            quantita: 0,
            produzionePPS: 150,
            moltiplicatoreCosto: 1.15,
            emoji: "🛩️",
            svgKey: "upgradeFly"
        }
    ]
};

// ========================================
// INIZIALIZZAZIONE
// ========================================

/**
 * Funzione di inizializzazione principale
 * Viene eseguita quando il documento è completamente caricato
 */
function initGame() {
    // Crea i bottoni dei potenziamenti nella UI
    renderUpgrades();

    // Collega gli event listener
    setupEventListeners();

    // Aggiorna la UI iniziale
    updateUI();

    // Imposta lo stage iniziale dell'isola
    updateIslandStage();

    // Avvia il game loop principale (ogni 1 secondo)
    setInterval(gameLoop, 1000);

    console.log("🌱 Eco Island Clicker inizializzato!");
}

// ========================================
// RENDERING UI
// ========================================

/**
 * Renderizza i bottoni dei potenziamenti dinamicamente
 */
function renderUpgrades() {
    const container = document.getElementById("upgradesContainer");
    container.innerHTML = "";

    gameState.potenziamenti.forEach((upgrade) => {
        const card = document.createElement("div");
        card.className = "upgrade-card";
        card.id = `upgrade-${upgrade.id}`;

        // Determina se il potenziamento è acquistabile
        const canAfford = gameState.punti >= upgrade.costo;
        if (!canAfford) {
            card.classList.add("disabled");
        }

        // Usa SVG se disponibile, altrimenti emoji
        const iconHtml = SVG_ASSETS[upgrade.svgKey] 
            ? SVG_ASSETS[upgrade.svgKey]
            : upgrade.emoji;

        card.innerHTML = `
            <span class="upgrade-icon">${iconHtml}</span>
            <div class="upgrade-info">
                <span class="upgrade-name">${upgrade.nome}</span>
                <div class="upgrade-stats">
                    <span class="upgrade-qty">Quantità: <strong>${upgrade.quantita}</strong></span>
                    <span class="upgrade-pps">+${formatNumber(upgrade.produzionePPS)}/s</span>
                </div>
            </div>
            <div class="upgrade-cost">
                <span class="cost-value">${formatNumber(upgrade.costo)}</span>
                <span class="cost-label">Natura</span>
            </div>
        `;

        // Evento click per acquistare potenziamento
        card.addEventListener("click", () => {
            compraPotenziamento(upgrade.id);
        });

        container.appendChild(card);
    });
}

/**
 * Aggiorna tutti gli elementi della UI
 */
function updateUI() {
    // Aggiorna i contatori
    document.getElementById("puntiDisplay").textContent = formatNumber(gameState.punti);
    document.getElementById("ppsDisplay").textContent = formatNumber(gameState.puntiAlSecondo) + "/s";
    document.getElementById("clickValue").textContent = gameState.puntiPerClick;

    // Aggiorna UI Survival
    document.getElementById("survivalTargetDisplay").textContent = formatNumber(gameState.survivalTarget);
    const timerDisplay = document.getElementById("survivalTimerDisplay");
    const timerText = document.getElementById("survivalTimerText");
    timerDisplay.textContent = gameState.survivalTimer;
    
    if (gameState.survivalTimer <= 5) {
        timerText.classList.add("danger");
    } else {
        timerText.classList.remove("danger");
    }

    const irrigaBtn = document.getElementById("irrigaBtn");
    if (gameState.punti >= gameState.survivalTarget) {
        irrigaBtn.disabled = false;
        irrigaBtn.classList.add("ready");
    } else {
        irrigaBtn.disabled = true;
        irrigaBtn.classList.remove("ready");
    }

    // Aggiorna i bottoni dei potenziamenti
    gameState.potenziamenti.forEach((upgrade) => {
        const card = document.getElementById(`upgrade-${upgrade.id}`);
        if (card) {
            const canAfford = gameState.punti >= upgrade.costo;
            if (canAfford) {
                card.classList.remove("disabled");
            } else {
                card.classList.add("disabled");
            }

            // Aggiorna i dati sul card
            card.querySelector(".upgrade-qty").innerHTML =
                `Quantità: <strong>${upgrade.quantita}</strong>`;
            card.querySelector(".cost-value").textContent = formatNumber(upgrade.costo);
            card.querySelector(".upgrade-pps").textContent =
                `+${formatNumber(upgrade.produzionePPS)}/s`;
        }
    });
}

// ========================================
// LOGICA DI GIOCO
// ========================================

/**
 * Gestisce il click manuale sull'isola
 */
function clickIsland() {
    // Aggiungi i punti del click
    gameState.punti += gameState.puntiPerClick;
    gameState.puntiTotaliAccumulati += gameState.puntiPerClick;

    // Effetto visivo: anima il numero che appare
    createClickParticle();

    // Feedback tattile se disponibile
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // Aggiorna lo stage dell'isola in tempo reale
    updateIslandStage();

    // Aggiorna la UI
    updateUI();
}

/**
 * Acquista un potenziamento
 * @param {number} upgradeId - ID del potenziamento da acquistare
 */
function compraPotenziamento(upgradeId) {
    const upgrade = gameState.potenziamenti.find((u) => u.id === upgradeId);

    if (!upgrade) {
        console.warn(`Potenziamento ${upgradeId} non trovato`);
        return;
    }

    // Verifica se il giocatore ha abbastanza punti
    if (gameState.punti < upgrade.costo) {
        // Feedback visivo opzionale: player non ha abbastanza
        console.log(`❌ Non hai abbastanza punti! Mancano ${upgrade.costo - gameState.punti}`);
        if (navigator.vibrate) {
            navigator.vibrate([10, 20, 10]); // Vibrazione diversa per errore
        }
        return;
    }

    // Sottrai il costo
    gameState.punti -= upgrade.costo;

    // Incrementa la quantità
    upgrade.quantita += 1;

    // Ricalcola il costo per il prossimo acquisto
    upgrade.costo = Math.ceil(upgrade.costoBase * Math.pow(upgrade.moltiplicatoreCosto, upgrade.quantita));

    // Ricalcola il totale PPS (Punti Per Secondo)
    ricalcolaPotenziamenti();

    // Feedback tattile
    if (navigator.vibrate) {
        navigator.vibrate([20, 10]);
    }

    // Aggiorna lo stage dell'isola
    updateIslandStage();

    // Aggiorna la UI
    updateUI();
    renderUpgrades();

    console.log(`✅ Acquistato: ${upgrade.nome} (Quantità: ${upgrade.quantita})`);
}

/**
 * Ricalcola il totale di PPS basato su tutti i potenziamenti
 */
function ricalcolaPotenziamenti() {
    gameState.puntiAlSecondo = gameState.potenziamenti.reduce((totale, upgrade) => {
        return totale + upgrade.produzionePPS * upgrade.quantita;
    }, 0);
    
    // Il click vale quanto i punti al secondo (minimo 1)
    gameState.puntiPerClick = Math.max(1, Math.floor(gameState.puntiAlSecondo));
}

// ========================================
// PROGRESSIONE DELL'ISOLA
// ========================================

/**
 * Aggiorna lo stage dell'isola e il gradiente dello sfondo
 * in base ai punti totali accumulati + visualizza gli upgrade acquistati
 */
function updateIslandStage() {
    let svgAssetFunc;
    let nuovaClasse;

    // Determina lo stage basato sulla variabile di survival
    if (gameState.islandStage === 1) {
        svgAssetFunc = SVG_ASSETS.islandSmog;
        nuovaClasse = "stage-1";
    } else if (gameState.islandStage === 2) {
        svgAssetFunc = SVG_ASSETS.islandPartial;
        nuovaClasse = "stage-2";
    } else {
        svgAssetFunc = SVG_ASSETS.islandParadise;
        nuovaClasse = "stage-3";
    }

    // Calcola il numero totale di upgrade acquistati
    const totalUpgrades = gameState.potenziamenti.reduce((sum, u) => sum + u.quantita, 0);
    
    // Calcola la larghezza dell'isola dinamicamente
    // Base 500px + 40px per ogni upgrade
    let islandWidth = 500 + (totalUpgrades * 35);
    
    // Massimo per rimanere responsive (90% della larghezza dello schermo)
    const maxWidth = Math.min(window.innerWidth * 0.9, 1000);
    islandWidth = Math.min(islandWidth, maxWidth);

    // Aggiorna l'SVG dell'isola SENZA gli upgrade (quelli sono overlay draggabili)
    const islandEmoji = document.querySelector(".island-emoji");
    if (islandEmoji && svgAssetFunc) {
        const composedSvg = svgAssetFunc(islandWidth);
        
        if (islandEmoji.innerHTML !== composedSvg) {
            islandEmoji.innerHTML = composedSvg;
            // Effetto fade-in quando cambia lo stage
            islandEmoji.style.opacity = "0.5";
            setTimeout(() => {
                islandEmoji.style.opacity = "1";
            }, 100);
        }
    }

    // Renderizza gli upgrade come overlay draggabili
    renderUpgradeOverlays();

    // Aggiorna la classe del body per il gradiente
    document.body.className = nuovaClasse;
}

/**
 * Renderizza gli upgrade acquistati come overlay HTML draggabili
 * sopra il contenitore dell'isola
 */
function renderUpgradeOverlays() {
    const container = document.querySelector(".island-container");
    if (!container) return;

    // Rimuovi overlay esistenti che non hanno più un upgrade corrispondente
    const existingOverlays = container.querySelectorAll(".upgrade-overlay");
    const neededKeys = new Set();

    gameState.potenziamenti.forEach((upgrade) => {
        for (let i = 0; i < upgrade.quantita; i++) {
            neededKeys.add(`overlay-${upgrade.id}-${i}`);
        }
    });

    existingOverlays.forEach((el) => {
        if (!neededKeys.has(el.id)) {
            el.remove();
        }
    });

    // Crea o aggiorna gli overlay
    gameState.potenziamenti.forEach((upgrade) => {
        if (upgrade.quantita > 0 && SVG_ASSETS[upgrade.svgKey]) {
            for (let i = 0; i < upgrade.quantita; i++) {
                const key = `overlay-${upgrade.id}-${i}`;
                let overlay = document.getElementById(key);

                if (!overlay) {
                    // Crea un nuovo overlay in posizione casuale
                    overlay = document.createElement("div");
                    overlay.id = key;
                    overlay.className = "upgrade-overlay";
                    overlay.innerHTML = SVG_ASSETS[upgrade.svgKey];
                    overlay.title = upgrade.nome;

                    // Posizione casuale se non salvata
                    if (!gameState.upgradePositions[key]) {
                        // Posiziona casualmente nella metà inferiore (zona terreno)
                        const randX = 10 + Math.random() * 80; // 10%-90% da sinistra
                        const randY = 50 + Math.random() * 35;  // 50%-85% dall'alto (zona terreno)
                        gameState.upgradePositions[key] = { x: randX, y: randY };
                    }

                    const pos = gameState.upgradePositions[key];
                    overlay.style.left = pos.x + "%";
                    overlay.style.top = pos.y + "%";

                    container.appendChild(overlay);

                    // Aggiungi drag handlers
                    setupDragForOverlay(overlay, key);

                    // Animazione di entrata
                    overlay.style.opacity = "0";
                    overlay.style.transform = "scale(0.3)";
                    requestAnimationFrame(() => {
                        overlay.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                        overlay.style.opacity = "1";
                        overlay.style.transform = "scale(1)";
                        setTimeout(() => {
                            overlay.style.transition = "";
                        }, 300);
                    });
                }
            }
        }
    });
}

/**
 * Configura il drag & drop (mouse + touch) per un overlay di upgrade
 * @param {HTMLElement} overlay - L'elemento overlay da rendere draggabile
 * @param {string} key - La chiave di posizione in gameState.upgradePositions
 */
function setupDragForOverlay(overlay, key) {
    let isDragging = false;
    let hasMoved = false;
    let startX, startY;
    let overlayStartLeft, overlayStartTop;

    function onPointerDown(e) {
        // Previeni il click sull'isola durante il drag
        e.stopPropagation();
        isDragging = true;
        hasMoved = false;

        const touch = e.touches ? e.touches[0] : e;
        startX = touch.clientX;
        startY = touch.clientY;

        const container = overlay.parentElement;
        const containerRect = container.getBoundingClientRect();
        // Calcola la posizione attuale in pixel
        overlayStartLeft = overlay.offsetLeft;
        overlayStartTop = overlay.offsetTop;

        overlay.style.zIndex = "15";
        overlay.style.cursor = "grabbing";
        overlay.style.transition = "none";
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        e.stopPropagation();

        const touch = e.touches ? e.touches[0] : e;
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;

        // Soglia minima per considerarlo un drag (evita click accidentali)
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            hasMoved = true;
        }

        const container = overlay.parentElement;
        const containerRect = container.getBoundingClientRect();

        // Calcola la nuova posizione in percentuale
        let newLeft = overlayStartLeft + dx;
        let newTop = overlayStartTop + dy;

        // Limita ai bordi del contenitore
        const maxLeft = containerRect.width - overlay.offsetWidth;
        const maxTop = containerRect.height - overlay.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));

        overlay.style.left = newLeft + "px";
        overlay.style.top = newTop + "px";
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        overlay.style.zIndex = "";
        overlay.style.cursor = "grab";

        if (hasMoved) {
            // Previeni il click sull'isola
            e.stopPropagation();
            if (e.cancelable) e.preventDefault();

            // Salva la posizione in percentuale
            const container = overlay.parentElement;
            const containerRect = container.getBoundingClientRect();
            const pctX = (overlay.offsetLeft / containerRect.width) * 100;
            const pctY = (overlay.offsetTop / containerRect.height) * 100;
            gameState.upgradePositions[key] = { x: pctX, y: pctY };

            // Aggiorna lo stile in percentuale per responsività
            overlay.style.left = pctX + "%";
            overlay.style.top = pctY + "%";
        }
    }

    // Mouse events
    overlay.addEventListener("mousedown", onPointerDown);
    document.addEventListener("mousemove", onPointerMove);
    document.addEventListener("mouseup", onPointerUp);

    // Touch events
    overlay.addEventListener("touchstart", onPointerDown, { passive: false });
    document.addEventListener("touchmove", onPointerMove, { passive: false });
    document.addEventListener("touchend", onPointerUp);

    // Previeni il click sull'isola quando si fa drag
    overlay.addEventListener("click", (e) => {
        e.stopPropagation();
    });
}

// ========================================
// GAME LOOP
// ========================================

/**
 * Funzione del game loop principale
 * Viene eseguita ogni 1 secondo
 */
function gameLoop() {
    // Aggiungi i punti passivi (da potenziamenti)
    if (gameState.puntiAlSecondo > 0) {
        gameState.punti += gameState.puntiAlSecondo;
        gameState.puntiTotaliAccumulati += gameState.puntiAlSecondo;
    }

    // Gestione Survival Timer
    gameState.survivalTimer--;

    if (gameState.survivalTimer <= 0) {
        if (gameState.islandStage === 1) {
            // GAME OVER - Reset totale
            console.log("☠️ Game Over! Il loop ricomincia.");
            gameState.punti = 0;
            gameState.puntiTotaliAccumulati = 0;
            gameState.survivalTarget = 100;
            gameState.survivalTimer = 30;
            
            // Hard Reset degli upgrade
            gameState.potenziamenti.forEach(u => {
                u.quantita = 0;
                u.costo = u.costoBase;
            });
            gameState.upgradePositions = {}; // Rimuove le posizioni salvate
            ricalcolaPotenziamenti();
            
        } else {
            // REGRESSIONE
            console.log("⚠️ Regressione! Il tempo è scaduto.");
            gameState.islandStage -= 1;
            gameState.survivalTarget = Math.max(100, gameState.survivalTarget - 150);
            gameState.survivalTimer = 30;
        }
        
        if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
        updateIslandStage();
    }

    // Decrementa il timer per il guadagno automatico
    gameState.secondiAlProssimoGuadagnoAuto--;

    // Se il timer raggiunge 0, guadagna 1 punto automatico (bonus: click base + livello irrigazione)
    if (gameState.secondiAlProssimoGuadagnoAuto <= 0) {
        const autoGain = gameState.puntiPerClick + (gameState.islandStage - 1);
        gameState.punti += autoGain;
        gameState.puntiTotaliAccumulati += autoGain;
        gameState.secondiAlProssimoGuadagnoAuto = 10; // Reset del timer
        
        // Effetto visivo: crea particella per il guadagno automatico
        createAutoGainParticle(autoGain);
        
        console.log(`💚 Guadagno automatico +${autoGain}!`);
    }

    // Aggiorna il display del timer passivo
    const timerDisplay = document.getElementById("timerDisplay");
    if (timerDisplay) {
        timerDisplay.textContent = gameState.secondiAlProssimoGuadagnoAuto;
    }

    // Aggiorna la UI
    updateUI();

    // L'aggiornamento stage dell'isola lo facciamo solo agli eventi importanti,
    // o qui se cambia la larghezza (che dipende dagli upgrade).
    updateIslandStage();
}

/**
 * Funzione per irrigare e passare al prossimo traguardo
 */
function irriga() {
    if (gameState.punti >= gameState.survivalTarget) {
        // Scala visivamente fino allo stadio 3 (paradiso), ma internamente puoi proseguire
        gameState.islandStage = Math.min(3, gameState.islandStage + 1);
        gameState.survivalTarget += 150;
        gameState.survivalTimer = 30;
        
        console.log(`🌊 Irrigazione completata! Nuovo target: ${gameState.survivalTarget}`);
        
        if (navigator.vibrate) navigator.vibrate(30);
        
        updateIslandStage();
        updateUI();
    }
}

// ========================================
// EFFETTI VISIVI
// ========================================

/**
 * Crea una particella di numero che fluttua verso l'alto
 * quando il giocatore clicca l'isola
 */
function createClickParticle() {
    const container = document.getElementById("particlesContainer");
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = `+${gameState.puntiPerClick}`;

    // Posizione casuale attorno al centro dell'isola
    const islandBtn = document.getElementById("islandBtn");
    const rect = islandBtn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Offset casuale
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = -60 - Math.random() * 40;

    particle.style.left = startX + "px";
    particle.style.top = startY + "px";
    particle.style.setProperty("--tx", offsetX + "px");
    particle.style.setProperty("--ty", offsetY + "px");

    container.appendChild(particle);

    // Rimuovi la particella dopo l'animazione
    setTimeout(() => {
        particle.remove();
    }, 600);
}

/**
 * Crea una particella per il guadagno automatico ogni 10 secondi
 * @param {number} amount - Quantità guadagnata
 */
function createAutoGainParticle(amount) {
    const container = document.getElementById("particlesContainer");
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.textContent = `💚+${formatNumber(amount)}`;
    particle.style.fontSize = "18px";

    // Posizione dal centro dell'isola
    const islandBtn = document.getElementById("islandBtn");
    const rect = islandBtn.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Offset casuale
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = -80 - Math.random() * 50;

    particle.style.left = startX + "px";
    particle.style.top = startY + "px";
    particle.style.setProperty("--tx", offsetX + "px");
    particle.style.setProperty("--ty", offsetY + "px");

    container.appendChild(particle);

    // Rimuovi la particella dopo l'animazione
    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// ========================================
// UTILITY
// ========================================

/**
 * Formatta un numero con suffissi (K, M, B, T, ecc.)
 * @param {number} num - Numero da formattare
 * @returns {string} Numero formattato
 */
function formatNumber(num) {
    if (num < 1000) {
        return Math.floor(num).toString();
    }

    const suffissi = ["", "K", "M", "B", "T", "Quad"];
    const ordine = Math.floor(Math.log10(Math.abs(num)) / 3);
    const divisore = Math.pow(10, ordine * 3);
    const valore = num / divisore;

    // Determina il numero di decimali
    let decimali = 2;
    if (valore >= 100) decimali = 1;
    if (valore >= 1000) decimali = 0;

    return valore.toFixed(decimali).replace(/\.?0+$/, "") + (suffissi[ordine] || "");
}

// ========================================
// EVENT LISTENERS
// ========================================

/**
 * Collega gli event listener principali
 */
function setupEventListeners() {
    // Click sull'isola
    const islandBtn = document.getElementById("islandBtn");
    islandBtn.addEventListener("click", clickIsland);

    // Click su Irriga
    const irrigaBtn = document.getElementById("irrigaBtn");
    if (irrigaBtn) {
        irrigaBtn.addEventListener("click", irriga);
    }

    // Previeni zoom accidentale su double tap
    document.addEventListener("touchend", (e) => {
        if (e.touches.length === 0) {
            // Feedback tattile
            if (navigator.vibrate) {
                navigator.vibrate(5);
            }
        }
    });

    // Impedisci il scrolling accidentale
    document.addEventListener("touchmove", (e) => {
        if (e.target.closest(".island-btn")) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ========================================
// AVVIO
// ========================================

// Attendi il caricamento completo del DOM
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGame);
} else {
    // Il DOM è già caricato
    initGame();
}

// Log di debug (rimuovere in produzione se desiderato)
console.log("%c🌍 Eco Island Clicker v1.0", "font-size: 16px; color: #34d399; font-weight: bold;");
console.log("%cStack: HTML/CSS/JS Puro + Capacitor", "color: #60a5fa;");