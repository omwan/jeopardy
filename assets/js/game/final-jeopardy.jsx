import React from 'react';
import {connect} from 'react-redux';
import channel from "../channel";

function FinalJeopardy(props) {
    let {gameState} = props;
    let number = window.number || "NUMBER";

    let final = gameState.final_jeopardy;
    let header;
    let body;
    let instruction;

    switch(gameState.game_state) {
        case "FINAL_CATEGORY":
            header = "Final Jeopardy Category";
            body = final.category;
            instruction = `Text your wager (up to your current score) to ${number}`;
            break;
        case "FINAL_QUESTION":
            header = final.category;
            body = final.question;
            instruction = `Text Your Answer, What is/are: "________", to: ${number}`;
            break;
        case "FINAL_ANSWER":
            channel.push("final_complete");
            break;
        case "GAME_OVER":
            header = final.category;
            body = final.answer;
            break;
    }

    return <div className="question-container">
        <div className="question-details">
            <h4><span className="category mb-0">{header}:</span></h4>
        </div>
        <div className="question-wrapper mt-2">
            <h4 className="question">{body}</h4>
        </div>
        <div className="question-instruction mt-4"><h4>{instruction}</h4>
        </div>
    </div>;
}

function stateToProps(state) {
    return {
        gameState: state.gameState
    };
}

export default connect(stateToProps)(FinalJeopardy);