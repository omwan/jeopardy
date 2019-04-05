import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import Records from './records';

import channel from '../channel';

function Lobby(props) {
    let {session, joinGameInput, gameName, dispatch} = props;
    let title = "Start A Game";

    let joinGame = function () {
        channel.join(joinGameInput, session.token, session.username, session.user_id);
    };

    let update = function (event) {
        dispatch({
            type: "UPDATE_GAME_NAME",
            data: event.target.value
        });
    };

    if (!session) {
        return <div>
            <h2>{title}</h2>
            <p>You must log in to join a game.</p>
        </div>
    }

    if (gameName) {
        return <Redirect to={`/game/${gameName}`}/>;
    }

    return <div>
        <h2>{title}</h2>
        <div className="row">
            <div className="col form-group form-inline">
                <input type="text"
                       className="form-control col-md-4 mr-1"
                       placeholder="game name"
                       onChange={update}/>
                <button className="btn btn-primary"
                        onClick={joinGame}
                        disabled={joinGameInput.length === 0}>
                    Join
                </button>
            </div>
        </div>
        <div className="row">
            <Records />
        </div>
    </div>;
}

function stateToProps(state) {
    return {
        session: state.session,
        joinGameInput: state.joinGameInput,
        gameName: state.gameName
    }
}

export default connect(stateToProps)(Lobby);
