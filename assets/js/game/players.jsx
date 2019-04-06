import React from 'react';
import {connect} from 'react-redux';

function Players(props) {
    let {players} = props;

    players = _.map(players, function (player, idx) { 
        return <div key={idx} className="player">
            <h5>{player.name}</h5>
            <h4 className="points">${player.score}</h4>
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