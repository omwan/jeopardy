import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

function Joining(props) {
  const {gameName} = props;
  const number = window.number || "PHONE NUMBER";

  let startGame = function () {
    channel.push("start");
  };

  return <div className="joining text-center">
            <h3>Waiting for Players!</h3>
            <p>Text "{gameName}:&lt;your name&gt;" to {number} to join the game.</p>
            <p>Then, when you're ready, click "Start Game" to start playing.</p>
            <button className="btn btn-primary" onClick={startGame}>
                Start Game
            </button>
        </div>;
}

function stateToProps(state) {
    return {
        gameName: state.gameName
    };
}

export default connect(stateToProps)(Joining);