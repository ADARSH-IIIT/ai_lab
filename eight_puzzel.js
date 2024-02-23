class PuzzleNode {
    constructor(state, parent, move, depth, cost) {
      this.state = state;
      this.parent = parent;
      this.move = move;
      this.depth = depth;
      this.cost = cost;
    }
  }
  
  function solvePuzzle(initialState ,  finalstate) {
    const goalState = finalstate
    const moves = ['Up', 'Down', 'Left', 'Right'];
  
    const openList = [];
    const closedList = new Set();
  
    const initialNode = new PuzzleNode(initialState, null, null, 0, 0);
    openList.push(initialNode);
  
    while (openList.length > 0) {
      let currentNode = openList.shift();
      closedList.add(currentNode.state.toString());
  
      if (currentNode.state.toString() === goalState.toString()) {
        const path = [];
        while (currentNode.parent !== null) {
          path.push({ move: currentNode.move, state: currentNode.state });
          currentNode = currentNode.parent;
        }
        path.push({ move: 'Initial State', state: currentNode.state });
        path.reverse().forEach((step, index) => {
          console.log(`Step ${index}: ${step.move}`);
          console.log(step.state.slice(0, 3));
          console.log(step.state.slice(3, 6));
          console.log(step.state.slice(6, 9));
        });
        return;
      }
  
      let zeroIndex = currentNode.state.indexOf(0);
      let zeroRow = Math.floor(zeroIndex / 3);
      let zeroCol = zeroIndex % 3;
  
      for (let move of moves) {
        let newState = currentNode.state.slice();
        let newZeroRow = zeroRow;
        let newZeroCol = zeroCol;
  
        if (move === 'Up' && zeroRow > 0) {
          newZeroRow = zeroRow - 1;
        } else if (move === 'Down' && zeroRow < 2) {
          newZeroRow = zeroRow + 1;
        } else if (move === 'Left' && zeroCol > 0) {
          newZeroCol = zeroCol - 1;
        } else if (move === 'Right' && zeroCol < 2) {
          newZeroCol = zeroCol + 1;
        } else {
          continue;
        }
  
        let newIndex = newZeroRow * 3 + newZeroCol;
        [newState[zeroIndex], newState[newIndex]] = [newState[newIndex], newState[zeroIndex] ]
  
        if (!closedList.has(newState.toString())) {
          const newNode = new PuzzleNode(newState, currentNode, move, currentNode.depth + 1, 0);
          openList.push(newNode);
        }
      }
      openList.sort((a, b) => a.depth + a.cost - (b.depth + b.cost));
    }
  
    console.log('No solution found.');
  }
  
  const initialState = [    2, 8, 3,
                             0, 6, 4,
                              7, 1, 5];

  const goalstate = [  8, 2, 3,
                        0, 6, 4,
                      7, 1, 5];
  solvePuzzle(initialState , goalstate);
  