import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

import Board from './board';
import AnswerQuestion from './answer-question';

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
                      <div>Waiting for more players...</div>
                    </div>;
              break;
          case "SELECTING":
              body = <Board board={gameState.board} />;
              break;
          case "ANSWERING":
              body = <AnswerQuestion question={gameState.question} />;
              break;
          case "GAMEOVER":
              body = <div>
                      <div>GAME OVER</div>
                    </div>;
              break;
          default:
              body = <div className="text-danger">Something went wrong</div>;
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
