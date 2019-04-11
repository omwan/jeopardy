import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import api from '../api';

function GameOver(props) {
    let {gameState} = props;

    let winner = gameState.winner;

    let endGame = function () {
        api.endGame();
        props.history.push('/'); // redirect to Lobby
    };

    let finalJeopardy = <div>
        {JSON.stringify(gameState.final_jeopardy)}
    </div>;

    return <div className="game-over">
        <h3>GAME OVER</h3>
        {finalJeopardy}
        <p>{winner.name} wins!</p>
        <button className="btn btn-primary w-25" onClick={endGame}>Back to Lobby</button>
    </div>;
}

function stateToProps(state) {
    return {
        gameState: state.gameState
    };
}

export default connect(stateToProps)(withRouter(GameOver));
