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
            deck: [0, 1],
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

function constructStateForPlayer(currentState, playerId, playerState) {
    let newPlayerState = Object.assign({}, currentState[playerId], playerState);
    return {...currentState, [playerId]: newPlayerState};
}

const ImmutableArray = {
    append(arr, value) {
        return [...arr, value];
    },
    removeAt(arr, index) {
        return [...arr.slice(0, index), ...arr.slice(index + 1)];
    }
};

function drawCard(G, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(G, ctx);
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = ImmutableArray.append(currentPlayer.hand, currentPlayer.deck[deckIndex]);
    // Remove the last card in the deck.
    let deck = ImmutableArray.removeAt(currentPlayer.deck, deckIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(G, playerId, {hand, deck});
}

function playCard(G, ctx, cardId) {
    let {currentPlayer, playerId} = getCurrentPlayer(G, ctx);
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let field = ImmutableArray.append(currentPlayer.field, currentPlayer.hand[handIndex]);
    // Remove the card from their hand.
    let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(G, playerId, {hand, field});
}

export { initialState, drawCard, playCard };
