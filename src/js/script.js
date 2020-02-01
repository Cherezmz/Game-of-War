// version 1.1: improved turn() function
//              added methods to class Deck

class Card {
  constructor(rank, suit, value) {
    this.rank = rank;
    this.suit = suit;
    this.value = value;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.tempCards = [];
  }

  newDeck() {
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
    ];

    let suits = ["Heart", "Club", "Diamond", "Spade"];

    for (let i = 0; i < ranks.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        let rank = ranks[i];
        let suit = suits[j];
        let value = i;

        this.push(new Card(rank, suit, value));
      }
    }
  }

  //return the lenght of the the deck
  length() {
    return this.cards.length;
  }

  //add one card to the bottm of the deck
  push(card) {
    this.cards.push(card);
  }

  //add a deck to the bottom of this deck
  pushDeck(deck) {
    for (let i = 0; i < deck.length(); i++) {
      card = deck.cards.shift();
      this.push(card);
    }
  }

  //remove one card from the top of this deck
  unshift(card) {
    return this.cards.unshift(card);
  }

  moveOneCard(index) {
    console.log("moveOneCard(", index, ")");
  }
}

function moveOneCard2(d, index) {
  //console.log(index)
  //console.log(d)
  card = d.cards[index];
  //console.log(card)
  d.tempCards.push(card);
  //console.log(d)
  //console.log(d.tempCards)
  d.cards.splice(index, 1);
  let l = d.cards.length;
  //console.log(l)
  //console.log(d.cards)
}

function dummyShuffle(d) {
  console.log("dummyShuffle begin");
  //to be sure that tempCards is empty
  d.tempCards.splice(0, d.tempCards.length);
  len = d.cards.length;
  for (i = 0; i < 52; i++) {
    moveOneCard2(d, 0);
    //moveOneCard2(d, d.cards.length - 1)
  }

  //console.log(d.cards.length);
  for (i = 0; i < len; i++) {
    d.cards.push(d.tempCards[i]);
  }
  //console.log(d.cards.length);
  //console.log(d.cards);

  //console.log(d.tempCards);

  d.tempCards.splice(0, d.tempCards.length);
  //console.log("empty:", d.tempCards);

  //console.log("****************************");
  console.log("dummyShuffle end");
}

function emptyDeck(d) {
  d.cards.splice(0, d.cards.length);
  d.tempCards.splice(0, d.tempCards.length);
}

function deal(d, d1, d2) {
  len = d.cards.length;
  for (i = 0; i < len / 2; i++) {
    card = d.cards.pop();
    d1.cards.push(card);
    card = d.cards.pop();
    d2.cards.push(card);
  }
}

//very dumb way to do a turn (for debug): player 1 always takes both cards
function turn_debug1(d1, d2) {
  card1 = d1.cards.shift();
  card2 = d2.cards.shift();
  d1.cards.push(card1);
  d1.cards.push(card2);
}

//very dumb way to do a turn (for debug): player 1 always takes both cards
function turn(d1, d2) {
  pile = new Deck();

  //turn_debug1(d1, d2);

  console.log(
    "player 1: " + d1.length() + " cards; player 2: " + d2.length() + " cards"
  );

  while (!isGameOver(deck1, deck2)) {
    card1 = d1.cards.shift();
    card2 = d2.cards.shift();
    pile.unshift(card1);
    pile.unshift(card2);

    console.log("1: " + card1.rank + " of " + card1.suit);
    console.log("2: " + card2.rank + " of " + card2.suit);

    if (card1.value > card2.value) {
      //player 1 takes 2 cards
      d1.pushDeck(pile);
      break;
    } else if (card2.value > card1.value) {
      //player 2 takes 2 cards

      d2.pushDeck(pile);
      break;
    } else {
      //cards are equal
      //each player must have 4 more cards; if not the player who does not not have enough cards loses

      //for now player 1 takes both
      d1.pushDeck(pile);
      break;
    }
  }
}

function isGameOver(d1, d2) {
  if (d1.cards.length == 0 || d2.cards.length == 0) {
    return true;
  } else {
    return false;
  }
}

function whoIsWinner(d1, d2) {
  if (d1.cards.length == 0) {
    return 2;
  }
  if (d2.cards.length == 0) {
    return 1;
  }
  return 0;
}

//create the deck to be dealt to the players
deck = new Deck();
deck.newDeck();
//moveOneCard2(deck, 0)

//shuffle the deck
dummyShuffle(deck);

console.log("***************************");

//create decks for each player
deck1 = new Deck();
deck2 = new Deck();
console.log("deck1:", deck1);
console.log("deck2:", deck2);

//emptyDeck(deck1);
//emptyDeck(deck2);
//console.log("deck1 after empty:", deck1);
//console.log("deck2 after empty:", deck2);

//deal the deck into deck1 and deck2
deal(deck, deck1, deck2);
console.log(deck, deck1, deck2);

//turn(deck1, deck2)
//console.log(deck1)
//console.log(deck2)

//emptyDeck(deck1)
//result = isGameOver(deck1, deck2)
//console.log(result)

turn_num = 0;
while (!isGameOver(deck1, deck2)) {
  turn_num++;
  console.log("turn :", turn_num);

  turn(deck1, deck2);
}

winner = whoIsWinner(deck1, deck2);

console.log("Winner is player ", winner);

deck.moveOneCard(8);

console.log("deck:");

console.log(deck);
console.log("deck.cards:");
console.log(deck.cards);

console.log(deck.cards[51]);
foo = deck.cards;
console.log(foo);
foo.pop(1);
console.log(deck);

console.log("66666666");
