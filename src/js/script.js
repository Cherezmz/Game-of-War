//*
// * Define a Card class with the following properties:
//*
//* - suit(hearts, spades, clubs, diamonds)
// * - rank(Ace, 2, 3, 4, ..Jack, King, Queen)
//* - score(1, 2, 3, 4, ... 11, 12, 13)
//*
//* Define a Deck class with the following properties and methods:
//*
//* - length(the number of cards - should start at 52)
// * - cards(an array of cards in the deck)
//* - draw: return a random card from the cards array
//    *
//* When you create an instance of your Deck class (i.e.in your constructor),
//* fill in the cards array with 52 instances of your Card class.You can do
//* this with a nested for loop - first loop through an array of all possible
// * suits, then loop through an array of all possible ranks.Inside your inner
//   * loop, create an instance of your Card class and push it into the Deck's cards
//     * array.
//*
//* Instantiate an instance of your Deck and start drawing random cards!
// * /
//myDeck.cards = []


class Card {
    constructor(rank, suit, value) {
        this.rank = rank
        this.suit = suit
        this.value = value
    }
}

class Deck {
    constructor() {
        this.cards = []
        this.tempCards = []
        let ranks = [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
            "Ace"
        ]

        let suits = [
            "Heart",
            "Club",
            "Diamond",
            "Spade"
        ]

        for (let i = 0; i < ranks.length; i++) {
            for (let j = 0; j < suits.length; j++) {
                let rank = ranks[i]
                let suit = suits[j]
                let value = i

                this.cards.push(new Card(rank, suit, value))
            }
        }


    }

    moveOneCard(index) {
        console.log("moveOneCard(", index, ")")

    }

}


function moveOneCard2(d, index) {
    console.log(index)
    console.log(d)
    card = d.cards[index]
    console.log(card)
    d.tempCards.push(card)
    console.log(d)
    console.log(d.tempCards)
    d.cards.splice(index, 1)
    let l = d.cards.length
    console.log(l)
}




deck = new Deck()
moveOneCard2(deck, 0)

console.log("***************************")


deck.moveOneCard(8)

console.log("deck:")

console.log(deck)
console.log("deck.cards:")
console.log(deck.cards)

console.log(deck.cards[51])
foo = deck.cards
console.log(foo)
foo.pop(1)
console.log(deck)




console.log("66666666")



//do not know how to shuffle the deck. Tried Fisher–Yates shuffle
//and did smth wrong. 

//function shuffleDeck() {
//  var shaffleDeck = []
//for (let i = 0; i < 52; i++) {
//  var rndNo = Math.floor(Math.random() * i);
//var card = this.Card[i];
//this.Card[i] = this.Card.splice(rndNo, 1)[0];
//shuffleDeck.push(deck)

//  }
//return shuffleDeck;
//}



//I wanted to split the deck using slice and it does not work either
//deckFirstPlayer = deck.cards.splice(26, 52);
//deckSecondPlayer = deck.cards.splice(0, 26);
//console.log(deckFirstPlayer)
//console.log(deckSecondPlayer)

//now we should have 2 sets of cards 



//if shafling cards and splitting into two parts do not work,
//it is impossible to check if comparing of cards works.
//Anyway, the logic for comparing cards may be the following


//create two empty arrays where to put cards after each round
//let deckFirstPlayBegins = []
//let deckSecondPlayBegins = []

//create logic how to compare the cards. 
//may use do-while, where "while" is either deckFirstPlayBegins or deckSecondPlayBegins
//is less than 52 (total number of cards)
// in "do" we should use if-else statements and compare value of each card
//inside if-else we should use loops to try all the deck
// for tie/war situation need additional arrey to keep cards and then
// move card to the deck of won player 

//do {


//}
//while (deckFirstPlayBegins = 53 || deckSecondPlayBegins = 53)






