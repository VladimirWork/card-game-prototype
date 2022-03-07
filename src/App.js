import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import {initialState, drawCard} from './GameLogic';

const cardGame = {
  setup: initialState,
  moves: {
    drawCard
  }
};

const App = Client({
  game: cardGame
});

export default App;
