import random

def create_grid(m, n):
    # Create a grid with obstacles, navigable cells, and the mobile phone
    grid = [['obstacle' if random.random() < 0.2 else 'navigable' for _ in range(n)] for _ in range(m)]

    # Randomly place the mobile phone
    phone_row, phone_col = random.randint(0, m-1), random.randint(0, n-1)
    grid[phone_row][phone_col] = 'phone'

    return grid, 0, 0
   # return grid, phone_row, phone_col

def print_grid(grid, agent_row, agent_col):
    # Print the current state of the grid with the agent's position
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if i == agent_row and j == agent_col:
                print('A', end=' ')
            else:
                print(grid[i][j][0], end=' ')
        print()

def explore(grid, start_row, start_col):
    agent_row, agent_col = start_row, start_col
    steps = 0

    while grid[agent_row][agent_col] != 'phone':
        print(f"Step {steps + 1}:")
        print_grid(grid, agent_row, agent_col)

        # Explore in a random direction
        direction = random.choice(['up', 'down', 'left', 'right'])

        if direction == 'up' and agent_row > 0:
            agent_row -= 1
        elif direction == 'down' and agent_row < len(grid) - 1:
            agent_row += 1
        elif direction == 'left' and agent_col > 0:
            agent_col -= 1
        elif direction == 'right' and agent_col < len(grid[0]) - 1:
            agent_col += 1

        steps += 1

    print(f"\nAgent found the mobile phone in {steps} steps at position ({agent_row}, {agent_col})!")

# Set grid size
m, n = 10, 10

# Create the grid and get the starting position for the agent
grid, start_row, start_col = create_grid(m, n)

# Simulate the agent's exploration
explore(grid, start_row, start_col)