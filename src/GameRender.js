import React from 'react';
import { useDrag } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

class GameRender extends React.Component {
    render() {
        // Get state references.
        const state = this.props.G;
        const ctx = this.props.ctx;
        const player1 = state['player_0'];
        const player2 = state['player_1'];
        const styles = {
            splitScreen: {
                display: 'flex',
                flexDirection: 'column',
                width: window.innerWidth,
                height: window.innerHeight,
            },
            topHandPane: {
                display: 'flex',
                flex: 1,
                backgroundImage: `linear-gradient(to bottom right, orange, yellow)`,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
            },
            topFieldPane: {
                display: 'flex',
                flex: 1,
                backgroundImage: `linear-gradient(to bottom right, orange, yellow)`,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
            },
            bottomFieldPane: {
                display: 'flex',
                flex: 1,
                backgroundImage: `linear-gradient(to bottom right, lime, cyan)`,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
            },
            bottomHandPane: {
                display: 'flex',
                flex: 1,
                backgroundImage: `linear-gradient(to bottom right, lime, cyan)`,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
            },
            card: {
                height: '150px',
                width: '100px',
                backgroundImage: `linear-gradient(to bottom right, magenta, violet)`,
                margin: '5px',
                textAlign: 'center',
            }
          };

        const MovableItem = (props) => {
            const [{ isDragging }, drag] = useDrag({
                type: 'CARD',
                collect: (monitor) => ({
                    isDragging: monitor.isDragging(),
                }),
            });

            const opacity = isDragging ? 0.4 : 1;

            return  <div ref={drag} key={props.card.id} style={styles.card}>
                        <p>{props.card.proto.title}</p>
                        <p>Power: {props.card.proto.power}</p>
                        <p>Toughness: {props.card.proto.toughness}</p>
                    </div>;
        }

        const getCardsAsDivs = (cardId) => {
            let card = state.cards[cardId];
            return <MovableItem card={card} />
            // return  <div key={card.id} style={styles.card}>
            //             <p>{card.proto.title}</p>
            //             <p>Power: {card.proto.power}</p>
            //             <p>Toughness: {card.proto.toughness}</p>
            //         </div>;
        }

        const hand1 = player1.hand.map(getCardsAsDivs);
        const hand2 = player2.hand.map(getCardsAsDivs);
        const field1 = player1.field.map(getCardsAsDivs);
        const field2 = player2.field.map(getCardsAsDivs);

        return  <div style={styles.splitScreen}>
                    <DndProvider backend={HTML5Backend}>
                        <div style={styles.topHandPane}>
                            {hand1}
                        </div>
                        <div style={styles.topFieldPane}>
                            {field1}
                        </div>
                        <div style={styles.bottomFieldPane}>
                            {field2}
                        </div>
                        <div style={styles.bottomHandPane}>
                            {hand2}
                        </div>
                    </DndProvider>
                </div>;
    }
}

export default GameRender;
