import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

import Board from './board';
import AnswerQuestion from './answer-question';

function Jeopardy(props) {
    const {name, gameName, session, gameState} = props;

    let body;
    let players;
    let startButton;
    let number = window.number;

    let startGame = function() {
        channel.push("start", {});
    };

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
                body = <div>
                    <div>Text {name}:&lt;your name&gt; to {number}</div>
                </div>;
                players = _.map(gameState.players, function (player, ii) {
                    return <div key={ii}>{player.name}</div>;
                });
                startButton = <button className="btn btn-primary" onClick={startGame}>
                    Start game
                </button>;
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
        {players}
        {startButton}
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
