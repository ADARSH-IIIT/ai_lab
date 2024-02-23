class State {
    constructor(jug1, jug2, path = []) {
        this.jug1 = jug1;
        this.jug2 = jug2;
        this.path = path;
    }

    isGoal(goal) {
        return this.jug1 === goal || this.jug2 === goal;
    }

    isValid(capacity1, capacity2) {
        return this.jug1 >= 0 && this.jug1 <= capacity1 &&
               this.jug2 >= 0 && this.jug2 <= capacity2;
    }

    toString() {
        return `(${this.jug1}, ${this.jug2})`;
    }
}

function solveWaterJugProblem(capacity1, capacity2, goal) {
    let queue = [new State(0, 0)];
    let visited = new Set();

    while (queue.length > 0) {
        let currentState = queue.shift();

        if (currentState.isGoal(goal)) {
            currentState.path.push(currentState.toString());
            return currentState.path.join(' -> ');
        }

        let actions = [
            { fill: 'jug1' }, { fill: 'jug2' },
            { pour: 'jug1', into: 'jug2' }, { pour: 'jug2', into: 'jug1' },
            { empty: 'jug1' }, { empty: 'jug2' }
        ];

        for (let action of actions) {
            let nextState;
            if (action.fill) {
                nextState = new State(capacity1, currentState.jug2, [...currentState.path, currentState.toString()]);
            } else if (action.empty) {
                nextState = new State(action.empty === 'jug1' ? 0 : currentState.jug1,
                                      action.empty === 'jug2' ? 0 : currentState.jug2,
                                      [...currentState.path, currentState.toString()]);
            } else if (action.pour && action.into) {
                let amount = Math.min(currentState[action.pour], capacity2 - currentState[action.into]);
                nextState = new State(action.pour === 'jug1' ? currentState.jug1 - amount : currentState.jug1 + amount,
                                      action.pour === 'jug2' ? currentState.jug2 - amount : currentState.jug2 + amount,
                                      [...currentState.path, currentState.toString()]);
            }

            if (nextState.isValid(capacity1, capacity2) && !visited.has(nextState.toString())) {
                visited.add(nextState.toString());
                queue.push(nextState);
            }
        }
    }

    return "No solution found";
}

// Example usage
const capacity1 = 4;
const capacity2 = 3;
const goal = 2;

console.log(`Steps to reach the goal (${goal}):`);
console.log(solveWaterJugProblem(capacity1, capacity2, goal));
