function initStack() {
  return {
    collection: []
  };
}

function push(stack, el) {
  stack.collection.push(el);
}

function pop(stack) {
  return stack.collection.pop();
}

function peek(stack) {
  return stack.collection[stack.collection.length - 1];
}

function isEmpty(stack) {
  return stack.collection.length === 0;
}

function clearStack(stack) {
  stack.collection = []; 
}

const stack = [];
const input = document.getElementById('element-input');
const display = document.getElementById('stack-display');

function renderStack() {
  display.innerHTML = '';
  stack.forEach((element, index) => {
    const item = document.createElement('div');
    item.className = 'stack-element';
    item.textContent = element;
    item.dataset.index = index;
    display.appendChild(item);
  });
}

document.getElementById('push-button').addEventListener('click', () => {
  const value = input.value.trim();
  if (!value) return;
  stack.push(value);
  input.value = '';
  renderStack();
});

document.getElementById('pop-button').addEventListener('click', () => {
  if (stack.length) {
    stack.pop();
    renderStack();
  }
});

document.getElementById('peek-button').addEventListener('click', () => {
  document.querySelectorAll('.peeked').forEach(item => item.classList.remove('peeked'));
  if (stack.length) {
    const top = display.lastElementChild;
    top.classList.add('peeked');
    top.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

input.addEventListener('keydown', event => {
  if (event.key === 'Enter') document.getElementById('push-button').click();
});