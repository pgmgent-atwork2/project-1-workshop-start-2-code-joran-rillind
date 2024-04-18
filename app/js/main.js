const bird = document.getElementById('bird');
const pipe1 = document.getElementById('pipe1');
const pipe2 = document.getElementById('pipe2');

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        flap();
    }
});

let isJumping = false;
let isGameOver = false;
let gameSpeed = 15;
let pipeLeft = 1500;
let gravity = 0.2;
let velocity = 0;
let position = 250;

function flap() {
    velocity = -5;
}

function gameLoop() {
    velocity += gravity;
    position += velocity;
    if (position >= 875) {
        position = 875;
        velocity = 0;
        isJumping = false;
    }
    bird.style.top = position + 'px';

    if (isColliding(bird, pipe1) || isColliding(bird, pipe2) || position === 875 || position === 0) {
        gameOver();
    }
    
    requestAnimationFrame(gameLoop);
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.left > rect2.right
    );
}

function movePipe(pipe) {
    let pipeInterval = setInterval(() => {
        if (pipeLeft < -80) {
            pipeLeft = 1500;
            pipe.style.height = Math.floor(Math.random() * 200) + 100 + 'px'; 
        } else {
            pipeLeft -= 5;
            pipe.style.left = pipeLeft + 'px';
        }
    }, gameSpeed);
}

function gameOver() {
    isGameOver = true;
    alert('Game Over!');
    resetGame();
}

function resetGame() {
    position = 250;
    velocity = 0;
    pipeLeft = 1500;
    bird.style.top = '0px';
    isGameOver = false;
}

movePipe(pipe1);
movePipe(pipe2);
gameLoop();
