function  bfs(  graph , start) {



    // console.log(graph , "lll");
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    let currentVertex;



    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

    
    //   console.log(  graph.adjacencyList , "pppppppp" , currentVertex);

      if(!graph.adjacencyList[currentVertex]){ continue }

      graph.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    return result;
}


export default bfs