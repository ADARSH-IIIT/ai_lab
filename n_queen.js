function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill(0));
    solveNQueensUtil(board, 0, n);
  }
  
  function solveNQueensUtil(board, row, n) {
    if (row === n) {
      // Found a solution, print the board
      printBoard(board);
      return;
    }
  
    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col, n)) {
        board[row][col] = 1;
        solveNQueensUtil(board, row + 1, n);
        board[row][col] = 0; // backtrack
      }
    }
  }
  
  function isSafe(board, row, col, n) {
    // Check if there is a queen in the same column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 1) {
        return false;
      }
    }
  
    // Check if there is a queen in the left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 1) {
        return false;
      }
    }
  
    // Check if there is a queen in the right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 1) {
        return false;
      }
    }
  
    return true;
  }
  
  function printBoard(board) {
    for (const row of board) {
      console.log(row.join(' '));
    }
    console.log('\n');
  }
  
  // Example usage:
  const n = 5; // Change this to the desired board size
  solveNQueens(n);