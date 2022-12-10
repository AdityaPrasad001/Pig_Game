'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Selecting elements
const score0El = document.querySelector('#score--0');
// To select an element by Id's
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let totalScores, currentScore, activePlayer, isPlaying;

// Setting Staring condition;
function intialConditions() {
  // To store the Total score in an array.
  totalScores = [0, 0];
  // Current score
  currentScore = 0;
  // Setting active player
  activePlayer = 0;
  // is Playing
  isPlaying = true;
  // Set Total scores to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  // add hidden class to the dice
  diceEl.classList.add('hidden');

  // remove winners class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // Set current scores to zero
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Set player 1 as actve player
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
intialConditions();

// Switching the players
function switchPlayer() {
  // Setting the current score of the current player to zero before switching the players
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // Swtich to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    // 1.Generating the dice roll
    let diceRolled = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRolled);
    // 2.Display the rolled dice.
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRolled}.png`;
    // 3.Check for the rolled 1, if true switch to next player.
    if (diceRolled !== 1) {
      // Add dice to current score
      currentScore += diceRolled;
      // current0El.textContent = currentScore; // Change Later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch the players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    // 01) Add the current score to the total score
    totalScores[activePlayer] += currentScore; //totalScore[1] = totalScore[1] + currentScore;

    // To display it on the screen selecting the element by id
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];

    // 02)Check if the total score is >=100
    // if true: finish the game
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // else: switch the player
      switchPlayer();
    }
  }
});

// Restting the Game
btnNew.addEventListener('click', intialConditions);
