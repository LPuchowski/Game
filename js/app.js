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

  // Set the initial psition of the ball
  var posX = 0;
  var posY = 0;

  // Set ball direction
  var directionX = "+";
  var directionY = "+";

  // Gravity

  var gravity = 0.1;
  var gravityspeed = 0;

  var p = 0;
  var hit = false;
  var lastMoveHit = false;
  var counter = 0;

  $("#btn").click(function(){
    if (progRunning) {
      // Stop the ball
      progRunning = false;
      clearInterval(interval);
    } else {
      // Start the ball
      progRunning = true;
      interval = setInterval(function(){

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

        ball.css({
          "left": posX + "px",
          "top": posY + "px"
        })

        // Ball movement
        if (directionX === "+") {
          posX+=2;
        } else if (directionX === "-") {
          posX-=2;
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
          posX = 0;
          posY = 0;
        }

        if (ballRight > containerRight) {
          posX = 0;
          posY = 0;
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
      up = true;
    }
    if (event.keyCode === 87) {
      up2 = true;
    }
    if (event.keyCode === 40) {
      down = true;
    }
    if (event.keyCode === 83) {
      down2 = true;
    }
  });

  document.addEventListener('keyup', function release(event) {
    if (event.keyCode === 38) {
      up = false;
    }
    if (event.keyCode === 87) {
      up2 = false;
    }
    if (event.keyCode === 40) {
      down = false;
    }
    if (event.keyCode === 83) {
      down2 = false;
    }
  });


})
