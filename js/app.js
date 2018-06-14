const icons = [
  'fa fa-anchor',
  'fa fa-anchor',
  'fa fa-bicycle',
  'fa fa-bicycle',
  'fa fa-bolt',
  'fa fa-bolt',
  'fa fa-bomb',
  'fa fa-bomb',
  'fa fa-cube',
  'fa fa-cube',
  'fa fa-diamond',
  'fa fa-diamond',
  'fa fa-leaf',
  'fa fa-leaf',
  'fa fa-paper-plane-o',
  'fa fa-paper-plane-o',
];

const cardsContainer = document.querySelector('.deck');
let openedCards = [];
let matchedCards = [];

function initializeGame() {
  let shuffleCards = shuffle(icons);
  for (let i = 0; i < icons.length; i++) {
    const card = document.createElement('li');
    card.classList.add('card');
    card.innerHTML = `<i class="${shuffleCards[i]}"></i>`;
    cardsContainer.appendChild(card);
    addEventListenerClick(card);
  }
}

let isFirstCardHidden = true;

function addEventListenerClick(card) {
  card.addEventListener('click', function() {
    if (isFirstCardHidden) {
      startTimer();
      isFirstCardHidden = false;
    }

    const currentCard = this;
    const previousCard = openedCards[0];

    if (openedCards.length === 1) {
      card.classList.add('open', 'show', 'disable');
      openedCards.push(this);
      compareCards(currentCard, previousCard);
    } else {
      currentCard.classList.add('open', 'show', 'disable');
      openedCards.push(this);
    }
  });
}

function compareCards(currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {
    currentCard.classList.add('match');
    previousCard.classList.add('match');
    matchedCards.push(currentCard, previousCard);
    openedCards = [];
    isGameOver();
  } else {
    setTimeout(function() {
      currentCard.classList.remove('open', 'show', 'disable');
      previousCard.classList.remove('open', 'show', 'disable');
    }, 500);
    openedCards = [];
  }
  addMoveCount();
}

function isGameOver() {
  if (matchedCards.length === icons.length) {
    stopTimer();
    alert('GAME OVER!');
  }
}

const movesContainer = document.querySelector('.moves');
let moves = 0;
movesContainer.innerHTML = 0;

function addMoveCount() {
  moves++;
  movesContainer.innerHTML = moves;
  setRating();
}

const starsContainer = document.querySelector('.stars');
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;

function setRating() {
  if (moves < 10) {
    starsContainer.innerHTML = star + star + star;
  } else if (moves < 15) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  }
}

const timerContainer = document.querySelector('.timer');
let liveTimer,
  totalSeconds = 0;

timerContainer.innerHTML = totalSeconds + ' Seconds';

function startTimer() {
  liveTimer = setInterval(function() {
    totalSeconds++;
    timerContainer.innerHTML = totalSeconds + ' Seconds';
  }, 1000);
}

function stopTimer() {
  clearInterval(liveTimer);
}

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', function() {
  cardsContainer.innerHTML = ''; // Delete all cards.
  initializeGame();
  resetGameValues();
});

function resetGameValues() {
  isFirstCardHidden = true;
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  starsContainer.innerHTML = star + star + star;
  stopTimer();
  timerContainer.innerHTML = totalSeconds + ' Seconds';
  totalSeconds = 0;
}

// https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

initializeGame();
