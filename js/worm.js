const gameScreen = document.querySelector("#game-screen");
const context = gameScreen.getContext("2d");

//Setting up initial game variables
const play = document.getElementById("play");
const block = 20;
let player = [{ x: block * 2, y: block * 3 }];
let food = { x: block * 5, y: block * 7 };
let directionX = block;
let directionY = 0;
let score = 0;
let personalBestWorm = parseInt(localStorage.getItem("personalBestWorm")) || 0;
let speed = 7;

const eatingAudio = document.getElementById("eating");
const movementAudio = document.getElementById("movement");
const gameOverAudio = document.getElementById("gameOver");
const scoreDisplay = document.getElementById("score");

play.addEventListener("click", () => {
    console.log("Game started");
    play.style.display = "none";
    document.getElementById('game-container').classList.add('game-started');
});

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
    let validPosition = false;
    while (!validPosition) {
        const x = Math.floor(Math.random() * (gameScreen.width / block)) * block;
        const y = Math.floor(Math.random() * (gameScreen.height / block)) * block;
        //Check if the generated position is not occupied by the player
        if (!player.some(segment => segment.x === x && segment.y === y)) {
            food.x = x;
            food.y = y;
            validPosition = true;
        }
    }
}

function draw() {
    context.clearRect(0, 0, gameScreen.width, gameScreen.height);
    drawPlayer();
    drawFood();
}

function playEatingAudio() {
    eatingAudio.volume = 0.15;
    eatingAudio.play();
}

function playMovementAudio() {
    movementAudio.volume = 0.15;
    movementAudio.play();
}

function playGameOverAudio() {
    gameOverAudio.volume = 0.15;
    gameOverAudio.play();
}

function movePlayer() {
    const head = { x: player[0].x + directionX, y: player[0].y + directionY };
    // Collision with own body
    if (player.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    // Collision with walls
    if (head.x < 0 || head.x >= gameScreen.width || head.y < 0 || head.y >= gameScreen.height) {
        gameOver();
        return;
    }
    playMovementAudio();
    player.unshift(head);
    // Collision with food
    if (head.x === food.x && head.y === food.y) {
        playEatingAudio();
        generateFoodPosition();
        score++;
        scoreDisplay.textContent = score;
        if (score % 3 === 0) {
            updateSpeed(speed + 1);
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
    clearInterval(gameInterval);
    console.log("Game interval cleared");
    playGameOverAudio();
    if (score > personalBestWorm) {
        personalBestWorm = score;
        localStorage.setItem("personalBestWorm", personalBestWorm);
    }
    document.querySelector(".personal-best").textContent = personalBestWorm;
    document.getElementById('gameOver').style.display = 'block';
    document.getElementById('reset').style.display = 'block';
}

play.addEventListener("click", () => {
    start();
    console.log("Game started");
    play.style.display = "none";
});

function start() {

    gameInterval = setInterval(() => {
        movePlayer();
        draw();
    }, 1500 / speed);
    console.log(speed);
}

function updateSpeed(newSpeed) {
    speed = newSpeed;
    clearInterval(gameInterval);
    start();
}

function updatePersonalBestDisplay() {
    document.querySelector(".personal-best").textContent = personalBestWorm;
}

updatePersonalBestDisplay();