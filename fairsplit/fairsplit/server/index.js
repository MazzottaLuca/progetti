const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const store = require('./store');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, '../public')));

function calculateBalances() {
    const { users, expenses } = store.getData();
    const balances = {};

    users.forEach(user => balances[user] = 0);

    expenses.forEach(exp => {
        const amount = parseFloat(exp.amount);
        const paidByList = Array.isArray(exp.paidBy) ? exp.paidBy : [exp.paidBy];
        const splitBetween = exp.splitBetween || [];

        const payerCount = paidByList.length;
        if (payerCount === 0) return;

        const creditShare = amount / payerCount;
        paidByList.forEach(user => {
            if (balances.hasOwnProperty(user)) {
                balances[user] += creditShare;
            }
        });

        const share = splitBetween.length > 0 ? amount / splitBetween.length : 0;
        splitBetween.forEach(user => {
            if (balances.hasOwnProperty(user)) {
                balances[user] -= share;
            }
        });
    });

    // Simplify debts
    const debts = [];
    const debtors = [];
    const creditors = [];

    for (const user in balances) {
        if (balances[user] < -0.01) {
            debtors.push({ user, amount: Math.abs(balances[user]) });
        } else if (balances[user] > 0.01) {
            creditors.push({ user, amount: balances[user] });
        }
    }

    let dIdx = 0;
    let cIdx = 0;

    while (dIdx < debtors.length && cIdx < creditors.length) {
        const debtor = debtors[dIdx];
        const creditor = creditors[cIdx];
        const amount = Math.min(debtor.amount, creditor.amount);

        debts.push({
            from: debtor.user,
            to: creditor.user,
            amount: amount.toFixed(2)
        });

        debtor.amount -= amount;
        creditor.amount -= amount;

        if (debtor.amount <= 0.01) dIdx++;
        if (creditor.amount <= 0.01) cIdx++;
    }

    return {
        balances,
        debts
    };
}

io.on('connection', (socket) => {
    console.log('A user connected');

    // Send initial data
    const { balances, debts } = calculateBalances();
    socket.emit('init', {
        ...store.getData(),
        balances: { ...balances, debts }
    });

    socket.on('addUser', (name) => {
        if (!name || name.trim().length === 0) {
            socket.emit('error', 'Nome non valido');
            return;
        }
        const users = store.addUser(name);
        io.emit('updateUsers', users);
        io.emit('updateData', {
            expenses: store.getData().expenses,
            balances: calculateBalances().balances
        });
    });

    socket.on('deleteUser', (name) => {
        if (!name) return;
        const users = store.deleteUser(name);
        const { balances, debts } = calculateBalances();
        io.emit('updateUsers', users);
        io.emit('updateData', {
            expenses: store.getData().expenses,
            balances: { ...balances, debts }
        });
    });

    socket.on('addExpense', (expense) => {
        if (!expense.description || !expense.amount || !expense.paidBy || expense.paidBy.length === 0 || !expense.splitBetween || expense.splitBetween.length === 0) {
            socket.emit('error', 'Campi obbligatori mancanti');
            return;
        }
        const expenses = store.addExpense(expense);
        const { balances, debts } = calculateBalances();
        io.emit('updateData', {
            expenses,
            balances: { ...balances, debts }
        });
    });

    socket.on('deleteExpense', (id) => {
        const expenses = store.deleteExpense(id);
        const { balances, debts } = calculateBalances();
        io.emit('updateData', {
            expenses,
            balances: { ...balances, debts }
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`\n`);
    console.log(`╔════════════════════════════════════════╗`);
    console.log(`║   FairSplit - Divisione Spese       ║`);
    console.log(`║   Server running on http://localhost:${PORT}        ║`);
    console.log(`╚════════════════════════════════════════╝`);
    console.log(`\n`);
});