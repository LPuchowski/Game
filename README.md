# Tennis Simulation Game

An web-based application that allows the simulation of a tennis style game using HTML, CSS, JavaScript and jQuery.

## Purpose
This web application simulates a game of tennis in the style of the game 'Pong'.

The player can play the game in one of three different game modes either against the computer or another player.

Each player's score will increment each time a goal is scored and the game will end when the maximum number of goals allowed by one player is reached. This value is specified by the user before the game begins.

## Functionality

The game operates by the player(s) operating the paddles on either side of the court.

When the ball makes contact with the paddles it will change direction and move the opposite way.

If the ball makes it past one of the paddles and makes contact with wither side of the container the player on the opposite side has their score incremented by one.

The game features three modes of play:

- Single Player Match: Player controls the left paddle and the computer controls the right paddle.
- Two Player Match: Player 1 controls the left paddle and player 2 controls the right paddle.
- Tournament Mode: An even integer is specified which indicates the number of players. All players play one game each against each other until the round is finished and the winners proceed to the next round. The players are chosen at random.

## Implementation
The functionality has been implemented using the following features:

- HTML5
- CSS styling
- JavaScript
- jQuery

## Issues
The key issue faced during development was the use of loops or any other forms of recurssion inside a setInterval(); function causing it to not run properly and all code inside the function would not be ran by the application.

To get around this issue, I had to ensure that there was no form of recurssion inside the function and had to use alternative methods to create functionality such as conditional statements which were useful as the function is already be recursive and would check the statements at every interval.

## Game Link
https://scopeninja97.github.io/Game/