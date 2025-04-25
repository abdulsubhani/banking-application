// Format currency in Indian Rupees
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};

// Format date
const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

class BankingApp {
    constructor() {
        this.state = {
            user: null,
            balance: 0,
            transactions: []
        };

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Containers
        this.loginContainer = document.getElementById('login-container');
        this.dashboardContainer = document.getElementById('dashboard-container');

        // Forms
        this.loginForm = document.getElementById('login-form');
        this.transactionForm = document.getElementById('transaction-form');

        // Buttons
        this.logoutBtn = document.getElementById('logout-btn');
        this.depositBtn = document.getElementById('deposit-btn');
        this.withdrawBtn = document.getElementById('withdraw-btn');

        // Display elements
        this.userNameDisplay = document.getElementById('user-name');
        this.accountNumberDisplay = document.getElementById('account-number');
        this.balanceDisplay = document.getElementById('balance');
        this.messageDisplay = document.getElementById('message');
        this.transactionHistory = document.getElementById('transaction-history');

        this.currentTransactionType = 'deposit';
    }

    attachEventListeners() {
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        this.transactionForm.addEventListener('submit', (e) => this.handleTransaction(e));
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        this.depositBtn.addEventListener('click', () => this.setTransactionType('deposit'));
        this.withdrawBtn.addEventListener('click', () => this.setTransactionType('withdrawal'));
    }

    handleLogin(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const accountNumber = document.getElementById('account').value;

        if (accountNumber.length !== 10 || !/^\d+$/.test(accountNumber)) {
            this.showMessage('Please enter a valid 10-digit account number', 'error');
            return;
        }

        this.state.user = { name, accountNumber };
        this.updateUI();
        this.loginContainer.classList.add('hidden');
        this.dashboardContainer.classList.remove('hidden');
    }

    handleLogout() {
        this.state = {
            user: null,
            balance: 0,
            transactions: []
        };
        this.loginForm.reset();
        this.transactionForm.reset();
        this.dashboardContainer.classList.add('hidden');
        this.loginContainer.classList.remove('hidden');
    }

    setTransactionType(type) {
        this.currentTransactionType = type;
        this.depositBtn.classList.toggle('active', type === 'deposit');
        this.withdrawBtn.classList.toggle('active', type === 'withdrawal');
    }

    handleTransaction(e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);

        if (amount <= 0) {
            this.showMessage('Please enter a valid amount', 'error');
            return;
        }

        if (this.currentTransactionType === 'withdrawal' && amount > this.state.balance) {
            this.showMessage('Insufficient balance', 'error');
            return;
        }

        const transaction = {
            id: Date.now(),
            type: this.currentTransactionType,
            amount: amount,
            timestamp: new Date(),
            balance: this.currentTransactionType === 'deposit' 
                ? this.state.balance + amount 
                : this.state.balance - amount
        };

        this.state.balance = transaction.balance;
        this.state.transactions.unshift(transaction);
        this.updateUI();
        this.transactionForm.reset();
        this.showMessage(
            `${this.currentTransactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} successful!`,
            'success'
        );
    }

    showMessage(text, type) {
        this.messageDisplay.textContent = text;
        this.messageDisplay.className = `message ${type}`;
        setTimeout(() => {
            this.messageDisplay.textContent = '';
            this.messageDisplay.className = 'message';
        }, 3000);
    }

    updateUI() {
        if (this.state.user) {
            this.userNameDisplay.textContent = this.state.user.name;
            this.accountNumberDisplay.textContent = this.state.user.accountNumber;
            this.balanceDisplay.textContent = formatCurrency(this.state.balance);
            this.updateTransactionHistory();
        }
    }

    updateTransactionHistory() {
        if (this.state.transactions.length === 0) {
            this.transactionHistory.innerHTML = '<div class="empty-state">No transactions yet</div>';
            return;
        }

        this.transactionHistory.innerHTML = this.state.transactions
            .map(transaction => `
                <div class="transaction-item">
                    <div class="type ${transaction.type}">
                        ${transaction.type === 'deposit' ? '↓' : '↑'}
                        ${transaction.type}
                        <span class="date">${formatDate(transaction.timestamp)}</span>
                    </div>
                    <div class="amount ${transaction.type}">
                        ${transaction.type === 'deposit' ? '+' : '-'}${formatCurrency(transaction.amount)}
                    </div>
                </div>
            `)
            .join('');
    }
}

// Initialize the app
const app = new BankingApp();