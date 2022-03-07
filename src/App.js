import { Client } from 'boardgame.io/react';
import { initialState, drawCard, playCard } from './GameLogic';

const cardGame = {
  setup: initialState,
  moves: {
    drawCard, playCard
  }
};

const App = Client({
  game: cardGame
});

export default App;
