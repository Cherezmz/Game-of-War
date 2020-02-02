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

        this.pushCard(new Card(rank, suit, value));
      }
    }
  }

  //return the length of the the deck
  length() {
    return this.cards.length;
  }

  //add one card to the bottm of the deck
  pushCard(card) {
    this.cards.push(card);
  }

  //add a deck to the bottom of this deck
  pushDeck(d) {
    // console.log("pushDeck: pushing ", d.length(), " cards");
    // d.dump();
    // for (let i = 0; i < deck.length(); i++) {
    //   card = deck.cards.shift();
    //   this.push(card);
    while (d.length() > 0) {
      //console.log("pushDeck length: ", d.length());
      let c = d.shiftCard();
      this.pushCard(c);
    }
  }
  shiftCard() {
    return this.cards.shift();
  }

  //remove one card from the top of this deck
  unshift(card) {
    return this.cards.unshift(card);
  }

  dump() {
    for (let i = 0; i < this.cards.length; i++) {
      console.log(
        "[",
        i,
        "]: ",
        this.cards[i].rank,
        this.cards[i].suit,
        this.cards[i].value
      );
    }
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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffleDeck(d) {
  //console.log("shuffleDeck: shuffling " + d.length() + " cards");
  //console.log("shuffleDeck d: ", d);

  tempDeck = new Deck();

  while (d.length() > 0) {
    //console.log("shuffleDeck: " + d.length());

    let r = getRandomInt(d.length());
    //let cards = d.cards.splice(0,1);
    let cards = d.cards.splice(r, 1);
    let c = cards[0];
    //console.log(x.rank, x.suit, x.value);
    //console.log(cards[0].rank);

    tempDeck.pushCard(c);
  }
  //console.log("shuffleDeck: tempDeck: ", tempDeck);
  //console.log("shuffleDeck: dump tempDeck:");
  //tempDeck.dump();

  d.pushDeck(tempDeck);
  //console.log("shuffleDeck end: " + d.length() + " cards");
}

function emptyDeck(d) {
  d.cards.splice(0, d.cards.length);
  d.tempCards.splice(0, d.tempCards.length);
}

function dealDeck(d, d1, d2) {
  while (d.length() > 0) {
    let card = d.shiftCard();
    d1.pushCard(card);

    card = d.shiftCard();
    d2.pushCard(card);

    // (i = 0; i < len / 2; i++) {
    //   card = d.cards.pop();
    //   d1.cards.push(card);
    //   card = d.cards.pop();
    //   d2.cards.push(card);
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

  //console.log("player 1: " + d1.length() + " cards; player 2: " + d2.length() + " cards");

  while (!isGameOver(d1, d2)) {
    card1 = d1.shiftCard();
    card2 = d2.shiftCard();
    pile.unshift(card1);
    pile.unshift(card2);

    console.log(
      "player 1 plays: " + card1.rank + " of " + card1.suit + "s (face up)"
    );
    console.log(
      "player 2 plays: " + card2.rank + " of " + card2.suit + "s (face up)"
    );
    // console.log(
    //   "player 1 plays: " + card1.rank + " of " + card1.suit + "s (face up)"
    // );
    // console.log(
    //   "player 2 plays: " + card2.rank + " of " + card2.suit + "s (face up)"
    // );
    if (card1.value > card2.value) {
      let num_cards = pile.length();
      d1.pushDeck(pile);
      console.log("player 1 wins this round; takes ", num_cards, " cards");
      console.log(
        "player 1 has " +
          d1.length() +
          " cards; player 2 has " +
          d2.length() +
          " cards"
      );
      // console.log("player 1 wins this round; takes ", pile.length(), " cards");
      // console.log(
      //   "player 1 has " +
      //     d1.length() +
      //     " cards; player 2 has " +
      //     d2.length() +
      //     " cards"
      // );
      break;
    } else if (card2.value > card1.value) {
      let num_cards = pile.length();
      d2.pushDeck(pile);
      console.log("player 2 wins this round; takes ", num_cards, " cards");
      console.log(
        "player 1 has " +
          d1.length() +
          " cards; player 2 has " +
          d2.length() +
          " cards"
      );
      // console.log("player 2 wins this round; takes ", pile.length(), " cards");
      // console.log(
      //   "player 1 has " +
      //     d1.length() +
      //     " cards; player 2 has " +
      //     d2.length() +
      //     " cards"
      // );
      break;
    } else {
      //cards are equal
      //each player must have at least 4 more cards to continue the game; if not the player who does not not have enough cards loses
      //if no player has 4 more cards and the players have the same number of cards remaining - it is a tie
      //for now player 1 takes both
      console.log("IT'S A WAR!");
      war_cards = 0;
      while (!isGameOver(d1, d2) && war_cards < 3) {
        card1 = d1.shiftCard();
        card2 = d2.shiftCard();
        pile.unshift(card1);
        pile.unshift(card2);
        console.log(
          "player 1 plays: " +
            card1.rank +
            " of " +
            card1.suit +
            "s (face down)"
        );
        console.log(
          "player 2 plays: " +
            card2.rank +
            " of " +
            card2.suit +
            "s (face down)"
        );
        war_cards++;
      }

      //if a player runs out of cards, the outer loop will catch it
      continue;
    }
  }
}
//returns true is one of the decks has no cards
function isGameOver(d1, d2) {
  if (d1.cards.length == 0 || d2.cards.length == 0) {
    return true;
  } else {
    return false;
  }
}

//returns 0 - no winner; 1 - player 1 is winner; 2 - player 2 is winner; 3 - a tie (both players have no cards)
function whoIsWinner(d1, d2) {
  if (d1.length() == 0 && d2.length() == 0) {
    return 3;
  }
  if (d2.length == 0) {
    return 1;
  }
  if (d1.length() == 0) {
    return 2;
  }
  return 0;
}

//create the deck to be dealt to the players
deck = new Deck();
deck.newDeck();
console.log("deck: ", deck.cards);
//shuffle the deck
shuffleDeck(deck);
console.log("after shuffle deck has ", deck.length(), " cards");
deck.dump();

console.log("***************************");

//create decks for each player
deck1 = new Deck();
deck2 = new Deck();
// console.log("deck1:", deck1);
// console.log("deck2:", deck2);

//emptyDeck(deck1);
//emptyDeck(deck2);
//console.log("deck1 after empty:", deck1);
//console.log("deck2 after empty:", deck2);

//deal the deck into deck1 and deck2
dealDeck(deck, deck1, deck2);
// console.log(deck, deck1, deck2);

//turn(deck1, deck2)
//console.log(deck1)
//console.log(deck2)

//emptyDeck(deck1)
//result = isGameOver(deck1, deck2)
//console.log(result)

round_num = 0;
while (!isGameOver(deck1, deck2)) {
  round_num++;
  console.log(
    "round ",
    round_num,
    ": player 1 has " +
      deck1.length() +
      " cards; player 2 has " +
      deck2.length() +
      " cards"
  );
  //need to limit the number of rounds
  turn(deck1, deck2);
  if (round_num > 1000) {
    break;
  }
}

winner = whoIsWinner(deck1, deck2);
if (winner == 0) {
  //problem
  console.log("ERROR: the game is over but we have no winner");
} else if (winner == 1) {
  console.log("Winner is player ", winner);
} else if (winner == 2) {
  console.log("Winner is player ", winner);
} else if (winner == 3) {
  console.log("it's a tie!");
} else {
  console.log("ERROR: unexpected value for winner: ", winner);
}

//deck.moveOneCard(8)

//console.log("deck:")

//console.log(deck)
//console.log("deck.cards:")
//console.log(deck.cards)

//console.log(deck.cards[51])
//foo = deck.cards
//console.log(foo)
//foo.pop(1)
//console.log(deck)

//console.log("66666666");

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
//deck1 = deck.cards.splice(26, 52);
//deck2 = deck.cards.splice(0, 26);
//console.log(deck1)
//console.log(deck2)

// console.log("Winner is player ", winner);

// deck.moveOneCard(8);

// console.log("deck:");

// console.log(deck);
// console.log("deck.cards:");
// console.log(deck.cards);

// console.log(deck.cards[51]);
// foo = deck.cards;
// console.log(foo);
// foo.pop(1);
// console.log(deck);

// console.log("66666666");
