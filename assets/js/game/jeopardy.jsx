import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import channel from "../channel";

import Board from './board';
import Lobby from './lobby';

function Jeopardy(props) {
  const {name, session, gameState} = props;

  let body;

  if (!session) {
      body = <div>Must be logged in to view game</div>;
  } else if (!gameState) { 
      channel.join(name, session.token);
      body = <div>Please refresh the page</div>;
  } else {
      switch (gameState.game_state) {
          case "JOINING":
              // TODO check that multiple can join the game
          case "SELECTING":
              body = <Board board={gameState.board} />;
              break;
          case "ANSWERING":
              body = <div>{gameState.question}</div>;
              break;
          case "GAMEOVER":
              body = <div>GAME OVER</div>;
              break
          default:
              body = <div>Something went wrong</div>;
              break;
      }
  }

  return <div>
      <Link to={"/"}>
          <button className="btn btn-primary mb-3">Return to lobby</button>
      </Link>
      <h2>Game: {name}</h2>
      {body}
  </div>;
}


function stateToProps(state) {
    return {
        gameState: state.gameState,
        session: state.session
    };
}

export default connect(stateToProps)(Jeopardy);
