function initList() {
    return {
        head: null,
        length: 0
    };
}

function isEmpty(list) {
  return list.length === 0;
}

function add(list, element) {
    const node = {
        element: element,
        next: null
    };

    if (isEmpty(list)) {
        list.head = node;
    } else {
        let current = list.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = node;
    }

    list.length++;
}

function remove(list, element) {
    let previous = null;
    let current = list.head;

    while (current !== null && current.element !== element) {
        previous = current;
        current = current.next; 
    }

    if (current === null) {
        return;
    }

    if(previous !== null) {
        previous.next = current.next;
    } else {
        list.head = current.next;
    }

    list.length--;
    
}

const myList = initList();
add(myList, 42);
add(myList, 43);
add(myList, 44);

const nodeForm = document.querySelector('#node-form');
const nodeValue = document.querySelector('#node-value');
const removeNode = document.querySelector('#remove-node');
const clearList = document.querySelector('#clear-list');
const listCanvas = document.querySelector('#list-canvas');
const listLength = document.querySelector('#list-length');
const feedback = document.querySelector('#feedback');

function renderList() {
    listCanvas.replaceChildren();
    listLength.textContent = `${myList.length} ${myList.length === 1 ? 'node' : 'nodes'}`;

    if (isEmpty(myList)) {
        const emptyState = document.createElement('p');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'The list is empty. Add a value to create the head node.';
        listCanvas.append(emptyState);
        return;
    }

    let current = myList.head;
    let position = 1;

    while (current !== null) {
        const nodeGroup = document.createElement('div');
        nodeGroup.className = 'node-group';
        nodeGroup.style.animationDelay = `${position * 50}ms`;

        const node = document.createElement('article');
        node.className = 'node';
        const value = document.createElement('strong');
        value.className = 'node-value';
        value.textContent = current.element;
        const next = document.createElement('span');
        next.className = 'node-next';
        next.textContent = current.next === null ? 'null' : 'next';
        const caption = document.createElement('span');
        caption.className = 'node-caption';
        caption.textContent = position === 1 ? 'head node' : `node ${position}`;

        node.append(value, next, caption);
        nodeGroup.append(node);
        listCanvas.append(nodeGroup);

        if (current.next !== null) {
            const connector = document.createElement('span');
            connector.className = 'connector';
            connector.setAttribute('aria-hidden', 'true');
            listCanvas.append(connector);
        }

        current = current.next;
        position++;
    }
}

function showFeedback(message, isError = false) {
    feedback.textContent = message;
    feedback.classList.toggle('error', isError);
}

nodeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = nodeValue.value.trim();

    if (!value) {
        showFeedback('Enter a value before adding a node.', true);
        return;
    }

    add(myList, value);
    renderList();
    showFeedback(`Added ${value} to the tail.`);
    nodeForm.reset();
    nodeValue.focus();
});

removeNode.addEventListener('click', () => {
    const value = nodeValue.value.trim();

    if (!value) {
        showFeedback('Enter the value you want to remove.', true);
        nodeValue.focus();
        return;
    }

    const lengthBefore = myList.length;
    remove(myList, value);
    renderList();
    showFeedback(lengthBefore === myList.length ? `${value} was not found.` : `Removed ${value}.`, lengthBefore === myList.length);
    nodeForm.reset();
    nodeValue.focus();
});

clearList.addEventListener('click', () => {
    myList.head = null;
    myList.length = 0;
    renderList();
    showFeedback('List reset.');
    nodeValue.focus();
});

renderList();
