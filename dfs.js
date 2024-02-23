function  dfs(  graph  , start) {
    const result = [];
    const stack = [start];
    const visited = {};
    visited[start] = true;
    let currentVertex;


    
    while (stack.length) {
      currentVertex = stack.pop();
      result.push(currentVertex);



      if(!graph.adjacencyList[currentVertex]){ continue }



      graph.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
}

export default dfs