    console.log("initializing game!");

    var mouse = input.Mouse(),
        keyboard = input.Keyboard(),
        elapsedTime = 0,
        lastTime = 0

    var paddle = graphics.Paddle({
        width : 100,
        height : 15,
        speed : 10,
    });

    var ball = graphics.Ball({
        position : {
            x : paddle.getPosition().x, 
            y : paddle.getPosition().y - paddle.getHeight()
           /* x : graphics.width() / 2 ,
            y : 10*/
        },
        radius : 4,
        velocity : 2,
        angle : 90
    });

    var bricks = [];
    var row = 1;
    var counter = 0;
    var rowHeight = paddle.getHeight() + 5;
    for(var i = 0; i < 112; i++){
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

    function collectInput(elapsedTime) {
        mouse.update(elapsedTime);
        keyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        graphics.clear();
        if(ball.getPosition().x - ball.getRadius() <= 0 || ball.getPosition().x + ball.getRadius() >= graphics.width() || ball.getPosition().y + ball.getRadius() <= 0 || ball.getPosition().y >= graphics.height()){
            var newAngle = 1-ball.getAngle();
           //ball.setPosition(300,550);
        }

        
        //Detect collision with bricks
        var ballRowPos = -1;
        for(var i = 8; i > 0; i--){
            if(((ball.getPosition().y + ball.getRadius() * 2) <= ((rowHeight + 2)* (i + 3)) && (ball.getPosition().y + ball.getRadius() * 2)>= (rowHeight + 2) * (i-3)) || 
                ((ball.getPosition().y - ball.getRadius() * 2) <= ((rowHeight + 2)* (i + 3)) && (ball.getPosition().y - ball.getRadius() * 2)>= (rowHeight + 2) * (i-3)))
                ballRowPos = i;
        }

        for(var i = 0; i < bricks.length;i++){
            if(bricks[i].getRow() === ballRowPos && ballRowPos == 4){
                console.log(bricks[i].getRow(),ballRowPos);
            }
        }

        //Detect collision with paddle



        ball.move();

       // gameStack[gameStack.length - 1].update(elapsedTime);
    }

    function render() {


        for(var i = 0; i < bricks.length; i++){
            bricks[i].draw();
        }

        ball.draw();
        paddle.draw();
        //gameStack[gameStack.length - 1].render();

    }

    function gameLoop(time) {
        elapsedTime = ((time - lastTime)/1000);
        lastTime = time;

        collectInput(elapsedTime);
        update(elapsedTime);
        render();

        requestAnimationFrame(gameLoop);
    }

    function initialize() {
        function onKeyDown(e){
            //Left
            if(e.keyCode == KeyEvent.DOM_VK_A || e.keyCode == KeyEvent.DOM_VK_LEFT){
                paddle.moveLeft();
            }
            //Right
            if(e.keyCode == KeyEvent.DOM_VK_D || e.keyCode == KeyEvent.DOM_VK_RIGHT){
                paddle.moveRight();
            }
        }

        document.addEventListener('keydown',onKeyDown,false);
        requestAnimationFrame(gameLoop);
    }

    return {

        initialize: initialize,
        gameStack: gameStack,
    };

