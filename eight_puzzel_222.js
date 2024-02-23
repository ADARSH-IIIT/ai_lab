// Program to print path from root node to destination node
// for N*N - 1 puzzle algorithm using Branch and Bound
// The solution assumes that the instance of the puzzle is solvable

const N = 3;

// State space tree nodes
class Node {
	constructor(mat, x, y, level, parent) {
		// Stores the parent node of the current node
		// Helps in tracing the path when the answer is found
		this.parent = parent;

		// Stores matrix
		this.mat = mat.map(row => [...row]);

		// Stores blank tile coordinates
		this.x = x;
		this.y = y;

		// Stores the number of misplaced tiles
		this.cost = Infinity;

		// Stores the number of moves so far
		this.level = level;
	}
}

// Function to print N x N matrix
function printMatrix(mat) {
	for (let i = 0; i < N; i++) {
		console.log(mat[i].join(' '));
	}
	console.log('\n');
}

// Function to allocate a new node
function newNode(mat, x, y, newX, newY, level, parent) {
	const node = new Node(mat, x, y, level, parent);

	// Move tile by 1 position
	[node.mat[x][y], node.mat[newX][newY]] = [node.mat[newX][newY], node.mat[x][y]];

	// Update new blank tile coordinates
	node.x = newX;
	node.y = newY;

	return node;
}

// Bottom, left, top, right
const row = [1, 0, -1, 0];
const col = [0, -1, 0, 1];

// Function to calculate the number of misplaced tiles
// i.e., number of non-blank tiles not in their goal position
function calculateCost(initial, final) {
	let count = 0;
	for (let i = 0; i < N; i++)
		for (let j = 0; j < N; j++)
			if (initial[i][j] && initial[i][j] !== final[i][j])
				count++;
	return count;
}

// Function to check if (x, y) is a valid matrix coordinate
function isSafe(x, y) {
	return x >= 0 && x < N && y >= 0 && y < N;
}

// Print path from root node to destination node
function printPath(root) {
	if (!root) return;
	printPath(root.parent);
	printMatrix(root.mat);
}

// Comparison object to be used to order the heap
class comp {
	static compare(lhs, rhs) {
		return (lhs.cost + lhs.level) > (rhs.cost + rhs.level);
	}
}

// Function to solve N*N - 1 puzzle algorithm using
// Branch and Bound. x and y are blank tile coordinates
// in the initial state
function solve(initial, x, y, final) {
	// Create an array to store live nodes of the search tree
	const pq = [];

	// Create a root node and calculate its cost
	const root = newNode(initial, x, y, x, y, 0, null);
	root.cost = calculateCost(initial, final);

	// Add root to the array of live nodes
	pq.push(root);

	// Find a live node with the least cost,
	// add its children to the array of live nodes, and
	// finally delete it from the array
	while (pq.length > 0) {
		// Find a live node with the least estimated cost
		pq.sort(comp.compare);
		const min = pq.shift();

		// If min is an answer node
		if (min.cost === 0) {
			// Print the path from root to destination
			printPath(min);
			return;
		}

		// Do for each child of min
		// Max 4 children for a node
		for (let i = 0; i < 4; i++) {
			if (isSafe(min.x + row[i], min.y + col[i])) {
				// Create a child node and calculate its cost
				const child = newNode(min.mat, min.x,
					min.y, min.x + row[i],
					min.y + col[i],
					min.level + 1, min);
				child.cost = calculateCost(child.mat, final);

				// Add child to the array of live nodes
				pq.push(child);
			}
		}
	}
}

// Driver code
// Initial configuration
// Value 0 is used for empty space
const initial = [
	[1, 2, 3],
	[5, 6, 0],
	[7, 8, 4]
];

// Solvable Final configuration
// Value 0 is used for empty space
const final = [
	[1, 2, 3],
	[5, 8, 6],
	[0, 7, 4]
];


 const initialState = [    2, 8, 3,
                             0, 6, 4,
                              7, 1, 5];

  const goalstate = [  8, 2, 3,
                        0, 6, 4,
                      7, 1, 5];

// Blank tile coordinates in the initial configuration
const startX = 1, startY = 2;

solve(initial, startX, startY, final);


// This code is contributed by shivamgupta310570
