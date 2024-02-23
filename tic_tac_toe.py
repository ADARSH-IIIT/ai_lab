# Function to print the Tic Tac Toe board
def print_board(board):
    for row in board:
        print(" | ".join(row))
        print("-" * 5)

# Function to check if a player has won
def check_winner(board, player):
    for i in range(3):
        if all([cell == player for cell in board[i]]):  # Check rows
            return True
        if all([board[j][i] == player for j in range(3)]):  # Check columns
            return True
    if all([board[i][i] == player for i in range(3)]) or all([board[i][2-i] == player for i in range(3)]):  # Check diagonals
        return True
    return False

# Main function to play the game
def play_game():
    board = [[" " for _ in range(3)] for _ in range(3)]
    players = ["X", "O"]
    turn = 0

    while True:
        print_board(board)
        player = players[turn % 2]
        print(f"Player {player}'s turn")
        
        row = int(input("Enter row number (0, 1, 2): "))
        col = int(input("Enter column number (0, 1, 2): "))
        
        if board[row][col] == " ":
            board[row][col] = player
            if check_winner(board, player):
                print_board(board)
                print(f"Player {player} wins!")
                break
            if all([cell != " " for row in board for cell in row]):
                print_board(board)
                print("It's a tie!")
                break
            turn += 1
        else:
            print("That position is already taken. Try again.")

# Start the game
play_game()
