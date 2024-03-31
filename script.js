'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

// Initial function
const initial = () => {
  // Overall score
  scores = [0, 0];

  // Starting score
  currentScore = 0;
  // Active Player
  activePlayer = 0; /*index base */

  // Check is playing
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  playing = true;
};

initial();

// Switch Player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Switch to other player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice
rollBtn.addEventListener('click', () => {
  if (playing) {
    const ranNum = Math.ceil(Math.random() * 6);

    //   Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${ranNum}.png`;

    if (ranNum !== 1) {
      currentScore += ranNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Button Hold
holdBtn.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if player's score >= 50
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// Reset
newBtn.addEventListener('click', initial);
