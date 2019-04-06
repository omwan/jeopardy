import React from 'react';
import {connect} from 'react-redux';

function Players(props) {
    let {players} = props;

    players = _.map(players, function (player, idx) { 
        return <div key={idx} className="player">
            <div className="name">{player.name}</div>
            <div className="score">${player.score}</div>
        </div>; 
    });

    return <div className="players">{players}</div>;
}

function stateToProps(state) {
    return {
        players: state.gameState ? state.gameState.players : null
    };
}

export default connect(stateToProps)(Players);