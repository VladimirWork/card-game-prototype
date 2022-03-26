import React from 'react';

class GameRender extends React.Component {
    render() {
        // Get state references.
        const state = this.props.G;
        const ctx = this.props.ctx;
        const player1 = state["player_0"];
        const player2 = state["player_1"];
        const styles = {
            splitScreen: {
                display: 'flex',
                flexDirection: 'column',
                width: window.outerWidth,
                height: window.outerHeight * 0.91,
            },
            topPane: {
                display: 'flex',
                height: '50%',
                width: '100%',
                backgroundColor: "Lime",
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            },
            bottomPane: {
                display: 'flex',
                height: '50%',
                width: '100%',
                backgroundColor: "Cyan",
                flexDirection: 'row',
                justifyContent: 'space-evenly',
            },
            card: {
                height: '150px',
                width: '100px',
                backgroundColor: "White",
            }
          };

        // Create an array of <div> for each card in the player hand.
        const hand1 = player1.hand.map(cardId => {
            let card = state.cards[cardId];
            return  <div key={card.id} style={styles.card}>
                        <p>{card.proto.title}</p>
                        <p>Power: {card.proto.power}</p>
                        <p>Toughness: {card.proto.toughness}</p>
                    </div>;
        });

        const hand2 = player2.hand.map(cardId => {
            let card = state.cards[cardId];
            return  <div key={card.id} style={styles.card}>
                        <p>{card.proto.title}</p>
                        <p>Power: {card.proto.power}</p>
                        <p>Toughness: {card.proto.toughness}</p>
                    </div>;
        });

        return  <div style={styles.splitScreen}>
                    <div style={styles.topPane}>
                        {hand1}
                    </div>
                    <div style={styles.bottomPane}>
                        {hand2}
                    </div>
                </div>;
    }
}

export default GameRender;
