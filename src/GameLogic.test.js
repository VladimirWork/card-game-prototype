import { initialState, drawCard } from './GameLogic.js';

test('drawing a card', () => {
    let state_0 = initialState();
    let state_1 = drawCard(state_0);
    expect(state_0.player_0.deck).toEqual([0, 1, 2, 3]);
    expect(state_1.player_0.deck).toEqual([0, 1, 2]);
    expect(state_0.player_0.hand).toEqual([]);
    expect(state_1.player_0.hand).toEqual([3]);
});
