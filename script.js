class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }
    deposit(amount) {
        if (amount > 0) {
            this.transactions.push({
                type: "deposit",
                amount: amount
            });
            this.balance += Number(amount);
            return `Successfully deposited $${amount}. New balance: $${this.balance}`;
        }
        else {
            return "Deposit amount must be greater than zero.";
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.transactions.push({
                type: "withdraw",
                amount: amount
            });
            this.balance -= Number(amount);
            return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
        }
        else if (amount <= 0 || amount > this.balance) {
            return "Insufficient balance or invalid amount.";
        }
    }

    checkBalance() {
        return `Current balance: $${this.balance}`
    }

    listAllDeposits() {
        const deposits = this.transactions.filter(transaction => transaction.type === "deposit")
        const mapped = deposits.map(deposit => deposit.amount).join(",");
        return `Deposits: ${mapped}`
    }

    listAllWithdrawals() {
        const withdrawals = this.transactions.filter(transaction => transaction.type === "withdraw")
        const mapped = withdrawals.map(withdrawal => withdrawal.amount).join(",");
        return `Withdrawals: ${mapped}`
    }
}


const myAccount = new BankAccount()

myAccount.deposit("100");
myAccount.deposit("100");
myAccount.deposit("200");

myAccount.withdraw("100");
myAccount.withdraw("100");

const balanceValue = document.querySelector("[data-balance]");
const depositsValue = document.querySelector("[data-deposits]");
const withdrawalsValue = document.querySelector("[data-withdrawals]");
const depositCount = document.querySelector("[data-deposit-count]");
const withdrawalCount = document.querySelector("[data-withdrawal-count]");
const activityList = document.querySelector("[data-activity]");
const feedback = document.querySelector("[data-feedback]");
const transactionForm = document.querySelector("[data-transaction-form]");

function formatCurrency(amount) {
    return `$${Number(amount).toFixed(2)}`;
}

function renderAccount() {
    const deposits = myAccount.transactions.filter(transaction => transaction.type === "deposit");
    const withdrawals = myAccount.transactions.filter(transaction => transaction.type === "withdraw");

    balanceValue.textContent = Number(myAccount.balance).toFixed(2);
    depositsValue.textContent = formatCurrency(deposits.reduce((total, transaction) => total + Number(transaction.amount), 0));
    withdrawalsValue.textContent = formatCurrency(withdrawals.reduce((total, transaction) => total + Number(transaction.amount), 0));
    depositCount.textContent = `${deposits.length} deposit${deposits.length === 1 ? "" : "s"} this period`;
    withdrawalCount.textContent = `${withdrawals.length} withdrawal${withdrawals.length === 1 ? "" : "s"} this period`;
    activityList.innerHTML = myAccount.transactions.slice().reverse().map(transaction => {
        const isDeposit = transaction.type === "deposit";
        return `<div class="transaction"><span class="transaction-description"><span class="transaction-icon ${isDeposit ? "deposit" : "withdrawal"}">${isDeposit ? "+" : "−"}</span><span><strong>${isDeposit ? "Deposit" : "Withdrawal"}</strong><small>Everyday account</small></span></span><span class="transaction-date">Today</span><strong class="amount ${isDeposit ? "deposit-text" : "withdrawal-text"}">${isDeposit ? "+" : "−"}${formatCurrency(transaction.amount)}</strong></div>`;
    }).join("");
}

transactionForm.addEventListener("submit", event => {
    event.preventDefault();
    const formData = new FormData(transactionForm);
    const amount = formData.get("amount");
    const action = formData.get("action");
    const result = action === "deposit" ? myAccount.deposit(amount) : myAccount.withdraw(amount);

    feedback.textContent = result;
    feedback.className = result.startsWith("Successfully") ? "feedback success" : "feedback error";
    if (result.startsWith("Successfully")) {
        transactionForm.reset();
        renderAccount();
    }
});

renderAccount();

