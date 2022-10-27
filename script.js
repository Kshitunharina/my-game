'use strict';
const diceImage = document.querySelector('.dice');
const diceBtn = document.querySelector('.btn--roll');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const hold = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');

diceImage.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0;

//roll dice
//show dice image
//show current score acording to the score
let activePlayer = 0;
let score = 0;
let holdValue = [0, 0];
let playing = true;
diceBtn.addEventListener('click', function () {
  if (playing) {
    let secretNumber = Math.trunc(Math.random() * 6 + 1);
    diceImage.src = `dice-${secretNumber}.png`;
    diceImage.classList.remove('hidden');

    score = score + secretNumber;
    if (secretNumber !== 1) {
      document.getElementById(`current--${activePlayer}`).textContent = score;
    } else {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      score = 0;
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    holdValue[activePlayer] = holdValue[activePlayer] + score;
    document.getElementById(`score--${activePlayer}`).textContent =
      holdValue[activePlayer];

    if (holdValue[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.getElementById(`name--${activePlayer}`).textContent =
        'you are the winner🎉🥇';
    } else {
      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
      score = 0;

      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    }
  }
});

newGame.addEventListener('click', function () {
  document.getElementById(`name--${activePlayer}`).textContent = 'player 1';
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  diceImage.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  holdValue = [0, 0];
  score = 0;
  activePlayer = 0;
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
});
