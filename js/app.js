$(function(){

  var interval;
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
  var filtered;

  Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
      if(this[i] !== this[0]) {
        return false;
      }
    }
    return true;
  }

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
    playGame("1", "2");
  })

  $("#tournament").click(function(){
    var players = prompt("How many players? Please enter an even number");
    while (!(players === 0 || !!(players && !(players%2)))) {
      players = prompt("You need to enter an even number. How many players?");
    }
    console.log(players);
    var playerArray = new Array(parseInt(players));
    console.log(playerArray);
    for (var i = 0; i < parseInt(players); i++) {
      playerArray[i] = i + 1;
    }
    function random_item(items) {
      return items[Math.floor(Math.random()*items.length)];
    }
    var player1 = random_item(playerArray);
    do {
      var player2 = random_item(playerArray);
    } while (player1 == player2);

    playerArray[player1-1] = null;
    playerArray[player2-1] = null;

    var round1Winners = new Array(playerArray.length/2);
    var count = 0;

    alert("First match is Player " + player1 + " vs Player " + player2);

    playGame(player1, player2);
  })

  $("#tournament").click(function(){
    var players = prompt("How many players? Please enter an even number");
    while (!(players === 0 || !!(players && !(players%2)))) {
      players = prompt("You need to enter an even number. How many players?");
    }
    console.log(players);
    var playerArray = new Array(parseInt(players));
    console.log(playerArray);
    for (var i = 0; i < parseInt(players); i++) {
      playerArray[i] = i + 1;
    }
    function random_item(items) {
      return items[Math.floor(Math.random()*items.length)];
    }
    var player1 = random_item(playerArray);
    do {
      var player2 = random_item(playerArray);
    } while (player1 == player2);

    playerArray[player1-1] = null;
    playerArray[player2-1] = null;

    var round1Winners = new Array(playerArray.length/2);
    var count = 0;

    alert("First match is Player " + player1 + " vs Player " + player2);

    if (progRunning) {
      // Stop the ball
      progRunning = false;
      clearInterval(interval);
    } else {
      // Start the ball
      progRunning = true;
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
          //console.log("going up");
        }

        if (down) {
          if (padposy <= 239) {
            padposy += 3;
          }
          //console.log("going down");
        }

        if (up2) {
          if (pad2posy >= 3) {
            pad2posy -= 3;
          }
          //console.log("2 going up");
        }

        if (down2) {
          if (pad2posy <= 239) {
            pad2posy += 3;
          }
          //console.log("2 going down");
        }

        // Ball movement
        if (directionX === "+") {
          posX+=4;
        } else if (directionX === "-") {
          posX-=4;
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
          //console.log("Paddle contact");
        }

        if (ballTop == paddle2Top) {
          //console.log("equal");
        }

        if (ballRight >= paddle2Left && ballTop < paddle2Bottom && ballBottom > paddle2Top) {
          // lastMoveHit = true;
          directionX = "-";
          //console.log("Paddle 2 contact");
        }

        if (ballRight > containerRight) {
          console.log("Hello");
          score1++;
          $("#scr1").html("Score 1: " + score1);
          posX = 550;
          posY = 0;
          directionX = "-";
          directionY = "+";
          gravity = 0.05;
          gravityspeed = 0;
        }

        if (ballLeft < containerLeft) {
          score2++;
          $("#scr2").html("Score 2: " + score2);
          posX = 25;
          posY = 0;
          directionX = "+";
          directionY = "+";
          gravity = 0.05;
          gravityspeed = 0;
        }

        if(score1 == 1) {
          console.log("Player " + player1 + " has won!");
          winner = player1;
          // alert("Player 1 has won!");
          //prompt("Please enter your name", "Harry Potter");
        } else if (score2 == 1) {
          console.log("Player " + player2 + " has won!");
          winner = player2;
          // alert("Player2 has won!")
          //prompt("Please enter your name", "Harry Potter");
        }

        if(winner != null) {

          alert("Winner is Player " + winner);
          round1Winners[count] = winner;
          count++;
          console.log(playerArray);
          console.log(round1Winners);
          score1 = 0;
          score2 = 0;
          $("#scr1").html("Score 1: " + score1);
          $("#scr2").html("Score 2: " + score2);
          if (roundCount > 1) {
            filtered = filtered.filter(function (el) {
              return el != null;
            });
          } else {
            filtered = playerArray.filter(function (el) {
              return el != null;
            });
          }
          console.log("Filtered is " + filtered);
          player1 = random_item(filtered);
          filtered[filtered.indexOf(player1)] = null;
          filtered = filtered.filter(function (el) {
            return el != null;
          });
          player2 = random_item(filtered);
          console.log(filtered);
          console.log(playerArray);
          winner = null;
          if (playerArray.allValuesSame()){
            alert("Round " + roundCount + " Finished!");
            alert("Winners of Round " + roundCount + " are: " + round1Winners);
            count = 0;
            roundCount++;
            playerArray = round1Winners;
            player1 = random_item(playerArray);
            playerArray[playerArray.indexOf(player1)] = null;
            filtered = playerArray.filter(function (el) {
              return el != null;
            });
            player2 = random_item(filtered);
            playerArray[playerArray.indexOf(player2)] = null;
            filtered = playerArray.filter(function (el) {
              return el != null;
            });
            roundBegin = true;

          }
          // for (var i = 0; i < playerArray.length; i++) {
          //   if (playerArray[i] != null) {
          //     round1Finished = false;
          //   }
          // }
          if (roundBegin == false) {
            playerArray[playerArray.indexOf(player1)] = null;
            playerArray[playerArray.indexOf(player2)] = null;
          }
          roundBegin = false;
          alert("Starting next game: Player " + player1 + " vs " + player2);
        }

        // console.log(i + " seconds");
        // i++;
      }, 10);
    }
  })

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

  function playGame(player1, player2) {
    if (progRunning) {
      // Stop the ball
      progRunning = false;
      clearInterval(interval);
    } else {
      // Start the ball
      progRunning = true;
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
          console.log("going up");
        }

        if (down) {
          if (padposy <= 239) {
            padposy += 3;
          }
          console.log("going down");
        }

        if (up2) {
          if (pad2posy >= 3) {
            pad2posy -= 3;
          }
          console.log("2 going up");
        }

        if (down2) {
          if (pad2posy <= 239) {
            pad2posy += 3;
          }
          console.log("2 going down");
        }

        // Ball movement
        if (directionX === "+") {
          posX+=4;
        } else if (directionX === "-") {
          posX-=4;
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
          console.log("Paddle contact");
        }

        if (ballTop == paddle2Top) {
          console.log("equal");
        }

        if (ballRight >= paddle2Left && ballTop < paddle2Bottom && ballBottom > paddle2Top) {
          // lastMoveHit = true;
          directionX = "-";
          console.log("Paddle 2 contact");
        }

        if (ballRight > containerRight) {
          score1++;
          console.log("Hello");
          $("#scr1").html("Score 1: " + score1);
          posX = 550;
          posY = 0;
          directionX = "-";
          directionY = "+";
          gravity = 0.05;
          gravityspeed = 0;
        }

        if (ballLeft < containerLeft) {
          score2++;
          $("#scr2").html("Score 2: " + score2);
          posX = 25;
          posY = 0;
          directionX = "+";
          directionY = "+";
          gravity = 0.05;
          gravityspeed = 0;
        }

        if(score1 == 1) {
          winner = player1;
          alert("The winner is Player 1");
          clearInterval(interval);
          //alert("Player 1 has won!");
          //prompt("Please enter your name", "Harry Potter");
        } else if (score2 == 1) {
          winner = player2;
          alert("The winner is Player 2");
          clearInterval(interval);
          //alert("Player2 has won!")
          //prompt("Please enter your name", "Harry Potter");
        }

        // console.log(i + " seconds");
        // i++;
      }, 10);
    }
  }


})
