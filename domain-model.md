# Boolean-Build-Day-Blackjack

state 

- suits [clubs, spades, diamonds, hearts]
- values [2,3,4,5,6,7,8,9,10, Jack, Queen, King, Ace]
- card deck API?


methods/functions
- newGame() - newgame function adds one visible card to player deck and one to opponents!
            - shuffles deck?
            -

- hit() - button adds card to player pile
        - if {handValue > 21 return "Bust"}
        - Ace = 1 || 11 
        - Ace value is determined by whether the high value (11) Ace would make the total bust out when adding to the pile - if {handValue + Ace > 21} Ace = 1

- stay() - ends the players turn
         - triggers endgame


-endgame() - compares both players values, closest to 21 wins the game

- shuffle() - operation to shuffle the deck to avoid the same order of cards being drawn from the main deck every time. This can possibly be handled by the API though