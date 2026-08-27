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
  const node = { element, next: null };

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

  if (current === null) return;

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
}

const myList = initList()
add(myList, 32);
add(myList, 32);
add(myList, 32);
add(myList, 32);
console.log(JSON.stringify(myList, null, 2))

function contains(list, element) {
  let current = list.head;
  while (current !== null) {
    if (current.element === element) {
      return true;
    } 
    current = current.next
  }
  return false;
}

console.log(contains(myList, 32))

function getAt(list, index) {
  let current = list.head
  let currentIndex = 0
  if (!list.head || index < 0) {
    return undefined;
  }
  while (current !== null) {
    if (currentIndex === index) {
      return current.element;
    } 
    currentIndex++
    current = current.next
  
  }
  return undefined;
}
  console.log(getAt(myList, 0))

function insertAt(list, index, element) {
  if (index < 0 || index > list.length) {
    return;
  }

  const newNode = { element, next: null };

  if (index === 0) {
    newNode.next = list.head;
    list.head = newNode;
    list.length++
    return;
  }

  let current = list.head;
  let currentIndex = 0;

  while (current !== null && currentIndex < index - 1) {
      current = current.next;
      currentIndex++
    }
   if (current !== null)
  {newNode.next = current.next;
  current.next = newNode;
  list.length++}
  }


console.log(insertAt(myList, 1, 2))

  


function removeAt(list, index) {
    if (index < 0 || index >= list.length) {
    return;
  }

  if (index === 0) {
    const removedElement = list.head.element;
    list.head = list.head.next
    list.length--
    return removedElement;
  }


  let currentIndex = 0;
  let current = list.head;
  let previous = null;

  while (currentIndex !== index) {
      previous = current;
      current =  current.next;
      currentIndex++;
    }
  if (current !== null) {
  previous.next = current.next;
  list.length--
  return current.element;
  }
}

function clear(list) {
  list.head = null;
  list.length = 0;
}
const nodeForm = document.querySelector('#node-form');
const nodeValue = document.querySelector('#node-value');
const removeNode = document.querySelector('#remove-node');
const nodeIndex = document.querySelector('#node-index');
const insertNode = document.querySelector('#insert-node');
const removeAtNode = document.querySelector('#remove-at');
const getAtNode = document.querySelector('#get-at');
const containsNode = document.querySelector('#contains-node');
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
        caption.textContent = position === 1 ? 'head node / index 0' : `node ${position} / index ${position - 1}`;

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

function readIndex() {
  const index = Number(nodeIndex.value);
  return Number.isInteger(index) && index >= 0 ? index : null;
}

insertNode.addEventListener('click', () => {
  const index = readIndex();
  const value = nodeValue.value.trim();

  if (index === null || !value) {
    showFeedback('Enter a value and a valid index.', true);
    return;
  }

  if (index > myList.length) {
    showFeedback(`Index must be between 0 and ${myList.length}.`, true);
    return;
  }

  insertAt(myList, index, value);
  renderList();
  showFeedback(`Inserted ${value} at index ${index}.`);
  nodeForm.reset();
  nodeValue.focus();
});

removeAtNode.addEventListener('click', () => {
  const index = readIndex();

  if (index === null || index >= myList.length) {
    showFeedback('Enter an index for an existing node.', true);
    return;
  }

  const removedElement = removeAt(myList, index);
  renderList();
  showFeedback(`Removed ${removedElement} from index ${index}.`);
  nodeForm.reset();
  nodeValue.focus();
});

getAtNode.addEventListener('click', () => {
  const index = readIndex();

  if (index === null) {
    showFeedback('Enter a valid index.', true);
    return;
  }

  const value = getAt(myList, index);
  showFeedback(value === undefined ? `No node exists at index ${index}.` : `Index ${index} contains ${value}.`, value === undefined);
});

containsNode.addEventListener('click', () => {
  const value = nodeValue.value.trim();

  if (!value) {
    showFeedback('Enter a value to search for.', true);
    nodeValue.focus();
    return;
  }

  const found = contains(myList, value);
  showFeedback(found ? `${value} is in the list.` : `${value} is not in the list.`, !found);
});

clearList.addEventListener('click', () => {
  clear(myList);
    renderList();
    showFeedback('List reset.');
    nodeValue.focus();
});

renderList();
