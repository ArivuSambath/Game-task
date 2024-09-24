const cardsArray = [
  { name: "A", img: "A" },
  { name: "B", img: "B" },
  { name: "C", img: "C" },
  { name: "D", img: "D" },
  { name: "E", img: "E" },
  { name: "F", img: "F" },
  { name: "G", img: "G" },
  { name: "H", img: "H" },
];



// Duplicate cards for matching pairs
let gameCards = [...cardsArray, ...cardsArray];

// Shuffle the cards
gameCards = gameCards.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("game-board");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;

// Create cards on the game board
gameCards.forEach((card, index) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.dataset.name = card.name;

  cardElement.addEventListener("click", () => flipCard(cardElement));
  gameBoard.appendChild(cardElement);
});

function flipCard(card) {
  if (firstCard && secondCard) return; // Prevent flipping more than 2 cards at once

  card.classList.add("flipped");
  card.textContent = card.dataset.name;

  if (!firstCard) {
    firstCard = card;
  } else if (firstCard !== card) {
    secondCard = card;
    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.name === secondCard.dataset.name) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    flippedCards += 2;
    resetCards();
    if (flippedCards === gameCards.length) {
      setTimeout(() => alert("You won!"), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.textContent = "";
      secondCard.textContent = "";
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;
}


function initGame() {
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  const shuffledCards = shuffle([...cardsArray]);
  shuffledCards.forEach((cardValue) => {
    gameBoard.appendChild(createCard(cardValue));
  });
}

restartButton.addEventListener("click", initGame);

initGame();
