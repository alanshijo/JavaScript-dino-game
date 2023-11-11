let score = 0;
let cross = true;

const gameMusic = new Audio('assets/game-music.mp3');
const gameOver = new Audio('assets/game-over.wav');
const dinoClass = document.querySelector('.dino');
const obstacleClass = document.querySelector('.obstacle');
const gameTitle = document.querySelector('.game-title');
const gameStartTitle = document.querySelector('.game-title p');
const scoreTitle = document.querySelector('.game-score');

setTimeout(() => {
  gameMusic.play();
}, 700);

window.addEventListener('keydown', (e) => {
  if (gameTitle.innerHTML !== 'Game Over! - Reload to Play again') {
    if (e.key === 'ArrowUp' || e.keyCode === 38 || e.code === 'ArrowUp') {
      gameStartTitle.textContent = '';
      dinoClass.classList.add('dino-animation');
      obstacleClass.classList.add('obstacle-animation');
      setTimeout(() => {
        dinoClass.classList.remove('dino-animation');
      }, 700);
    }

    if (e.key === 'ArrowRight' || e.keyCode === 39 || e.code === 'ArrowRight') {
      const dinoX = parseInt(
        window.getComputedStyle(dinoClass, null).getPropertyValue('left')
      );
      dinoClass.style.left = dinoX + 120 + 'px';
    }

    if (e.key === 'ArrowLeft' || e.keyCode === 37 || e.code === 'ArrowLeft') {
      const dinoX = parseInt(
        window.getComputedStyle(dinoClass, null).getPropertyValue('left')
      );
      dinoClass.style.left = dinoX - 120 + 'px';
    }
  }
});

setInterval(() => {
  const dx = parseInt(
    window.getComputedStyle(dinoClass, null).getPropertyValue('left')
  );
  const dy = parseInt(
    window.getComputedStyle(dinoClass, null).getPropertyValue('top')
  );

  const ox = parseInt(
    window.getComputedStyle(obstacleClass, null).getPropertyValue('left')
  );
  const oy = parseInt(
    window.getComputedStyle(obstacleClass, null).getPropertyValue('top')
  );

  const offsetX = Math.abs(dx - ox);
  const offsetY = Math.abs(dy - oy);
  if (offsetX < 73 && offsetY < 52) {
    gameTitle.innerHTML = 'Game Over! - Reload to Play again';
    obstacleClass.classList.remove('obstacle-animation');
    gameOver.play();
    setTimeout(() => {
      gameOver.pause();
      gameMusic.pause();
    }, 1000);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      const aniDur = parseFloat(
        window
          .getComputedStyle(obstacleClass, null)
          .getPropertyValue('animation-duration')
      );
      const newDur = aniDur - 0.1;
      obstacleClass.style.animationDuration = newDur + 's';
    }, 500);
  }
}, 10);

function updateScore(score) {
  scoreTitle.innerHTML = 'Your Score: ' + score;
}
