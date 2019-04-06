import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

import Board from './board';
import AnswerQuestion from './answer-question';
import Players from './players';
import GameOver from './game-over';

function JeopardyMock(props) {
    const {name, gameName, session, gameState} = props;

    let body;
    let number = window.number;

    body = <Board/>;
    // body = <AnswerQuestion question={gameState.question}/>;
    // body = <GameOver/>;
    // body = <div className="text-danger">Something went wrong</div>;

    return <div className="game">
        <h3>Jeopardy Game: {name}</h3>
        {body}
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

function Board(props) {
    let {gameState, name, session, dispatch} = props;

    let letters = ["A", "B", "C", "D", "E", "F"];
    let i = 0;

    let board = _.map(new Array(16), function (x, i) {
        i = i + 1;
       return <Category key={i} category={x} name={x} letter={i} turn='1'></Category>
    });
    
    let turn = gameState.turn;
    let answer = function () {
        if (gameState.last_answer.value === "") {
            return <span></span>;
        } else if (gameState.last_answer.correct) {
            return <span>{gameState.turn} correctly answered "{gameState.last_answer.value}"<br/></span>;
        } else {
            return <span>The correct answer is "{gameState.last_answer.value}"<br/></span>;
        }
    };

    return <div>
        {answer()}
        It's {turn}'s turn to pick a question.
        <div className="board">
            {board}
        </div>
    </div>;
}

function Category(props) {
    let {name, category, letter} = props;
    let values = _.sortBy(_.map(category, (status) => {
        return {"completed": status.completed, "value": parseInt(status.value)};
    }), ['value']);

    return <div className="category">
        <div className="title-card card">{letter}: {name}</div>
        {_.map(values, function(status, idx) {
            return <Card key={idx} category={name} status={status} turn={props.turn}/>;
        })}
    </div>
}

function Card(props) {
    let {category, status, turn} = props;

    let onClick = function () {
        if (status.completed) {
            return;
        } else {
            api.showQuestion(turn, category, status.value);
        }
    };

    return <div className={"question-card card " + (status.completed ? "disabled" : "")} onClick={onClick}>
        {status.completed ? "" : status.value}
    </div>;
}

Card.propTypes = {
    category: PropTypes.string,
    status: PropTypes.shape({
        value: PropTypes.number,
        completed: PropTypes.bool
    }),
};

function stateToProps(state) {
    return {
        gameState: state.gameState,
        session: state.session
    }
}

export default connect(stateToProps)(JeopardyMock);
