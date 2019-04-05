import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

import Board from './board';
import AnswerQuestion from './answer-question';
import Players from './players';
import GameOver from './game-over';

function Jeopardy(props) {
    const {name, gameName, session, gameState} = props;

    let body;

    let startButton;
    let number = window.number;

    let startGame = function() {
        channel.push("start", {});
    };

    let renderJoining = function() {
        return <div>
            <div>Text "{name}:&lt;your name&gt;" to {number}</div>
            <button className="btn btn-primary" onClick={startGame}>
                Start game
            </button>
        </div>;
    }

    if (!session) {
        body = <div>Must be logged in to view game</div>;
    } else if (!gameState) {
        if (!gameName) {
            channel.join(name, session.token, session.username, session.user_id);
        }
        body = <div>Loading your game</div>;
    } else {
        switch (gameState.game_state) {
            case "JOINING":
                body = renderJoining();
                break;
            case "SELECTING":
                body = <div>
			<button>End Game</button>
			<Board board={gameState.board}/>
			</div>;
                break;
            case "ANSWERING":
                body = <AnswerQuestion question={gameState.question}/>;
                break;
            case "GAMEOVER":
                body = <GameOver />;
                break;
            default:
                body = <div className="text-danger">Something went wrong</div>;
                break;
        }
    }

    return <div className="game">
        <h3>Jeopardy Game: {name}</h3>
        {body}
        <Players />
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
