function initQueue() {
    return {
        collection: []
    };
}

function print(queue) {
    console.log(queue.collection);
}

function enqueue(queue, element) {
    return queue.collection.push(element);
}

function dequeue(queue) {
    return queue.collection.shift();
}

function front(queue) {
    return queue.collection[0];
}

function size(queue) {
    return queue.collection.length;
}

function isEmpty(queue) {
    return queue.collection.length === 0;
}

const queue = initQueue();

const input = document.getElementById("element-input");
const display = document.getElementById("queue-display");
const enqueueButton = document.getElementById("enqueue-button");
const dequeueButton = document.getElementById("dequeue-button");
const frontButton = document.getElementById("front-button");

function renderQueue(highlightFront = false) {
    display.innerHTML = "";

    queue.collection.forEach((element, index) => {
        const circle = document.createElement("div");
        circle.className = "queue-circle";
        circle.textContent = element;

        if (index === 0) {
            circle.classList.add("queue-front");

            if (highlightFront) {
                circle.classList.add("highlight");
            }
        }

        display.appendChild(circle);
    });
}

enqueueButton.addEventListener("click", () => {
    const element = input.value.trim();

    if (!element) return;

    enqueue(queue, element);
    input.value = "";
    renderQueue();
    input.focus();
});

dequeueButton.addEventListener("click", () => {
    if (!isEmpty(queue)) {
        dequeue(queue);
        renderQueue();
    }
});

frontButton.addEventListener("click", () => {
    if (!isEmpty(queue)) {
        renderQueue(true);
    }
});

input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enqueueButton.click();
    }
});

renderQueue();