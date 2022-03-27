import { Client } from 'boardgame.io/react';
import { initialState, drawCard, playCard, switchStage } from './GameLogic';
import GameRender from './GameRender';

const game = {
  setup: initialState,
  turn: {
    minMoves: 1,
    maxMoves: 1,
    stages: {
      A: { next: 'B' },
      B: { next: 'C' },
      C: { next: 'A' },
    }
  },
  phases: {
      draw: {
        moves: { drawCard, switchStage },
        start: true,
        endIf: (G, ctx) => ((G['player_0']['deck'].length + G['player_1']['deck'].length) <= 0),
        next: 'play'
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
