import { Client } from 'boardgame.io/react';
import { initialState, drawCard, playCard } from './GameLogic';
import GameRender from './GameRender';

const game = {
  setup: initialState,
  turn: { minMoves: 1, maxMoves: 1 },
  phases: {
    draw: {
      moves: { drawCard },
      start: true,
    },
    play: {
      moves: { playCard },
    },
  }
};

const App = Client({
  game: game,
  board: GameRender
});

export default App;
