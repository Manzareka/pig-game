'use strict';

// Selecting elements:
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let totalScores;
let currentScore;
let activePlayer;
let playing;

const initialization = function () {
  // Starting conditions: resett ing score/hiding dice:
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');

  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

initialization();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0; // score of the previous player becomes 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // switches to the second player;
  currentScore = 0; // score of the second player starts from 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality:
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1) Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2) Display dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;

    // 3) Check for rolled 1:
    if (dice !== 1) {
      // add dice to the current score:
      currentScore = currentScore + dice;

      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to sexond player:
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1) Add current score to active player's score;
    totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
    // totalScores [0 or 1] = totalScores [0 or 1] + currentScore

    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 2) Check if active player's score >=100; Finish the game

    if (totalScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // 3) Switch to second player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  initialization();
});
