import { Client } from 'boardgame.io/react';
import { initialState, drawCard, playCard } from './GameLogic';
import GameRender from './GameRender';

const cardGame = {
  setup: initialState,
  moves: {
    drawCard, playCard
  }
};

const App = Client({
  game: cardGame,
  board: GameRender
});

export default App;
