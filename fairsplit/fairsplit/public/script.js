// Register service worker for offline support (PWA) - Lasciato per compatibilità web
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('ServiceWorker registered', reg.scope))
            .catch(err => console.warn('ServiceWorker registration failed', err));
    });
}

// Stato dell'applicazione locale (si resetta ogni volta che l'app viene chiusa)
let users = [];
let expenses = [];

// Esegui un primo aggiornamento svuotando la UI all'avvio
window.addEventListener('DOMContentLoaded', () => {
    updateUI();
});

// Funzione centrale per aggiornare l'interfaccia grafica
function updateUI() {
    renderUsers();
    renderExpenseForm();
    renderExpenses();
    
    // Calcola i saldi localmente senza chiedere al server
    const balances = calculateBalancesLocal();
    renderBalances(balances);
}

function renderUsers() {
    const userList = document.getElementById('userList');
    if (!userList) return;
    userList.innerHTML = users.map(user => `
        <div class="chip">
            <span class="chip-name">${user}</span>
            <button class="chip-delete" onclick="deleteUser('${user}')">&times;</button>
        </div>
    `).join('');
}

function renderExpenseForm() {
    const paidBySelect = document.getElementById('expPaidBy');
    const splitBetweenDiv = document.getElementById('expSplitBetween');

    if (paidBySelect) {
        paidBySelect.innerHTML = users.map(user => `
            <option value="${user}">${user}</option>
        `).join('');
    }

    if (splitBetweenDiv) {
        splitBetweenDiv.innerHTML = users.map(user => `
            <label class="checkbox-item">
                <input type="checkbox" value="${user}" checked> ${user}
            </label>
        `).join('');
    }
}

function renderExpenses() {
    const expenseList = document.getElementById('expenseList');
    if (!expenseList) return;
    expenseList.innerHTML = expenses.map(exp => {
        const payers = Array.isArray(exp.paidBy) ? exp.paidBy.join(', ') : exp.paidBy;
        return `
        <div class="expense-item">
            <div class="expense-info">
                <span class="desc">${exp.description}</span>
                <span class="details">Pagato da ${payers} | Diviso tra: ${exp.splitBetween.join(', ')}</span>
            </div>
            <div style="display: flex; align-items: center;">
                <span class="expense-amount">€${parseFloat(exp.amount).toFixed(2)}</span>
                <button class="btn-delete" onclick="deleteExpense(${exp.id})">Elimina</button>
            </div>
        </div>
    `;
    }).join('');
}

function renderBalances(balances) {
    const balancesDiv = document.getElementById('balances');
    const debtsDiv = document.getElementById('debts');

    if (!balancesDiv || !debtsDiv) return;

    if (!balances) {
        balancesDiv.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Nessun dato</p>';
        debtsDiv.innerHTML = '<p style="text-align:center; color: var(--text-muted);">Nessun dato</p>';
        return;
    }

    const debts = balances.debts || [];
    let balancesHtml = '';

    for (const user in balances) {
        if (user === 'debts') continue;
        const amount = parseFloat(balances[user]);
        const className = amount > 0.01 ? 'positive' : amount < -0.01 ? 'negative' : 'neutral';
        const displayAmount = Math.abs(amount).toFixed(2);
        const status = amount > 0.01 ? 'da ricevere' : amount < -0.01 ? 'da pagare' : 'in pari';
        
        balancesHtml += `
            <div class="balance-row">
                <span>${user}</span>
                <span class="${className}">${displayAmount} € <em>(${status})</em></span>
            </div>
        `;
    }
    balancesDiv.innerHTML = balancesHtml || '<p style="text-align:center; color: var(--text-muted);">Nessun saldo</p>';

    if (debts.length === 0) {
        debtsDiv.innerHTML = '<p style="text-align:center; color: var(--success); font-weight: bold;">✨ Tutti sono in pari! ✨</p>';
    } else {
        debtsDiv.innerHTML = debts.map(debt => `
            <div class="debt-row">
                <strong>${debt.from}</strong> deve pagare <strong>€${parseFloat(debt.amount).toFixed(2)}</strong> a <strong>${debt.to}</strong>
            </div>
        `).join('');
    }
}

// LOGICA DEI BOTTONI MODIFICATA: AGGIUNGE DIRETTAMENTE IN LOCALE
function addUser() {
    const input = document.getElementById('userName');
    if (!input) return;
    const name = input.value.trim();
    if (!name) {
        alert('Per favore, inserisci il nome');
        return;
    }
    if (users.includes(name)) {
        alert('Questo nome è già presente');
        input.value = '';
        return;
    }
    
    // Aggiunge all'array locale e aggiorna la UI
    users.push(name);
    input.value = '';
    updateUI();
}

function addExpense() {
    const description = document.getElementById('expDesc').value.trim();
    const amount = document.getElementById('expAmount').value;
    const paidBySelect = document.getElementById('expPaidBy');
    const paidBy = paidBySelect ? Array.from(paidBySelect.selectedOptions).map(opt => opt.value) : [];
    const splitBetween = Array.from(document.querySelectorAll('#expSplitBetween input:checked')).map(cb => cb.value);

    if (!description) {
        alert('Per favore, inserisci una descrizione');
        return;
    }
    if (!amount || parseFloat(amount) <= 0) {
        alert('Per favore, inserisci un importo valido');
        return;
    }
    if (!paidBy.length) {
        alert('Per favore, seleziona almeno una persona che ha pagato');
        return;
    }
    if (splitBetween.length === 0) {
        alert('Per favore, seleziona almeno una persona per la divisione');
        return;
    }

    // Crea la nuova spesa localmente
    const newExpense = {
        id: Date.now(), // ID univoco temporaneo basato sul timestamp
        description,
        amount: parseFloat(amount).toFixed(2),
        paidBy,
        splitBetween
    };

    expenses.push(newExpense);

    document.getElementById('expDesc').value = '';
    document.getElementById('expAmount').value = '';
    if (paidBySelect) paidBySelect.selectedIndex = -1;
    
    updateUI();
}

function deleteExpense(id) {
    if (confirm('Vuoi eliminare questa spesa?')) {
        expenses = expenses.filter(exp => exp.id !== id);
        updateUI();
    }
}

function deleteUser(name) {
    if (!name) return;
    if (!confirm(`Eliminare la persona "${name}"? Questa azione rimuoverà o aggiornerà le spese correlate.`)) return;
    
    // Rimuove l'utente
    users = users.filter(user => user !== name);
    // Filtra le spese per rimuovere quelle in cui l'utente partecipava
    expenses = expenses.filter(exp => !exp.paidBy.includes(name) && !exp.splitBetween.includes(name));
    
    updateUI();
}

// FUNZIONE DI CALCOLO INTERNO (Sostituisce il calcolo del server)
function calculateBalancesLocal() {
    let balances = {};
    
    // Inizializza i saldi a 0 per tutti gli utenti attuali
    users.forEach(user => {
        balances[user] = 0;
    });

    // Calcola dare/avere in base alle spese inserite
    expenses.forEach(exp => {
        const amount = parseFloat(exp.amount);
        
        // Chi ha pagato (supponiamo singolo pagatore, se multipli dividiamo il pagamento)
        const payerShare = amount / exp.paidBy.length;
        exp.paidBy.forEach(payer => {
            if (balances[payer] !== undefined) balances[payer] += payerShare;
        });

        // Chi deve pagare la sua parte
        const splitShare = amount / exp.splitBetween.length;
        exp.splitBetween.forEach(participant => {
            if (balances[participant] !== undefined) balances[participant] -= splitShare;
        });
    });

    // Genera la lista dei debiti incrociati (chi deve dare a chi)
    let graduates = []; // Chi deve ricevere (saldo positivo)
    let debtors = [];   // Chi deve dare (saldo negativo)

    for (const user in balances) {
        if (balances[user] > 0.01) {
            graduates.push({ name: user, amount: balances[user] });
        } else if (balances[user] < -0.01) {
            debtors.push({ name: user, amount: Math.abs(balances[user]) });
        }
    }

    let debts = [];
    let i = 0, j = 0;

    // Algoritmo di risanamento debiti semplice
    while (i < debtors.length && j < graduates.length) {
        let debtor = debtors[i];
        let graduate = graduates[j];
        let minAmount = Math.min(debtor.amount, graduate.amount);

        debts.push({
            from: debtor.name,
            to: graduate.name,
            amount: minAmount
        });

        debtor.amount -= minAmount;
        graduate.amount -= minAmount;

        if (debtor.amount <= 0.01) i++;
        if (graduate.amount <= 0.01) j++;
    }

    balances.debts = debts;
    return balances;
}