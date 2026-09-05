function generateElement() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateArray() {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push(generateElement());
  }
  return arr;
}

function generateContainer() {
  return document.createElement('div');
}

function fillArrContainer(el, arr) {
  el.innerHTML = arr.map(num => `<span>${num}</span>`).join('');
}

function isOrdered(num1, num2) {
  return num1 <= num2;
}

function swapElements(arr, index) {
  if (!isOrdered(arr[index], arr[index + 1])) {
    let temp = arr[index + 1];
    arr[index + 1] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

function highlightCurrentEls(el, index) {
  el.children[index].style.border = "2px dashed red";
  el.children[index + 1].style.border = "2px dashed red";
}

const arrayContainer = document.getElementById("array-container");
const startingArr = document.getElementById("starting-array");

let createdArr = [];

document.getElementById("generate-btn").addEventListener("click", () => {
  createdArr = generateArray();
  arrayContainer.querySelectorAll(":not(#starting-array)").forEach(el => el.remove());
  fillArrContainer(startingArr, createdArr);
});

document.getElementById("sort-btn").addEventListener("click", () => {
  if (!createdArr.length) return;

  arrayContainer.querySelectorAll(":not(#starting-array)").forEach(el => el.remove());

  const arr = [...createdArr];
  fillArrContainer(startingArr, arr);
  highlightCurrentEls(startingArr, 0);

  let swapped = true;
  let firstStep = true;

  while (swapped) {
    swapped = false;

    for (let j = 0; j < arr.length - 1; j++) {
      let container;

      if (firstStep) {
        container = startingArr;
        firstStep = false;
      } else {
        container = generateContainer();
        fillArrContainer(container, arr);
        highlightCurrentEls(container, j);
        arrayContainer.appendChild(container);
      }

      if (!isOrdered(arr[j], arr[j + 1])) {
        swapped = true;
      }
      swapElements(arr, j);
    }
  }

  const finalContainer = generateContainer();
  fillArrContainer(finalContainer, arr);
  arrayContainer.appendChild(finalContainer);
});