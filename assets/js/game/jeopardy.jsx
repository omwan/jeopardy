import React from 'react';
import {connect} from 'react-redux';

import Board from './board';
import Lobby from './lobby';

function Jeopardy(props) {
  const {gameState} = props;

  if (gameState) {
    return <Board board={gameState.board} />;
  } else {
    return <Lobby />;
  }
}


function stateToProps(state) {
    return {
        gameState: state.gameState
    };
}

export default connect(stateToProps)(Jeopardy);
