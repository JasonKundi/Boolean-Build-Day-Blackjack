import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const initialState = {
    playerHand: [],
    playerTotal: 0,
    opponentHand: [],
    opponentTotal: 0,
    deck: [],
  };

  const [game, setGame] = useState(initialState);

  const deckUrl =
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";

  const getCardValue = (card) => {
    // Q,K,J cards are given the number value 10
    // Ace is high (11) - the rest of the cards are parsed into numbers from their original string values
    if (
      card.value === "QUEEN" ||
      card.value === "KING" ||
      card.value === "JACK"
    ) {
      return 10;
    } else if (card.value === "ACE") {
      return 11;
    } else {
      return parseInt(card.value);
    }
  };

  const getHandValue = (cards) => {
    // for each card accessible within getCardValue
    // calculates the sum of values within the player and opponents arrays
    let cardTotal = 0;
    cards.forEach((card) => {
      getCardValue(card);
      cardTotal += cards;
      return cardTotal;
    });
  };

  // fetch gets deck back from the server and passes it into the newGame function as a parameter and
  // calls that function

  useEffect(() => {
    fetch(deckUrl)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        newGame(json);
      });
  }, []);

  const newGame = (json) => {
    // newGame draws 2 cards from the api and deals 1 card to 1 player and 1 to opponent
    // the fetch grabs 2 cards by it's deck_id which is defined in the deck object
    //it then assigns them cards in order into the correct array i.e card at position 0 goes into playerHand etc
    const newGameUrl = `https://www.deckofcardsapi.com/api/deck/${json.deck_id}/draw/?count=2`;
    fetch(newGameUrl)
      .then((res) => res.json())
      .then((drawJson) => {
        setGame({
          deck: json,
          playerHand: [drawJson.cards[0]],
          opponentHand: [drawJson.cards[1]],
        });
        getHandValue();
      });
  };

  console.log(game);

  const hit = () => {
    // The idea for hit is when the hit button is clicked, another card is drawn
    // and added to the players pile
    // this function creates a new copy of the state and updates the playerHand array in that object. It updates it
    // by also creating a copy of the original as well as adding on the new card to be drawn on top
    const hitUrl = `https://www.deckofcardsapi.com/api/deck/${game.deck.deck_id}/draw/?count=1`;
    fetch(hitUrl)
      .then((res) => res.json())
      .then((drawJson) => {
        setGame({
          ...game,
          playerHand: [...game.playerHand, drawJson.cards[0]],
        });
      }, []);
  };

  const stay = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <main id="gameBoard">
          <h2>Kundi Kasino</h2>
          <h3>Presents => BlackJack</h3>
          <div className="deck">{}</div>
          <div className="opponentHand">
            {game.opponentHand.map((card) => {
              return <img alt="opponentCard" src={card.image}></img>;
            })}
          </div>
          <div className="playerHand">
            {game.playerHand.map((card) => {
              return <img alt="playerCard" src={card.image}></img>;
            })}
          </div>
          <button onClick={hit}>Hit</button>
          <button onClick={stay}>Stay</button>
          <h3>Players Points: {getHandValue}</h3>
        </main>
      </header>
    </div>
  );
}

export default App;
