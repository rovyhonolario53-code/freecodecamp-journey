function binarySearch(searchList, value) {
  let pathToTarget = [];
  let low = 0;
  let high = searchList.length - 1;
  
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let valueAtMiddle = searchList[mid];
    pathToTarget.push(valueAtMiddle);
    
    if (value === valueAtMiddle) {
      return [pathToTarget,`Value found at index ${mid}`];
    } else if (value > valueAtMiddle) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return [[], "Value not found"];
}


function mergeSort(array) {
  if (array.length <= 1) {
    return;
  }

  const middlePoint = Math.floor(array.length / 2);
  const leftPart = array.slice(0, middlePoint);
  const rightPart = array.slice(middlePoint);

  mergeSort(leftPart);
  mergeSort(rightPart);

  let leftArrayIndex = 0;
  let rightArrayIndex = 0;
  let sortedIndex = 0;

  while (leftArrayIndex < leftPart.length && rightArrayIndex < rightPart.length) {
    if (leftPart[leftArrayIndex] < rightPart[rightArrayIndex]) {
      array[sortedIndex] = leftPart[leftArrayIndex];
      leftArrayIndex += 1;
    } else {
      array[sortedIndex] = rightPart[rightArrayIndex];
      rightArrayIndex += 1;
    }
    sortedIndex += 1;
  }

  while (leftArrayIndex < leftPart.length) {
    array[sortedIndex] = leftPart[leftArrayIndex];
    leftArrayIndex += 1;
    sortedIndex += 1;
  }

  while (rightArrayIndex < rightPart.length) {
    array[sortedIndex] = rightPart[rightArrayIndex];
    rightArrayIndex += 1;
    sortedIndex += 1;
  }
}

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp
      }
    }
  }

  return arr;
}

function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp
    }
  }
  return arr;
}

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let cur = arr[i];
    let j;
    for (j = i - 1; j >= 0; j--) {
      if (arr[j]> cur) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = cur;
  }
  return arr;
}

function partition(arr, start, end) {
  let pivot = arr[end];
  let i = start - 1;

  for (let j = start; j < end; j++) {
    if (arr[j] < pivot) {
      i++
      let temp = arr[i];
      arr[i] =  arr[j];
      arr[j] = temp;
    }
  }
  let temp = arr[i + 1];
  arr[i + 1] = arr[end];
  arr[end] = temp;

  return i + 1;
}

function quicksort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return;
  }

  let pivotIndex = partition(arr, start, end);
  quicksort(arr, start, pivotIndex - 1);
  quicksort(arr, pivotIndex + 1, end );
  return arr;
}

const algorithmInfo = {
  bubble: { name: "Bubble sort", type: "sort", description: "Repeatedly compares neighbors and moves larger values toward the end." },
  selection: { name: "Selection sort", type: "sort", description: "Finds the smallest remaining value and places it next." },
  insertion: { name: "Insertion sort", type: "sort", description: "Grows a sorted section by inserting each new value in its place." },
  quick: { name: "Quicksort", type: "sort", description: "Partitions around a pivot, then sorts the smaller sections recursively." },
  merge: { name: "Merge sort", type: "sort", description: "Splits the list, sorts each half, then merges the halves." },
  binary: { name: "Binary search", type: "search", description: "Halves a sorted list after every comparison to find the target." }
};

const state = {
  values: [],
  steps: [],
  stepIndex: 0,
  playing: false,
  timer: null
};

const bars = document.querySelector("#bars");
const algorithmSelect = document.querySelector("#algorithm");
const input = document.querySelector("#values");
const targetInput = document.querySelector("#target");
const stepLabel = document.querySelector("#step-label");
const statusLabel = document.querySelector("#status");
const explanation = document.querySelector("#explanation");
const complexity = document.querySelector("#complexity");
const runButton = document.querySelector("#run");
const playButton = document.querySelector("#play");
const stepButton = document.querySelector("#step");
const resetButton = document.querySelector("#reset");

function parseValues() {
  const values = input.value.split(",").map((value) => Number(value.trim()));
  return values.filter((value) => Number.isFinite(value)).slice(0, 24);
}

function addStep(values, active = [], compared = [], message = "Ready to explore") {
  state.steps.push({ values: [...values], active, compared, message });
}

function recordSort(name, original) {
  const values = [...original];
  addStep(values, [], [], "Starting with the unsorted list");
  if (name === "bubble") {
    for (let end = values.length - 1; end > 0; end--) {
      for (let index = 0; index < end; index++) {
        addStep(values, [index, index + 1], [index, index + 1], `Compare ${values[index]} and ${values[index + 1]}`);
        if (values[index] > values[index + 1]) {
          [values[index], values[index + 1]] = [values[index + 1], values[index]];
          addStep(values, [index, index + 1], [], "Swap: the larger value moves right");
        }
      }
    }
  } else if (name === "selection") {
    for (let start = 0; start < values.length - 1; start++) {
      let minimum = start;
      for (let index = start + 1; index < values.length; index++) {
        addStep(values, [minimum, index], [minimum, index], `Compare ${values[index]} with current minimum ${values[minimum]}`);
        if (values[index] < values[minimum]) minimum = index;
      }
      if (minimum !== start) {
        [values[start], values[minimum]] = [values[minimum], values[start]];
        addStep(values, [start, minimum], [], `Place ${values[start]} into the sorted section`);
      }
    }
  } else if (name === "insertion") {
    for (let index = 1; index < values.length; index++) {
      const current = values[index];
      let position = index - 1;
      while (position >= 0 && values[position] > current) {
        addStep(values, [position, position + 1], [position, position + 1], `Move ${values[position]} one position right`);
        values[position + 1] = values[position--];
      }
      values[position + 1] = current;
      addStep(values, [position + 1], [], `Insert ${current} into the sorted section`);
    }
  } else if (name === "quick") {
    function sort(start, end) {
      if (start >= end) return;
      const pivot = values[end];
      let boundary = start;
      for (let index = start; index < end; index++) {
        addStep(values, [index, end], [index, end], `Compare ${values[index]} with pivot ${pivot}`);
        if (values[index] < pivot) {
          [values[boundary], values[index]] = [values[index], values[boundary]];
          boundary++;
        }
      }
      [values[boundary], values[end]] = [values[end], values[boundary]];
      addStep(values, [boundary], [], `Pivot ${pivot} is fixed at index ${boundary}`);
      sort(start, boundary - 1);
      sort(boundary + 1, end);
    }
    sort(0, values.length - 1);
  } else {
    function sort(start, end) {
      if (end - start <= 1) return values.slice(start, end);
      const middle = Math.floor((start + end) / 2);
      addStep(values, Array.from({ length: end - start }, (_, offset) => start + offset), [], `Split into indexes ${start}-${middle - 1} and ${middle}-${end - 1}`);
      sort(start, middle); sort(middle, end);
      const merged = []; let left = start; let right = middle;
      while (left < middle && right < end) merged.push(values[left] < values[right] ? values[left++] : values[right++]);
      while (left < middle) merged.push(values[left++]);
      while (right < end) merged.push(values[right++]);
      merged.forEach((value, offset) => { values[start + offset] = value; });
      addStep(values, Array.from({ length: end - start }, (_, offset) => start + offset), [], `Merge the sorted section ${start}-${end - 1}`);
    }
    sort(0, values.length);
  }
  addStep(values, [], [], "Finished: the list is sorted");
}

function recordBinary(original, target) {
  const values = [...original].sort((a, b) => a - b);
  let low = 0; let high = values.length - 1;
  addStep(values, [], [], `Sorted list: searching for ${target}`);
  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    addStep(values, [middle], Array.from({ length: high - low + 1 }, (_, offset) => low + offset), `Check middle value ${values[middle]} at index ${middle}`);
    if (values[middle] === target) { addStep(values, [middle], [], `Found ${target} at index ${middle}`); return; }
    if (target > values[middle]) low = middle + 1; else high = middle - 1;
  }
  addStep(values, [], [], `${target} is not in this list`);
}

function render() {
  const step = state.steps[state.stepIndex] || { values: state.values, active: [], compared: [], message: "Ready to explore" };
  const maximum = Math.max(...step.values, 1);
  bars.innerHTML = step.values.map((value, index) => `<div class="bar-wrap"><span class="bar-value">${value}</span><div class="bar ${step.active.includes(index) ? "active" : ""} ${step.compared.includes(index) ? "compared" : ""}" style="height: ${Math.max(10, (value / maximum) * 100)}%"></div><span class="bar-index">${index}</span></div>`).join("");
  stepLabel.textContent = `STEP ${state.stepIndex + 1} / ${state.steps.length}`;
  statusLabel.textContent = step.message;
  explanation.textContent = algorithmInfo[algorithmSelect.value].description;
  complexity.textContent = algorithmSelect.value === "binary" ? "O(log n) time" : algorithmSelect.value === "quick" ? "O(n log n) average" : algorithmSelect.value === "merge" ? "O(n log n) time" : "O(n²) time";
  playButton.textContent = state.playing ? "Pause" : "Play";
}

function run() {
  stop(); state.values = parseValues();
  if (state.values.length < 2) { statusLabel.textContent = "Enter at least two numbers separated by commas."; return; }
  state.steps = []; state.stepIndex = 0;
  if (algorithmSelect.value === "binary") recordBinary(state.values, Number(targetInput.value)); else recordSort(algorithmSelect.value, state.values);
  render();
}

function stop() { state.playing = false; clearInterval(state.timer); }
function play() { if (state.stepIndex >= state.steps.length - 1) state.stepIndex = 0; state.playing = true; state.timer = setInterval(() => { state.stepIndex++; if (state.stepIndex >= state.steps.length - 1) stop(); render(); }, 420); render(); }

runButton.addEventListener("click", run);
playButton.addEventListener("click", () => state.playing ? (stop(), render()) : play());
stepButton.addEventListener("click", () => { stop(); state.stepIndex = Math.min(state.stepIndex + 1, state.steps.length - 1); render(); });
resetButton.addEventListener("click", () => { stop(); state.stepIndex = 0; state.steps = []; state.values = parseValues(); render(); });
algorithmSelect.addEventListener("change", () => { document.body.classList.toggle("search-mode", algorithmSelect.value === "binary"); run(); });
run();