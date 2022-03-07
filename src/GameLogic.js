function initialState(ctx) {
    return {
        cards: ["one", "two", "three", "four", "five", "six", "seven", "eight"],
        player_0: {
            deck: [0, 1, 2, 3],
            hand: [],
            field: []
        },
        player_1: {
            deck: [4, 5, 6, 7],
            hand: [],
            field: []
        }
    };
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

function drawCard(currentState, ctx) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Add the last card in the player's deck to their hand.
    let deckIndex = currentPlayer.deck.length - 1;
    let hand = ImmutableArray.append(currentPlayer.hand, currentPlayer.deck[deckIndex]);
    // Remove the last card in the deck.
    let deck = ImmutableArray.removeAt(currentPlayer.deck, deckIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(currentState, playerId, {hand, deck});
}

function playCard(currentState, ctx, cardId) {
    let {currentPlayer, playerId} = getCurrentPlayer(currentState, ctx);
    // Find the card in their hand and add it to the field.
    let handIndex = currentPlayer.hand.indexOf(cardId);
    let field = ImmutableArray.append(currentPlayer.field, currentPlayer.hand[handIndex]);
    // Remove the card from their hand.
    let hand = ImmutableArray.removeAt(currentPlayer.hand, handIndex);
    // Construct and return a new state object with our changes.
    return constructStateForPlayer(currentState, playerId, {hand, field});
}

export { initialState, drawCard, playCard };
