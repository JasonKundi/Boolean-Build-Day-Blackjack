import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const initialState = {
    playerHand: [],
    opponentHand: [],
    deck: [],
  };

  const deckUrl =
    "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6";
  console.log("hello");

  const [game, setGame] = useState(initialState);

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
    fetch(
      `https://www.deckofcardsapi.com/api/deck/${json.deck_id}/draw/?count=2`
    )
      .then((res) => res.json())
      .then((drawJson) => {
        setGame({
          deck: json,
          playerHand: [drawJson.cards[0]],
          opponentHand: [drawJson.cards[1]],
        });
        console.log(drawJson);
      });
  };

  console.log(game);

  const hit = (json) => {
    // The idea for hit is when the hit button is clicked, another card is drawn
    // and added to the players pile
    fetch(
      `https://www.deckofcardsapi.com/api/deck/${json.deck_id}/draw/?count=1`
    )
      .then((res) => res.json())
      .then((drawJson) => {
        console.log(drawJson);
      });
  };
  const stay = () => {};

  // renderCard=()=>{
  //   return (
  //
  //   )
  // }
  return (
    <div className="App">
      <header className="App-header">
        <main id="gameBoard">
          <h2>Kundi Kasino</h2>
          <div className="deck">{}</div>
          <div className="playerHand">
            {game.playerHand.map((card) => {
              return <img alt="playerCard" src={card.image}></img>;
            })}
          </div>
          <div className="opponentHand">
            {game.opponentHand.map((card) => {
              return <img alt="opponentCard" src={card.image}></img>;
            })}
          </div>
          <button onClick={hit()}>Hit</button>
          <button onClick={stay}>Stay</button>
        </main>
      </header>
    </div>
  );
}

export default App;
