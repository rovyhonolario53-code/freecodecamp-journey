const INF = Infinity;
const adjMatrix = [
  [0, 5, 3, INF, 11, INF],
  [5, 0, 1, INF, INF, 2],
  [3, 1, 0, 1, 5, INF],
  [INF, INF, 1, 0, 9, 3],
  [11, INF, 5, 9, 0, INF],
  [INF, 2, INF, 3, INF, 0],
];

const nodeLabels = ["A", "B", "C", "D", "E", "F"];
const nodePositions = {
  0: { x: 110, y: 120 },
  1: { x: 260, y: 70 },
  2: { x: 220, y: 220 },
  3: { x: 420, y: 250 },
  4: { x: 520, y: 120 },
  5: { x: 620, y: 220 },
};

const startSelect = document.getElementById("start-node");
const targetSelect = document.getElementById("target-node");
const runBtn = document.getElementById("run-btn");
const resetBtn = document.getElementById("reset-btn");
const routeOutput = document.getElementById("route-output");
const stepLog = document.getElementById("step-log");
const stepStatus = document.getElementById("step-status");
const distanceTable = document.getElementById("distance-table");
const graph = document.getElementById("graph");

function populateNodeSelectors() {
  for (let i = 0; i < nodeLabels.length; i++) {
    const optionStart = document.createElement("option");
    optionStart.value = i;
    optionStart.textContent = `${nodeLabels[i]} (${i})`;
    startSelect.appendChild(optionStart);

    const optionTarget = document.createElement("option");
    optionTarget.value = i;
    optionTarget.textContent = `${nodeLabels[i]} (${i})`;
    targetSelect.appendChild(optionTarget);
  }

  startSelect.value = "0";
  targetSelect.value = "5";
}

function shortestPath(matrix, startNode, targetNode = null) {
  const n = matrix.length;
  const distances = new Array(n).fill(INF);
  const previous = new Array(n).fill(null);
  const visited = new Array(n).fill(false);
  const paths = Array.from({ length: n }, (_, i) => [i]);
  distances[startNode] = 0;

  const steps = [];

  for (let i = 0; i < n; i++) {
    let minDistance = INF;
    let current = -1;

    for (let nodeNo = 0; nodeNo < n; nodeNo++) {
      if (!visited[nodeNo] && distances[nodeNo] < minDistance) {
        minDistance = distances[nodeNo];
        current = nodeNo;
      }
    }

    if (current === -1) {
      break;
    }

    visited[current] = true;
    steps.push({
      type: "visit",
      current,
      distances: [...distances],
      visited: [...visited],
      message: `Visit node ${nodeLabels[current]} and relax its neighbors.`
    });

    for (let nodeNo = 0; nodeNo < n; nodeNo++) {
      const distance = matrix[current][nodeNo];
      if (distance !== INF && !visited[nodeNo]) {
        const newDistance = distances[current] + distance;
        if (newDistance < distances[nodeNo]) {
          distances[nodeNo] = newDistance;
          previous[nodeNo] = current;
          paths[nodeNo] = [...paths[current], nodeNo];
          steps.push({
            type: "relax",
            current,
            target: nodeNo,
            newDistance,
            distances: [...distances],
            visited: [...visited],
            message: `Update ${nodeLabels[nodeNo]} through ${nodeLabels[current]} to ${newDistance}.`
          });
        }
      }
    }
  }

  const allTargets = targetNode !== null ? [targetNode] : [...Array(n).keys()];
  const result = { distances, paths, previous, steps, targets: allTargets };

  return result;
}

function buildDistanceTable(distances, activeNode = null) {
  distanceTable.innerHTML = "";
  distances.forEach((distance, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nodeLabels[index]}</td>
      <td>${distance === INF ? "∞" : distance}</td>
    `;

    if (index === activeNode) {
      row.style.background = "rgba(251, 191, 36, 0.12)";
    }

    distanceTable.appendChild(row);
  });
}

function renderGraph({ visited = [], activeNode = null, pathNodes = new Set(), highlightEdge = null }) {
  const width = 760;
  const height = 420;
  const svgNS = "http://www.w3.org/2000/svg";

  graph.innerHTML = "";

  for (let row = 0; row < adjMatrix.length; row++) {
    for (let col = row + 1; col < adjMatrix[row].length; col++) {
      const weight = adjMatrix[row][col];
      if (weight === INF) continue;

      const from = nodePositions[row];
      const to = nodePositions[col];
      const isOnPath = pathNodes.has(row) && pathNodes.has(col);

      const line = document.createElementNS(svgNS, "line");
      line.setAttribute("x1", from.x);
      line.setAttribute("y1", from.y);
      line.setAttribute("x2", to.x);
      line.setAttribute("y2", to.y);
      line.setAttribute("stroke", isOnPath ? "#22c55e" : "#94a3b8");
      line.setAttribute("stroke-width", isOnPath ? "4" : "2");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("opacity", isOnPath ? "1" : "0.75");
      graph.appendChild(line);

      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;

      const label = document.createElementNS(svgNS, "text");
      label.setAttribute("x", midX);
      label.setAttribute("y", midY - 12);
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("fill", "#cbd5e1");
      label.setAttribute("font-size", "14");
      label.textContent = weight;
      graph.appendChild(label);
    }
  }

  nodeLabels.forEach((label, index) => {
    const pos = nodePositions[index];
    const circle = document.createElementNS(svgNS, "circle");
    const isVisited = visited.includes(index);
    const isCurrent = index === activeNode;
    const isInPath = pathNodes.has(index);

    circle.setAttribute("cx", pos.x);
    circle.setAttribute("cy", pos.y);
    circle.setAttribute("r", isCurrent ? "26" : isInPath ? "22" : "20");
    circle.setAttribute("fill", isCurrent ? "#fbbf24" : isVisited ? "#34d399" : isInPath ? "#22c55e" : "#e2e8f0");
    circle.setAttribute("stroke", isCurrent ? "#f59e0b" : "#0f172a");
    circle.setAttribute("stroke-width", "4");
    graph.appendChild(circle);

    const text = document.createElementNS(svgNS, "text");
    text.setAttribute("x", pos.x);
    text.setAttribute("y", pos.y + 6);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#0f172a");
    text.setAttribute("font-size", "18");
    text.setAttribute("font-weight", "700");
    text.textContent = label;
    graph.appendChild(text);
  });
}

function resetVisualization() {
  routeOutput.textContent = "No route calculated yet.";
  stepLog.innerHTML = "";
  stepStatus.textContent = "Choose a start and target node to begin.";
  buildDistanceTable(Array.from({ length: nodeLabels.length }, () => INF));
  renderGraph({ visited: [], activeNode: null, pathNodes: new Set() });
}

function getPathFromPrevious(previous, startNode, targetNode) {
  const path = [];
  let current = targetNode;

  while (current !== null) {
    path.unshift(current);
    if (current === startNode) break;
    current = previous[current];
  }

  return current === startNode ? path : [];
}

function runVisualization() {
  const startNode = Number(startSelect.value);
  const targetNode = Number(targetSelect.value);

  if (startNode === targetNode) {
    stepStatus.textContent = "Start and target nodes are the same. Choose two different nodes to compute a path.";
    routeOutput.textContent = "Start and target must be different.";
    return;
  }

  const result = shortestPath(adjMatrix, startNode, targetNode);
  const { distances, paths, previous, steps } = result;
  const actualPath = getPathFromPrevious(previous, startNode, targetNode);

  buildDistanceTable(distances, targetNode);
  stepLog.innerHTML = "";

  const logItems = steps.map((step) => {
    if (step.type === "visit") {
      return `<li>Visited ${nodeLabels[step.current]} and settled it as the next closest node.</li>`;
    }

    return `<li>Relaxed edge ${nodeLabels[step.current]} → ${nodeLabels[step.target]} with a better cost of ${step.newDistance}.</li>`;
  });

  stepLog.innerHTML = logItems.join("");

  if (actualPath.length > 0) {
    const pathSet = new Set(actualPath);
    renderGraph({
      visited: steps.at(-1)?.visited ?? [],
      activeNode: targetNode,
      pathNodes: pathSet,
    });

    routeOutput.textContent = `Shortest path: ${actualPath.map((node) => nodeLabels[node]).join(" → ")} (${distances[targetNode]})`;
    stepStatus.textContent = `The shortest route from ${nodeLabels[startNode]} to ${nodeLabels[targetNode]} is ${distances[targetNode]}.`;
  } else {
    renderGraph({
      visited: steps.at(-1)?.visited ?? [],
      activeNode: targetNode,
      pathNodes: new Set(),
    });

    routeOutput.textContent = "No reachable path found.";
    stepStatus.textContent = `There is no valid route from ${nodeLabels[startNode]} to ${nodeLabels[targetNode]}.`;
  }
}

populateNodeSelectors();
resetVisualization();
runBtn.addEventListener("click", runVisualization);
resetBtn.addEventListener("click", resetVisualization);