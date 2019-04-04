import React from 'react';
import {connect} from 'react-redux';

function GameOver(props) {
    let winner = _.maxBy(_.values(props.gameState.players), 'score');

    return <div className="game-over text-center">
        <h3>GAME OVER</h3>
        <p>{winner.name} wins!</p>
    </div>;
}

function stateToProps(state) {
    return {
        gameState: state.gameState
    };
}

export default connect(stateToProps)(GameOver);