const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data.json');

class Store {
    constructor() {
        this.data = this.load();
    }

    load() {
        try {
            if (fs.existsSync(DATA_FILE)) {
                const content = fs.readFileSync(DATA_FILE, 'utf8');
                return JSON.parse(content);
            }
        } catch (error) {
            console.error('Error loading data file:', error);
        }
        return {
            users: [],
            expenses: []
        };
    }

    save() {
        try {
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2));
        } catch (error) {
            console.error('Error saving data file:', error);
        }
    }

    addUser(name) {
        if (!this.data.users.includes(name)) {
            this.data.users.push(name);
            this.save();
        }
        return this.data.users;
    }

    addExpense(expense) {
        // expense: { description, amount, paidBy, splitBetween: [] }
        this.data.expenses.push({
            id: Date.now(),
            ...expense
        });
        this.save();
        return this.data.expenses;
    }

    deleteExpense(id) {
        this.data.expenses = this.data.expenses.filter(e => e.id !== id);
        this.save();
        return this.data.expenses;
    }

    deleteUser(name) {
        // Remove user from users list
        this.data.users = this.data.users.filter(u => u !== name);

        // Remove user from expenses splitBetween; handle multiple payers
        this.data.expenses = this.data.expenses.map(exp => {
            exp.splitBetween = (exp.splitBetween || []).filter(u => u !== name);
            if (Array.isArray(exp.paidBy)) {
                exp.paidBy = exp.paidBy.filter(u => u !== name);
            }
            return exp;
        }).filter(exp => {
            const paidByList = Array.isArray(exp.paidBy) ? exp.paidBy : [exp.paidBy];
            const validPayers = paidByList.filter(u => u !== undefined && u !== null && u !== '');
            if (validPayers.length === 0) {
                return false;
            }
            exp.paidBy = validPayers.length === 1 ? validPayers[0] : validPayers;
            return true;
        });

        this.save();
        return this.data.users;
    }

    getData() {
        return this.data;
    }
}

module.exports = new Store();