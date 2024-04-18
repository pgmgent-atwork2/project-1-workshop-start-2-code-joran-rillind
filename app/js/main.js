const bird = document.getElementById('bird');
const pipe = document.getElementById('pipe');

let birdTop = 250;
let gravity = 1.5;
let isJumping = false;
let gameSpeed = 10;
let pipeLeft = 400;

function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpInterval = setInterval(() => {
        if (birdTop <= 0) {
            clearInterval(jumpInterval);
            isJumping = false;
        } else {
            birdTop -= 5;
            bird.style.top = birdTop + 'px';
        }
    }, 20);
}

function fall() {
    let fallInterval = setInterval(() => {
        if (birdTop >= document.documentElement.clientHeight - 40) {
            clearInterval(fallInterval);
            gameOver();
        } else {
            birdTop += gravity;
            bird.style.top = birdTop + 'px';
        }
    }, 20);
}

function movePipe() {
    let pipeInterval = setInterval(() => {
        if (pipeLeft < -80) {
            pipeLeft = 400;
            pipe.style.height = Math.floor(Math.random() * 200) + 100 + 'px';
        } else {
            pipeLeft -= 5;
            pipe.style.left = pipeLeft + 'px';
        }
    }, gameSpeed);
}

function gameOver() {
    alert('Game Over!');
    window.location.reload(); 
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

movePipe();
fall();
