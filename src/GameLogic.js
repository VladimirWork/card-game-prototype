import CardPrototypes from './CardPrototypes.json';

function initialState(ctx, state) {
    let cardId = 0;
    let cards = [];
    for (let duplicate = 0; duplicate < 4; duplicate++) {
        for (let index = 0; index < CardPrototypes.length; index++) {
            cards.push({
                id: cardId++,
                proto: CardPrototypes[index]
            });
        }
    }

    let initialState = state || {
        player_0: {
            deck: [0, 1, 2],
            hand: [],
            field: [],
            trash: []
        },
        player_1: {
            deck: [0, 1],
            hand: [],
            field: [],
            trash: []
        },
        cards
    };

    return initialState;
}

function getCurrentPlayer(state, ctx) {
    let playerId = "player_" + ctx.currentPlayer;
    let currentPlayer = state[playerId];
    return {currentPlayer, playerId};
}

function drawCard(G, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(G, ctx);
    currentPlayer.hand.push(currentPlayer.deck.pop());
}

function playCard(G, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(G, ctx);
    currentPlayer.field.unshift(currentPlayer.hand.shift());
}

export { initialState, drawCard, playCard };
