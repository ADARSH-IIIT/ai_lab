
//////////////////////////////////////////////     graph using js ///////////////////////////////////////////////////







class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    addEdge(source, destination) {
      if (!this.adjacencyList[source]) {
        this.addVertex(source);
      }
      if (!this.adjacencyList[destination]) {
        this.addVertex(destination);
      }
      this.adjacencyList[source].push(destination);
      this.adjacencyList[destination].push(source);
    }
   
  }


  export default Graph

