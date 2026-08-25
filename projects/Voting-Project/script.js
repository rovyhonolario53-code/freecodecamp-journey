const poll = new Map();

function addOption(option) {
    if (!option || option === "") {
        return `Option cannot be empty.`
    }
    if (poll.has(option)) {
        return `Option "${option}" already exists.`
    } else {
        poll.set(option, new Set());
        return `Option "${option}" added to the poll.`
    }
}

function vote(option, voterId) {
    if (!poll.has(option)) {
        return `Option "${option}" does not exist.`
    }
    if (poll.has(option)) {
        const check = poll.get(option)
        if (check.has(voterId)) {
            return `Voter ${voterId} has already voted for "${option}".`
        } else {
            check.add(voterId);
            return `Voter ${voterId} voted for "${option}".`
        }
    }
}

function displayResults() {
    let string = `Poll Results:\n`
    for (const [option, votersSet] of poll) {
        string += `${option}: ${votersSet.size} votes\n`
    }
    return string.trimEnd();
}

// Initialize with sample options
addOption("Sara");
addOption("Leni");
addOption("Risa");

// DOM Elements
const addOptionForm = document.getElementById("addOptionForm");
const optionInput = document.getElementById("optionInput");
const addOptionMessage = document.getElementById("addOptionMessage");
const voteForm = document.getElementById("voteForm");
const voteOption = document.getElementById("voteOption");
const voterId = document.getElementById("voterId");
const voteMessage = document.getElementById("voteMessage");
const optionsList = document.getElementById("optionsList");
const resultsList = document.getElementById("resultsList");

// Update UI on page load
updateAllUI();

// Event Listeners
addOptionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const option = optionInput.value.trim();
    const message = addOption(option);
    
    displayMessage(addOptionMessage, message);
    optionInput.value = "";
    updateAllUI();
});

voteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const option = voteOption.value;
    const voterID = voterId.value.trim();
    const message = vote(option, voterID);
    
    displayMessage(voteMessage, message);
    voterId.value = "";
    updateAllUI();
});

// Helper Functions
function displayMessage(element, message) {
    element.textContent = message;
    
    if (message.includes("added") || message.includes("voted")) {
        element.className = "message success";
    } else {
        element.className = "message error";
    }
    
    setTimeout(() => {
        element.textContent = "";
        element.className = "message";
    }, 4000);
}

function updateAllUI() {
    updateOptionsList();
    updateVoteDropdown();
    updateResults();
}

function updateOptionsList() {
    optionsList.innerHTML = "";
    
    if (poll.size === 0) {
        optionsList.innerHTML = '<p class="empty-state">No options added yet</p>';
    } else {
        for (const option of poll.keys()) {
            const div = document.createElement("div");
            div.className = "option-item";
            div.textContent = option;
            optionsList.appendChild(div);
        }
    }
}

function updateVoteDropdown() {
    const currentValue = voteOption.value;
    voteOption.innerHTML = '<option value="">-- Choose an option --</option>';
    
    for (const option of poll.keys()) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        voteOption.appendChild(optionElement);
    }
    
    voteOption.value = currentValue;
}

function updateResults() {
    resultsList.innerHTML = "";
    
    if (poll.size === 0) {
        resultsList.innerHTML = '<p class="empty-state">No votes yet</p>';
        return;
    }
    
    // Calculate total votes for percentage
    let totalVotes = 0;
    for (const votersSet of poll.values()) {
        totalVotes += votersSet.size;
    }
    
    // Display results
    for (const [option, votersSet] of poll) {
        const voteCount = votersSet.size;
        const percentage = totalVotes === 0 ? 0 : Math.round((voteCount / totalVotes) * 100);
        
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerHTML = `
            <div class="result-option">${option}</div>
            <div class="result-votes">
                <div class="vote-bar">
                    <div class="vote-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="vote-count">${voteCount}</span>
            </div>
        `;
        resultsList.appendChild(div);
    }
}