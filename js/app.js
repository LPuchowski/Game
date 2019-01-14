$(function(){

  var interval;
  var interval2;
  var progRunning = false;
  var i = 1;

  // Target the ball object
  var ball = $("#ball");

  // Target the container
  var container = $("#container");

  var padposy = 0;
  var pad2posy = 0;
  // Target the paddles
  var paddle = $("#pad");
  var paddle2 = $("#pad2");

  // Target the inner HTML of the leaderboard elements
  var leader1 = document.getElementById('leader1').innerHTML;
  var leader2 = document.getElementById('leader2').innerHTML;
  var leader3 = document.getElementById('leader3').innerHTML;
  var leader4 = document.getElementById('leader4').innerHTML;
  var leader5 = document.getElementById('leader5').innerHTML;

  var l1 = 0;
  var l2 = 0;
  var l3 = 0;
  var l4 = 0;
  var l5 = 0;

  // Set the initial position of the ball
  var posX = 25;
  var posY = 0;

  // Set ball direction
  var directionX = "+";
  var directionY = "+";

  // Gravity

  var gravity = 0.05;
  var gravityspeed = 0;

  var p = 0;
  var hit = false;
  var lastMoveHit = false;
  var counter = 0;
  var score1 = 0;
  var score2 = 0;
  var winner = null;
  var winnerScore = null;
  var loserScore = null;
  var roundCount = 1;
  var roundBegin = false;
  var tournament = false;
  var playerArray;
  var roundWinners;
  var t1finished = false;
  var speed = 2;
  var scoreCap = 0;

  var up = false;
  var down = false;
  var up2 = false;
  var down2 = false;

  // Checks if the the control keys are being pressed down
  document.addEventListener('keydown', function release(event) {
    if (event.keyCode === 38) {
      up2 = true;
    }
    if (event.keyCode === 87) {
      up = true;
    }
    if (event.keyCode === 40) {
      down2 = true;
    }
    if (event.keyCode === 83) {
      down = true;
    }
  });

  // Checks if the the control keys are being released
  document.addEventListener('keyup', function release(event) {
    if (event.keyCode === 38) {
      up2 = false;
    }
    if (event.keyCode === 87) {
      up = false;
    }
    if (event.keyCode === 40) {
      down2 = false;
    }
    if (event.keyCode === 83) {
      down = false;
    }
  });

  // Initiates a single player game against the computer
  $("#single").click(function(){

    // Prompts user to enter number to decide their paddle colour
    while(paddle1Color != "1" && paddle1Color != "2" && paddle1Color != "3" && paddle1Color != "4" && paddle1Color != "5") {
      var paddle1Color = prompt("Player 1, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }

    // Sets paddle colour
    switch (paddle1Color) {
      case "1": paddle1Color = "Red"; break;
      case "2": paddle1Color = "Yellow"; break;
      case "3": paddle1Color = "Blue"; break;
      case "4": paddle1Color = "Orange"; break;
      case "5": paddle1Color = "Purple"; break;
      default: break;
    }
    paddle.css("backgroundColor", paddle1Color);
    scoreCap = 0;

    // Takes user input to decide number of points to win
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    scoreCap = parseInt(scoreCap);

    // Start game vs the computer
    playGame("1", "Computer");

  })

  // Initiates a two player game
  $("#btn").click(function(){

    // Prompts player 1 to enter number to decide their paddle colour
    while(paddle1Color != "1" && paddle1Color != "2" && paddle1Color != "3" && paddle1Color != "4" && paddle1Color != "5") {
      var paddle1Color = prompt("Player 1, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }

    // Prompts player 2 to enter number to decide their paddle colour
    while(paddle2Color != "1" && paddle2Color != "2" && paddle2Color != "3" &&    paddle2Color != "4" && paddle2Color != "5") {
      var paddle2Color = prompt("Player 2, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }

    // Sets paddle colour
    switch (paddle1Color) {
      case "1": paddle1Color = "Red"; break;
      case "2": paddle1Color = "Yellow"; break;
      case "3": paddle1Color = "Blue"; break;
      case "4": paddle1Color = "Orange"; break;
      case "5": paddle1Color = "Purple"; break;
      default: break;
    }

    // Sets paddle colour
    switch (paddle2Color) {
      case "1": paddle2Color = "Red"; break;
      case "2": paddle2Color = "Yellow"; break;
      case "3": paddle2Color = "Blue"; break;
      case "4": paddle2Color = "Orange"; break;
      case "5": paddle2Color = "Purple"; break;
      default: break;
    }
    paddle.css("backgroundColor", paddle1Color);
    paddle2.css("backgroundColor", paddle2Color);
    scoreCap = 0;

    // Takes user input to decide number of points to win
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    scoreCap = parseInt(scoreCap);
    playGame("1", "2");
    counter = 0;
  })

  // Initiates a tournament
  $("#tournament").click(function(){
    tournament = true;

    // Prompts user for number of players in the tournament
    var players = prompt("How many players? Please enter: 2, 4, 8 or 16");
    while (players != 2 && players != 4 && players != 8 && players != 16) {
      players = prompt("You need to enter either: 2, 4, 8 or 16. How many players?");
    }

    // Creates an array and stores the values of each player
    playerArray = new Array(parseInt(players));
    for (var i = 0; i < parseInt(players); i++) {
      playerArray[i] = i + 1;
    }

    // Chooses two players randomly
    var player1 = random_player(playerArray);
    do {
      var player2 = random_player(playerArray);
    } while (player1 == player2);

    // Variable to store the winners of each round
    roundWinners = new Array(playerArray.length/2);

    playerArray[player1-1] = null;
    playerArray[player2-1] = null;

    var count = 0;
    scoreCap = 0;

    // Takes user input to decide number of points to win
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    alert("First match is Player " + player1 + " vs Player " + player2);
    scoreCap = parseInt(scoreCap);

    // Start tournament
    playGame(player1, player2);
  })

  // Function used to decide which players are next in tournament mode
  function random_player(players) {
    return players[Math.floor(Math.random()*players.length)];
  }

  // Function to play the game
  function playGame(player1, player2) {

    // Constantly repeats to alow flow of the game
    interval = setInterval(function(){

      // Set ball position
      ball.css({
        "left": posX + "px",
        "top": posY + "px"
      })

      var ballLeft = ball.offset().left;
      var ballRight = ballLeft + ball.width();
      var ballTop = ball.offset().top;
      var ballBottom = ballTop + ball.height();

      var containerLeft = container.offset().left;
      var containerRight = container.offset().left + container.width();
      var containerTop = container.offset().top + p;
      var containerBottom = containerTop + container.height();

      var paddleLeft = paddle.offset().left;
      var paddleRight = paddleLeft + paddle.width();
      var paddleTop = paddle.offset().top;
      var paddleBottom = paddleTop + paddle.height();

      var paddle2Left = paddle2.offset().left;
      var paddle2Right = paddle2Left + paddle2.width();
      var paddle2Top = paddle2.offset().top;
      var paddle2Bottom = paddle2Top + paddle2.height();

      // Set first paddle position
      paddle.css({
        "top": padposy
      })

      // Set second paddle position
      paddle2.css({
        "top": pad2posy
      })

      // First paddle goes up when 'A' key is pressed
      if (up) {
        if (padposy >= 3) {
          padposy -= 3;
        }
      }

      // First paddle goes down when 'S' key is pressed
      if (down) {
        if (padposy <= 239) {
          padposy += 3;
        }
      }

      // Second paddle follows the ball if single player game is played
      if (player2 == "Computer") {
        if (speed < 3.6 && paddle2Top > ballTop - 14) {
          pad2posy -= 3;
        } else if (speed < 3.6 && paddle2Top < ballTop + 14) {
          pad2posy += 3;
        } else if (paddle2Top > ballTop - 9) {
          pad2posy -= 3;
        } else if (paddle2Top < ballTop + 9) {
          pad2posy += 3;
        }
      } else {

        // Second paddle goes up when 'up' key is pressed
        if (up2) {
          if (pad2posy >= 3) {
            pad2posy -= 3;
          }
        }

        // Second paddle goes down when 'down' key is pressed
        if (down2) {
          if (pad2posy <= 239) {
            pad2posy += 3;
          }
        }
      }


      // Ball movement
      if (directionX === "+") {
        posX = posX + speed;
      } else if (directionX === "-") {
        posX = posX - speed;
      }

      if (directionY === "+") {
        gravityspeed += gravity;
        posY+= gravityspeed;
      } else if (directionY === "-"){
        gravityspeed += gravity;
        posY+= gravityspeed;
      }

      if (ballRight >= containerRight) {
        directionX = "-";
      } else if (ballLeft <= containerLeft) {
        directionX = "+";
      }

      if (ballBottom >= containerBottom) {
        directionY = "-";
        gravityspeed = -5;
      } else if (ballTop <= containerTop) {
        directionY = "+";
      }

      if (ballLeft <= paddleRight && ballTop < paddleBottom && ballBottom > paddleTop) {
        directionX = "+";
        if (speed != 8) {
          speed+=0.25;
        }
      }

      // Increases speed of the ball movement unless the cap has been reached
      if (ballRight >= paddle2Left && ballTop < paddle2Bottom && ballBottom > paddle2Top) {
        directionX = "-";
        if (speed != 8) {
          speed+=0.25;
        }
      }

      // Increments player 1 score and resets the position of the ball and the speed and direction
      if (ballRight > containerRight) {
        score1++;
        speed = 2;
        $("#scr1").html("Score 1: " + score1);
        posX = 650;
        posY = 0;
        directionX = "-";
        directionY = "+";
        gravity = 0.05;
        gravityspeed = 0;
        up2 = false;
        up = false;
        down2 = false;
        down = false;
      }

      // Increments player 2 score and resets the position of the ball and the speed and direction
      if (ballLeft < containerLeft) {
        score2++;
        speed = 2;
        $("#scr2").html("Score 2: " + score2);
        posX = 25;
        posY = 0;
        directionX = "+";
        directionY = "+";
        gravity = 0.05;
        gravityspeed = 0;
        up2 = false;
        up = false;
        down2 = false;
        down = false;
      }

      // If a score reaches the cap
      if(score1 == scoreCap || score2 == scoreCap) {

        // Sets 'winner' variable to the value of the winning player
        if (score1 == scoreCap) {
          winner = player1;
          winnerScore = score1;
          loserScore = score2;
        } else {
          winner = player2;
          winnerScore = score2;
          loserScore = score1;
        }
        alert("The winner is Player " + winner);

        // If the computer wins, the score will not be set on the leaderboard
        if (winner != "Computer") {
          if ((winnerScore/loserScore) > l1) {
            if (leader1 != "") {
              $("#leader5").html(leader4);
              $("#leader4").html(leader3);
              $("#leader3").html(leader2);
              $("#leader2").html(leader1);
            }
            var lead = prompt("Enter your name for the leaderboard");
            var leader = lead.substring(0, 7);
            $("#leader1").html(leader + " " + winnerScore + " - " + loserScore);
            l1 = winnerScore/loserScore;
            leader1 = document.getElementById('leader1').innerHTML;
            leader2 = document.getElementById('leader2').innerHTML;
            leader3 = document.getElementById('leader3').innerHTML;
            leader4 = document.getElementById('leader4').innerHTML;
            leader5 = document.getElementById('leader5').innerHTML;
          } else if ((winnerScore/loserScore) > l2) {
            if (leader2 != "") {
              $("#leader5").html(leader4);
              $("#leader4").html(leader3);
              $("#leader3").html(leader2);
            }
            var lead = prompt("Enter your name for the leaderboard");
            var leader = lead.substring(0, 7);
            // leader1 = leader + " " + score1 + " - " + score2;
            $("#leader2").html(leader + " " + winnerScore + " - " + loserScore);
            l2 = winnerScore/loserScore;
            leader2 = document.getElementById('leader2').innerHTML;
            leader3 = document.getElementById('leader3').innerHTML;
            leader4 = document.getElementById('leader4').innerHTML;
            leader5 = document.getElementById('leader5').innerHTML;
          } else if ((winnerScore/loserScore) > l3) {
            if (leader3 != "") {
              $("#leader5").html(leader4);
              $("#leader4").html(leader3);
            }
            var lead = prompt("Enter your name for the leaderboard");
            var leader = lead.substring(0, 7);
            // leader1 = leader + " " + score1 + " - " + score2;
            $("#leader3").html(leader + " " + winnerScore + " - " + loserScore);
            l3 = winnerScore/loserScore;
            leader3 = document.getElementById('leader3').innerHTML;
            leader4 = document.getElementById('leader4').innerHTML;
            leader5 = document.getElementById('leader5').innerHTML;
          } else if ((winnerScore/loserScore) > l4) {
            if (leader4 != "") {
              $("#leader5").html(leader4);
            }
            var lead = prompt("Enter your name for the leaderboard");
            var leader = lead.substring(0, 7);
            // leader1 = leader + " " + score1 + " - " + score2;
            $("#leader4").html(leader + " " + winnerScore + " - " + loserScore);
            l4 = winnerScore/loserScore;
            leader4 = document.getElementById('leader4').innerHTML;
            leader5 = document.getElementById('leader5').innerHTML;
          } else if ((winnerScore/loserScore) > l5) {
            var lead = prompt("Enter your name for the leaderboard");
            var leader = lead.substring(0, 7);
            // leader1 = leader + " " + score1 + " - " + score2;
            $("#leader5").html(leader + " " + winnerScore + " - " + loserScore);
            l5 = winnerScore/loserScore;
            leader5 = document.getElementById('leader5').innerHTML;
          }
        }

        // Resets the scores and paddle positions
        score1 = 0;
        score2 = 0;
        padposy = 0;
        pad2posy = 0;
        paddle.css({
          "top": padposy
        })
        paddle2.css({
          "top": pad2posy
        })

        $("#scr1").html("Score 1: " + score1);
        $("#scr2").html("Score 2: " + score2);

        // If tournament is being played
        if (tournament == true && winner != null) {

          // Add winning player value to 'roundWinners' array at index of 'counter' value
          roundWinners[counter] = winner;
          counter++;

          // Filters 'playerArray' to remove previously chosen players
          playerArray = playerArray.filter(function (el) {
            return el != null;
          });

          // Gets a random player
          player1 = random_player(playerArray);

          // Sets index of the chosen player in 'playerArray' array to null
          playerArray[playerArray.indexOf(player1)] = null;

          // Filters 'playerArray'
          playerArray = playerArray.filter(function (el) {
            return el != null;
          });

          // Gets a random player
          player2 = random_player(playerArray);
          winner = null;

          // If there are no more players to choose from
          if (playerArray.length == 0){

            // If it is any round other than the first
            if (roundCount > 1) {
              roundWinners.length = roundWinners.length / 2;
            }
            alert("Round " + roundCount + " Finished!");

            // All games of the tournament have been played
            if (roundWinners.length == 1) {
              alert("Player " + roundWinners[0] + " wins the tournament!");
              posX = 25;
              posY = 0;
              roundWinners.shift();
              playerArray.shift();
              ball.css({
                "left": posX + "px",
                "top": posY + "px"
              })
              tournament = false;
              roundCount = 1;
              clearInterval(interval);
              t1finished = true;
              counter = 0;

              // Ends the tournament
              return;
            }
            alert("Winners of Round " + roundCount + " are: " + roundWinners);
            counter = 0;
            roundCount++;
            playerArray = roundWinners;

            // Gets a random player
            player1 = random_player(playerArray);

            // Sets index of the chosen player in 'playerArray' array to null
            playerArray[playerArray.indexOf(player1)] = null;

            // Filters 'playerArray'
            playerArray = playerArray.filter(function (el) {
              return el != null;
            });

            // Gets a random player
            player2 = random_player(playerArray);
          }

          // Sets index of the chosen player in 'playerArray' array to null
          playerArray[playerArray.indexOf(player2)] = null;

          alert("Next match is Player " + player1 + " vs Player " + player2)
        } else {

          // Sets the position of the ball and paddle to their initial positions
          posX = 25;
          posY = 0;
          padposy = 0;
          pad2posy = 0;
          ball.css({
            "left": posX + "px",
            "top": posY + "px"
          })
          paddle.css({
            "top": padposy
          })

          paddle2.css({
            "top": pad2posy
          })
          paddle.css("backgroundColor", "red");
          paddle2.css("backgroundColor", "blue");

          // Ends the game
          clearInterval(interval);
        }
      }
    }, 10);

    // Return value of the winning player
    return winner;
  }

})
