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

  var paddle = $("#pad");
  var paddle2 = $("#pad2");

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
  var roundCount = 1;
  var roundBegin = false;
  var filtered = [0];
  var tournament = false;
  var playerArray;
  var round1Winners;
  var t1finished = false;
  var speed = 2;
  var scoreCap = 0;

  Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
      if(this[i] !== this[0]) {
        return false;
      }
    }
    return true;
  }


  var up = false;
  var down = false;
  var up2 = false;
  var down2 = false;

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

  $("#single").click(function(){
    while(paddle1Color != "1" && paddle1Color != "2" && paddle1Color != "3" && paddle1Color != "4" && paddle1Color != "5") {
      var paddle1Color = prompt("Player 1, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }

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
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    scoreCap = parseInt(scoreCap);
    playGame("1", "Computer");

  })

  $("#btn").click(function(){
    while(paddle1Color != "1" && paddle1Color != "2" && paddle1Color != "3" && paddle1Color != "4" && paddle1Color != "5") {
      var paddle1Color = prompt("Player 1, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }
    while(paddle2Color != "1" && paddle2Color != "2" && paddle2Color != "3" &&    paddle2Color != "4" && paddle2Color != "5") {
      var paddle2Color = prompt("Player 2, choose your paddle colour: 1) Red, 2) Yellow, 3) Blue, 4) Orange, 5) Purple");
    }
    switch (paddle1Color) {
      case "1": paddle1Color = "Red"; break;
      case "2": paddle1Color = "Yellow"; break;
      case "3": paddle1Color = "Blue"; break;
      case "4": paddle1Color = "Orange"; break;
      case "5": paddle1Color = "Purple"; break;
      default: break;
    }
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
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    scoreCap = parseInt(scoreCap);
    playGame("1", "2");
    counter = 0;
  })

  $("#tournament").click(function(){
    tournament = true;
    var players = prompt("How many players? Please enter an even number");
    while (!(players === 0 || (players && !(players%2)))) {
      players = prompt("You need to enter an even number. How many players?");
    }
    playerArray = new Array(parseInt(players));

    for (var i = 0; i < parseInt(players); i++) {
      playerArray[i] = i + 1;
    }

    var player1 = random_player(playerArray);
    do {
      var player2 = random_player(playerArray);
    } while (player1 == player2);

    round1Winners = new Array(playerArray.length/2);

    playerArray[player1-1] = null;
    playerArray[player2-1] = null;

    var count = 0;

    alert("First match is Player " + player1 + " vs Player " + player2);

    scoreCap = 0;
    while (scoreCap < 3 || scoreCap > 9) {
      scoreCap = prompt("Please enter the number of points needed to win (3 minimum, 9 maximum)");
    }
    scoreCap = parseInt(scoreCap);

    playGame(player1, player2);
  })

  function random_player(players) {
    return players[Math.floor(Math.random()*players.length)];
  }

  function playGame(player1, player2) {
    if (progRunning) {
      // Stop the ball
      progRunning = false;
      clearInterval(interval);
    } else {
      // Start the ball
      // progRunning = true;
      interval = setInterval(function(){

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

        paddle.css({
          "top": padposy
        })

        paddle2.css({
          "top": pad2posy
        })

        if (up) {
          if (padposy >= 3) {
            padposy -= 3;
          }
        }

        if (down) {
          if (padposy <= 239) {
            padposy += 3;
          }
        }

        if (player2 == "Computer") {
          if (paddle2Top > ballTop - 8) {
            pad2posy -= 3;
          } else if (paddle2Top < ballTop + 8) {
            pad2posy += 3;
          }
        } else {
          if (up2) {
            if (pad2posy >= 3) {
              pad2posy -= 3;
            }
          }

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

        if (ballTop == paddle2Top) {
        }

        if (ballRight >= paddle2Left && ballTop < paddle2Bottom && ballBottom > paddle2Top) {
          directionX = "-";
          if (speed != 8) {
            speed+=0.25;
          }
        }

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

        if(score1 == scoreCap || score2 == scoreCap) {
          if (score1 == scoreCap) {
            winner = player1;
          } else {
            winner = player2;
          }
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
          alert("The winner is Player " + winner);
          if (tournament == true && winner != null) {
            round1Winners[counter] = winner;
            counter++;
            playerArray = playerArray.filter(function (el) {
              return el != null;
            });
            player1 = random_player(playerArray);
            playerArray[playerArray.indexOf(player1)] = null;
            playerArray = playerArray.filter(function (el) {
              return el != null;
            });
            player2 = random_player(playerArray);
            winner = null;

            if (playerArray.length == 0){
              if (roundCount > 1) {
                round1Winners.length = round1Winners.length / 2;
              }
              alert("Round " + roundCount + " Finished!");
              if (round1Winners.length == 1) {
                alert("Player " + round1Winners[0] + " wins the tournament!");
                posX = 25;
                posY = 0;
                round1Winners.shift();
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
                return;
              }
              alert("Winners of Round " + roundCount + " are: " + round1Winners);
              counter = 0;
              roundCount++;
              playerArray = round1Winners;
              player1 = random_player(playerArray);
              playerArray[playerArray.indexOf(player1)] = null;
              playerArray = playerArray.filter(function (el) {
                return el != null;
              });
              player2 = random_player(playerArray);
              roundBegin = true;
            }

            playerArray[playerArray.indexOf(player2)] = null;

            alert("Next match is Player " + player1 + " vs Player " + player2)
          } else {
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
            clearInterval(interval);
          }
        }
      }, 10);
      return winner;
    }
  }

})
