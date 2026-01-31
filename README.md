# 15 Puzzle Game

## Project Goal

The goal of this project is to create a fully functional, web-based version of the classic 15 puzzle game using fundamental front-end technologies. The project will be self-contained within a `frontend` directory.

## Rules

The game consists of a 4x4 grid with 15 numbered tiles and one empty space. The objective is to arrange the tiles in numerical order from 1 to 15, from left to right and top to bottom. Players can slide tiles horizontally or vertically into the empty space.

## Game Workflow

1.  **Initialization**: The game board is created and the tiles are randomly shuffled. The timer starts and the move count is set to 0.
2.  **Gameplay**: The user clicks on a tile adjacent to the empty space to move it. The move counter increments. Tiles in their correct final position change color.
3.  **Win Condition**: The game continuously checks if the tiles are in the correct order.
4.  **Game End**: When the win condition is met, the timer stops, and a success message is displayed with the total number of moves.
5.  **Restart**: The user can click the "Shuffle" button at any time to restart the game with a new random puzzle.

## Features

*   A 4x4 grid for the puzzle.
*   15 tiles numbered from 1 to 15, starting in a random configuration.
*   One empty space to allow for tile movement.
*   Ability to move tiles up, down, left, or right into the empty space.
*   Win detection when tiles are in numerical order.
*   A "Shuffle" button to start a new game at any time.
*   A counter that tracks the number of moves made since the start of the game.
*   A timer that tracks the time elapsed since the start of the game.
*   Visual feedback (color change) for tiles that are in their correct position.
*   A clear "Game Won" message displaying the total moves upon completion.

## Requirements

### Functional Requirements

*   The game must display a 4x4 grid with randomly numbered tiles.
*   The grid must contain 15 numbered tiles and one empty space.
*   Users must be able to move tiles into the empty space by clicking on them.
*   The game must change the color of a tile when it is in its correct final position.
*   The game must display a "Game Won" message with the total number of moves when the puzzle is solved.
*   The game must provide a "Shuffle" button to restart the game at any time.
*   The game must display the number of moves made by the player since the game started.
*   The game must display the time elapsed since the game started.

### Non-Functional Requirements

*   The game should have a clean and intuitive user interface with a retro video game aesthetic.
*   The game should be responsive and playable on various screen sizes.
*   The game's performance should be smooth, with no noticeable lag during tile movements.

## Architecture

This project will follow a simple Model-View-Controller (MVC) architectural pattern:

*   **Model**: Represents the state of the game. This includes the current arrangement of the tiles on the grid, the location of the empty space, the number of moves, and the timer's value.
*   **View**: Renders the game board and the user interface, including the tiles, the move counter, and the timer. It will be built using HTML and styled with CSS.
*   **Controller**: Handles user input, such as clicks on the tiles. It will update the Model based on user actions and then update the View to reflect the changes in the Model. The game logic will be implemented in JavaScript.

## Tech Stack

*   **HTML**: For the basic structure of the game.
*   **CSS**: For styling the game and making it visually appealing.
*   **JavaScript**: For the game logic, including tile movement, win detection, and user interactions. No external libraries or frameworks will be used.