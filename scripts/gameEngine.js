/*jslint browser: true, white: true, plusplus: true */
/*global MyGame, console, KeyEvent, requestAnimationFrame, performance */
BreakoutGame.screens['play-game'] = (function(game, graphics, input, gameStack, persistence) {
    'use strict';

    console.log("initializing game");
    var keyboard = input.Keyboard(),
        elapsedTime = 0,
        gameOver = false,
        lastTime = 0,
        paddle,
        ball,
        bricks = [],
        lives,
        score,
        removedBricks,
        countdown,
        particleSystem;
    
    function initialize() { 
        loadElements();

        document.addEventListener('keydown',onKeyDown,false);  
    }

    function loadElements(){
        gameOver = false;
        
        removedBricks = 0;

        lives = graphics.Life({
            lives : 3
        });

        score = graphics.Score({
            score:0
        });

        countdown = graphics.Countdown({
        });

        paddle = graphics.Paddle({
            width : 100,
            height : 15,
            speed : 30
        });

        ball = graphics.Ball({
            position : {
                x : paddle.getPosition().x,
                y : paddle.getPosition().y - paddle.getHeight()
            },
            moving : false,
            radius : 4,
            velocity : 4
        });

        var row = 1,
            counter = 0;

        var rowHeight = paddle.getHeight() + 5;

        for(var i = 0; i < 14 * 8; i++){
            var color;
            if(counter == 14){
                row += 1
                counter = 0;
            }

            if(row == 1 || row == 2)
                color = "green";
            else if(row == 3 || row == 4)
                color = "blue";
            else if(row == 5 || row == 6)
                color = "orange";
            else
                color = "yellow";

            bricks.push(graphics.Brick({
                color : color,
                row : row,
                width : (graphics.width() - 26)/ 14,
                height : rowHeight,
                position : {
                    x : ((graphics.width() - 26) / 14 + 2) * counter,
                    y : (rowHeight + 2) * (row + 2)
                }                    
            }));

            counter++;
        }
    }

    function update(time){
        if(!countdown.getExpired()){
            countdown.update(time);
        }else{
            if(ball.launched()){
                ball.move();

                //Detect Ball/Paddle collision
                var ballPos = ball.getPosition();
                var paddlePos = paddle.getPosition();

                var distX = Math.abs(ballPos.x - paddlePos.x);
                var distY = Math.abs(ballPos.y - paddlePos.y);

                if(distX <= (paddle.getWidth() / 2 + ball.getRadius()) && distY <= (paddle.getHeight() / 2 + ball.getRadius())){
                    ball.bounce();
                }

                if(ballPos.y > paddlePos.y){
                    lives.removeLife();
                    ball.setPosition(paddlePos.x, paddlePos.y - paddle.getHeight());
                    ball.setAngle(0);
                    ball.setLaunched(false);
                    countdown.setStart(time);
                    countdown.setExpired(false);
                }

                if(lives.getLives() == 0){
                    gameOver = true;
                    BreakoutGame.persistence.add(score.getScore());
                }

                //Detect Ball/Brick collision
                var brickPos;

                for(var i = 0; i < bricks.length; i++){
                    brickPos = bricks[i].getPosition();

                    distX = Math.abs(ballPos.x - brickPos.x);
                    distY = Math.abs(ballPos.y - brickPos.y);

                    if(distX <= (bricks[i].getWidth() / 2 + ball.getRadius()) && distY <= (bricks[i].getHeight() / 2 + ball.getRadius())){
                        if(bricks[i].getColor() == 'yellow')
                            score.addScore(1);
                        if(bricks[i].getColor() == 'orange')
                            score.addScore(2);
                        if(bricks[i].getColor() == 'green')
                            score.addScore(5);
                        if(bricks[i].getColor() == 'blue')
                            score.addScore(3);

                        if(bricks[i].getRow() == 1 && !paddle.getBroken()){
                            paddle.setWidth(paddle.getWidth() / 2);
                            paddle.setBroken();
                        }

                        bricks.splice(i,1);
                        removedBricks++;

                        if(removedBricks == 4)
                            ball.setVelocity(ball.getVelocity() + 1);
                        if(removedBricks == 12)
                            ball.setVelocity(ball.getVelocity() + 1)
                        if(removedBricks == 36)
                            ball.setVelocity(ball.getVelocity() + 1)
                        if(removedBricks == 62)
                            ball.setVelocity(ball.getVelocity() + 1)

                        ball.bounce();
                    }
                }
            }
        }
    }

    function render(){
        graphics.clear();
        for(var i = 0; i < bricks.length; i++){
            bricks[i].draw();
        }

        ball.draw();
        paddle.draw();
        score.draw();
        lives.draw();

        if(!countdown.getExpired())
            countdown.draw();
    }

    //------------------------------------------------------------------
    //
    // This is the Game Loop function!
    //
    //------------------------------------------------------------------
    function gameLoop(time) {
        elapsedTime = (time / 1000);
        update(elapsedTime);
        render();

        if(gameOver){
            loadElements();
            game.showScreen('gameover');
        }else{
            requestAnimationFrame(gameLoop);
        }
    }
    
    function run() {
        console.log('New Game Started');
        //
        // Start the animation loop
        gameOver = false;
        countdown.setStart(performance.now() / 1000);
        //game.initialize();
        requestAnimationFrame(gameLoop);
    }
    
    function onKeyDown(e){
        if(countdown.getExpired()){
            //Left
            if(e.keyCode == KeyEvent.DOM_VK_A || e.keyCode == KeyEvent.DOM_VK_LEFT){
                paddle.moveLeft();
                if(!ball.launched()){
                    ball.setPosition(paddle.getPosition().x, ball.getPosition().y);
                }
            }
            //Right
            if(e.keyCode == KeyEvent.DOM_VK_D || e.keyCode == KeyEvent.DOM_VK_RIGHT){
                paddle.moveRight();

                if(!ball.launched()){
                    ball.setPosition(paddle.getPosition().x, ball.getPosition().y);
                }
            }

            //Launch Ball
            if(!ball.launched()){
                if(e.keyCode == KeyEvent.DOM_VK_SPACE){
                    ball.launch();
                }
            }
        }
    }

    return {
        initialize : initialize,
        run : run
    };
}(BreakoutGame.game, BreakoutGame.graphics, BreakoutGame.input, BreakoutGame.gameStack,BreakoutGame.persistence));