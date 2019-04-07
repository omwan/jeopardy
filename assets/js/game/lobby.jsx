import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Records from './records';

import channel from '../channel';

function Lobby(props) {
    let {session, joinGameInput, dispatch} = props;
    let title = "Start A Game";

    let joinGame = function () {
        channel.join(joinGameInput, session.token, session.username);
        props.history.push(`/game/${joinGameInput}`)
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

    return <div className="row mt-3">
        <div className="col-12 col-lg-6">
            <h2 className="text-center">{title}</h2>
            <div className="form-group form-inline justify-content-center">
                <input type="text"
                       className="form-control mr-1 col-8"
                       placeholder="game name"
                       onChange={update}/>
                <button className="btn btn-primary"
                        onClick={joinGame}
                        disabled={joinGameInput.length === 0}>
                    Join
                </button>
            </div>
        </div>
        <div className="col-12 col-lg-6">
            <Records />
        </div>
    </div>;
}

function stateToProps(state) {
    return {
        session: state.session,
        joinGameInput: state.joinGameInput
    }
}

export default connect(stateToProps)(withRouter(Lobby));
