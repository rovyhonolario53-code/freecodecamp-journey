function dfs(graph, root) {
  const n = graph.length
  const isVisited = new Array(n).fill(false)
  const stack = [];
  const result = [];

  stack.push(root);
  while (stack.length > 0) {
    const node = stack.pop();
    isVisited[node] = true;
    result.push(node);
    for (let i = 0; i < graph[node].length; i++) {
      if (graph[node][i] === 1 && isVisited[i] === false) {
        stack.push(i)
      }
    }
  }

  return result;
}

