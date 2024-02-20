const gameScreen = document.querySelector("#game-screen");
const context = gameScreen.getContext("2d");

const reset = document.getElementById("reset-btn");
const block = 20;
let player = [{x: block * 2, y: block * 3}];
let food = {x: block * 5, y: block * 7};
let directionX = block;
let directionY = 0;
let score = 0;

let speed = 7;

const scoreDisplay = document.getElementById("score");


function drawPlayer() {
    context.fillStyle = "pink";
    context.strokeStyle = "white";
    context.lineWidth = 1;
    player.forEach(segment => {
        context.fillRect(segment.x, segment.y, block, block);
        context.strokeRect(segment.x, segment.y, block, block);
    });
    
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, block, block);
   
}

function generateFoodPosition() {
    food.x = Math.floor(Math.random() * (gameScreen.width / block)) * block;
    food.y = Math.floor(Math.random() * (gameScreen.height / block)) * block;
}

function draw() {
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);
    drawPlayer();
    drawFood(); 
}

function movePlayer() {
    const head = { x: player[0].x + directionX, y: player[0].y + directionY };
    
    
    if (player.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        gameStarted = false;
        return;
    }
    
    player.unshift(head);
    
    if (head.x < 0 || head.x > gameScreen.width || head.y < -block || head.y > gameScreen.height) {
        gameOver();
        gameStarted = false;
        console.log(head.x, head.y);
        return;
    }
    

    if (head.x === food.x && head.y === food.y) {
        generateFoodPosition();
        score++;
        scoreDisplay.textContent = score;
        if (score % 3 === 0) {
            speed++;
        }
    } else {
        player.pop();
    }
}



document.addEventListener("keydown", e => {
    if (e.key === "a" && directionX !== block) {
        directionX = -block;
        directionY = 0;
    } else if (e.key === "d" && directionX !== -block) {
        directionX = block;
        directionY = 0;
    } else if (e.key === "w" && directionY !== block) {
        directionX = 0;
        directionY = -block;
    } else if (e.key === "s" && directionY !== -block) {
        directionX = 0;
        directionY = block;
    }
});

function gameOver() {
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);

    context.fillStyle = "white";
    context.font = "30px Permanent Marker";
    context.fillText("Game Over", 50, 100);
    context.fillText("Your Score " + score, 50, 150);
   reset.style.display = "block"

 
    clearTimeout();


    // reset.addEventListener("click", () => {
    //   start();
    //   console.log("Button clicked");
    // })
}

let gameStarted = false;

// document.addEventListener("keydown", e => {
//     if (!gameStarted && (e.key === "a" || e.key === "d" || e.key === "w" || e.key === "s")) {
//         generateFoodPosition();
//         start();
//         gameStarted = true; 
//     }
// });

reset.addEventListener("click", () => {
    start();
    console.log("Reset");
    reset.style.display = "none";
});  


function start() {
    draw();
    movePlayer(); 
    gameInterval = setTimeout(start, 1500/speed);
    console.log(1000/speed);
    // setInterval(() => {
    //     movePlayer();
    //     draw(); 
    // }, speed);
}
