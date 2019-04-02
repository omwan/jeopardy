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
      channel.join(name, session.token, session.username);
      body = <div>Please refresh the page</div>;
  } else {
      switch (gameState.game_state) {
          case "JOINING":
              body = <div>
                      <Link to={"/"}>
                        <button className="btn btn-primary mb-3">Return to lobby</button>
                      </Link>
                      <div>Waiting for more players...</div>
                    </div>;
              break;
          case "SELECTING":
              body = <Board board={gameState.board} />;
              break;
          case "ANSWERING":
              body = <div className="question"><h4>{gameState.question}</h4></div>;
              // TODO add component to type + submit answers
              break;
          case "GAMEOVER":
              body = <div>
                      <Link to={"/"}>
                        <button className="btn btn-primary mb-3">Return to lobby</button>
                      </Link>
                      <div>GAME OVER</div>
                    </div>;
              break;
          default:
              body = <div>Something went wrong</div>;
              break;
      }
  }

  return <div className="game">
      <h3>Jeopardy Game: {name}</h3>
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
