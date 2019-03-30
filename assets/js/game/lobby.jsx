import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import channel from '../channel';

function Lobby(props) {
    let {session, joinGameInput, gameNameSubmitted, dispatch} = props;

    let joinGame = function () {
        channel.join(joinGameInput, session.token);
    };

    let update = function (event) {
        dispatch({
            type: "UPDATE_GAME_NAME",
            data: event.target.value
        });
    };

    if (session !== null) {
        if (gameNameSubmitted) {
            return <Redirect to={"/game/demo"}/>;
        } else {
            return <div>
                <h2>Start a New Game</h2>
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
            </div>;
        }
    } else {
        return <div className="row">
            You must log in to start a game.
        </div>
    }
}

function stateToProps(state) {
    return {
        session: state.session,
        joinGameInput: state.joinGameInput,
        gameNameSubmitted: state.gameNameSubmitted
    }
}

export default connect(stateToProps)(Lobby);
