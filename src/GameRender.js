import React from 'react';

class GameRender extends React.Component {
    render() {
        // Get state references.
        const state = this.props.G;
        const ctx = this.props.ctx;
        const player = state["player_" + ctx.currentPlayer];
        // Create an array of <div> for each card in the player hand.
        const hand = player.hand.map(cardId => {
            let card = state.cards[cardId];
            return <div key={card.id} className={`card card-${card.proto.type}`}>
                <p>{card.proto.title}</p>
                <p>Power: {card.power || card.proto.power}</p>
                <p>Toughness: {card.toughness || card.proto.toughness}</p>
            </div>;
        });
        // Return the outer <div>. React will expand {hand} for us.
        return <div>{hand}</div>;
    }
}

export default GameRender;
