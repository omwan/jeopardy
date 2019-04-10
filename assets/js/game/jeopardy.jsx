import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

import Joining from './joining';
import Board from './board';
import AnswerQuestion from './answer-question';
import Players from './players';
import GameOver from './game-over';

function Jeopardy(props) {
    const {name, gameName, session, gameState} = props;

    let body;
    let state;

    if (!session) {
        body = <div>Must be logged in to view game</div>;
    } else if (!gameState) {
        if (!gameName) {
            channel.join(name, session.token, session.username);
        }
        body = <div>Loading your game</div>;
    } else {
        state = gameState.game_state
        switch (gameState.game_state) {
            case "JOINING":
                body = <Joining />
                break;
            case "SELECTING":
                body = <Board board={gameState.board}/>;
                break;
            case "ANSWERING":
                body = <AnswerQuestion question={gameState.question}/>;
                break;
            case "FINAL_CATEGORY":
                body = <div>{JSON.stringify(gameState.final_jeopardy)}</div>;
                break;
            case "GAMEOVER":
                body = <GameOver/>;
                break;
            default:
                body = <div className="text-danger">Something went wrong</div>;
                break;
        }
    }

    return <div className="game">
        <h3>Game: {name}</h3>
        <div>{state}</div>
        <div>{body}</div>
        <Players/>
    </div>;
}


function stateToProps(state) {
    return {
        gameState: state.gameState,
        gameName: state.gameName,
        session: state.session
    };
}

export default connect(stateToProps)(Jeopardy);
