import React from 'react';
import {connect} from 'react-redux';

import api from '../api';

function AnswerQuestion(props) {
    let {dispatch, question, input} = props;
    let number = window.number || "NUMBER";

    let handleSubmit = function(ev) {
        ev.preventDefault();
        api.answerQuestion(session.username, input.answer);
        update({answer: ""});
    }

    function update(data) {
        dispatch({
            type: "UPDATE_ANSWER",
            data: data
        });
    }

    return <div className="question-container">
        <div className="question-details">
            <h4><span className="category mb-0">{question.category}:</span> <span className="value">{question.value}</span></h4>
        </div>
        <div className="question-wrapper mt-2">
            <h4 className="question">{question.question}</h4>
        </div>
        <div className="question-instruction mt-4"><h4>Text Your Answer, What is/are: "________", to: {number}</h4></div>
        {/*<div className="submission mt-5">
            <form onSubmit={handleSubmit} className="form-inline" >
                <label className="mr-2">What is/are...</label>
                <input type="text" 
                       required 
                       onChange={(ev) => update({answer: ev.target.value})}
                       className="form-control mr-1" />
                <input type="submit" 
                       className="btn btn-primary" />
            </form>
        </div>*/}
    </div>;
}

function stateToProps(state) {
    return {
        input: state.answerInput,
        session: state.session
    };
}

export default connect(stateToProps)(AnswerQuestion);
