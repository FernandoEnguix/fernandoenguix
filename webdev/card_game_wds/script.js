import Deck from "./deck.js"

const CARD_VALUE_MAP = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

//declarar acá las variables playerDeck y computerDeck hace que sean globales
//y entonces se puede acceder desde otros lugares de script.js 
//si no me equivoco 

let playerDeck, computerDeck, inRound, stop

//esto es para que "escuche" el click:
document.addEventListener("click", () => {
    if (stop) {
        startGame()
            //este return es para que NO haga el resto del bloque este, creo
        return
    }

    if (inRound) {
        cleanBeforeRound()
    } else {
        flipCards()
    }
})

startGame()

function startGame() {
    const deck = new Deck()
    deck.shuffle()

    //acá se usa Math.ceil por si el mazo es impar, ponele si
    //hay 51 cartas agarra 26 y 25
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)

    //slice va a permitir que cortemos parte del mazo
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
    inRound = false
    stop = false
    cleanBeforeRound()
        //console.log(playerDeck)
        //console.log(computerDeck)
}

function cleanBeforeRound() {
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""

    updateDeckCount()
}

function flipCards() {
    inRound = true

    //creo que estos dos nos darán la primera carta para cada uno:
    const computerCard = computerDeck.pop()
    const playerCard = playerDeck.pop()

    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    updateDeckCount()

    if (isRoundWinner(playerCard, computerCard)) {
        text.innerText = "Win"
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
    } else if (isRoundWinner(computerCard, playerCard)) {
        text.innerText = "Lose"
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else {
        text.innerText = "Draw"
        playerDeck.push(playerCard)
        computerDeck.push(computerCard)
    }

    if (isGameOver(playerDeck)) {
        text.innerText = "You lose!!"
            //variable "stop": permite hacer que el juego termine
        stop = true
    } else if (isGameOver(computerDeck)) {
        text.innerText = "You win!!"
        stop = true
    }
}

function updateDeckCount() {
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
    deck.numberOfCards === 0
}
//console.log(deck.cards)
//computerCardSlot.appendChild(deck.cards[0].getHTML())