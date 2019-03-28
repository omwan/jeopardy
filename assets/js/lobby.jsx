import React from 'react';
import {connect} from 'react-redux';

import channel from './channel';

function Lobby(props) {
    let {session, dispatch} = props;

    let joinDemo = function() {
        channel.join("demo", session.token);
    };

    if (session !== null) {
        return <div>
            <button className="btn btn-primary"
                    onClick={joinDemo}>
                Join demo
            </button>
        </div>;
    } else {
        return <div>
            Must log in to start a game.
        </div>
    }
}

function stateToProps(state) {
    return {
        session: state.session
    }
}

export default connect(stateToProps)(Lobby);
