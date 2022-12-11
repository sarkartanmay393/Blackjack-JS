let isAlive = false;
let globalMax = 15;
let globalSum = 0;

let message_el = document.getElementById("message_el");
let cards_el = document.getElementById("cards_el");
let sum_el = document.getElementById("sum_el");

let drawButton = document.getElementById("draw-btn");
let newButton = document.getElementById("new-btn");


let zero = 0;
let one = 0;
let second = 0;

// Connecting buttons with functions.
newButton.addEventListener("click", startNewGame);
drawButton.addEventListener("click", drawNewCard);


// To start a new game.
function startNewGame() {
    if (!isAlive) {
        isAlive = true;
        cards_el.textContent = "";

        let message = "";
        zero = getRandomCards(globalMax);
        one = getRandomCards(globalMax);

        globalSum = zero + one;

        setValuesInHTML();

        if (globalSum > 21) {
            message = "You're out of the game ❎";
            setTimeout(endGame, 2000);
        } else if (globalSum == 21) {
            message = "You got BlackJack ✅";
            setTimeout(endGame, 2000);
        } else {
            message = "Draw a new card 🆕";
            newButton.disabled = true;
            drawButton.disabled = false;
        }

        message_el.textContent = message;
        sum_el.textContent = globalSum;
    }
}

// To draw a new card.
function drawNewCard() {
    if (isAlive) {
        second = getRandomCards();
        globalSum += second;
        setValuesInHTML();

        if (globalSum == 21) {
            message_el.textContent = "You got BlackJack ♠️✅";
            drawButton.disabled = true;
            setTimeout(endGame, 2000);
        }

        if (globalSum > 21) {
            message_el.textContent = "You're out of the game ❎";
            drawButton.disabled = true;
            setTimeout(endGame, 2000);
        } else {
            message_el.textContent = "You're out of the game 🥲";
            drawButton.disabled = true;
            setTimeout(endGame, 2000);
        }
    }
}


// To get the value of cards.
function getRandomCards() {
    let newGuess = Math.floor(Math.random() * globalMax);

    if (newGuess <= 1) {
        return Math.floor(Math.random() * 5) >= 2.5 ? 1 : 11;
    } else if (newGuess >= 10) {
        return 10;
    } else if (newGuess < 10) {
        return newGuess;
    }

    return 0;
}


// To end game.
function endGame() {
    if (isAlive) {
        // if (globalSum < 21) {
        //     newButton.disabled = true;
        //     drawButton.disabled = false;
        //     message = "Draw a new card 🆕";
        //     message_el.textContent = message;
        // }

        message_el.textContent = "Want to start a new game ?";
        isAlive = false;
        drawButton.disabled = true;
        newButton.disabled = false;

        globalCards = [];
        globalSum = 0;
        zero = 0;
        one = 0;
        second = 0;

        cards_el.textContent = "";
        sum_el.textContent = 0;
    }
}

// Set cards in cards array.
function setValuesInHTML() {
    if (isAlive) {
        cards_el.textContent = "";
        sum_el.textContent = 0;
        let cards = [zero, one, second];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i] !== 0) { cards_el.textContent += cards[i]; }
            if (i !== 2) {

                cards_el.textContent += ", "
            }
        }
        sum_el.textContent = globalSum;
    }
}

// Runs at first
if (!window.sessionStorage.getItem("isExecuted")) {
    window.sessionStorage.setItem("isExecuted", true);

}