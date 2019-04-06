import React from 'react';
import {connect} from 'react-redux';

import api from '../api';

function AnswerQuestion(props) {
    let {dispatch, question, input} = props;

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
        <h4 className="question-details"><span className="category">{question.category}:</span> <span className="value">{question.value}</span></h4>
        <h4 className="question">{question.question}</h4>
        <div className="submission mt-5">
            <div>Text Your Answer to: {"TODO PHONE #"}</div>
            <div>OR</div>
            <div>Submit Your Answer</div>
            <form onSubmit={handleSubmit} className="form-inline" >
                <label className="mr-2">What is/are...</label>
                <input type="text" 
                       required 
                       onChange={(ev) => update({answer: ev.target.value})}
                       className="form-control mr-1" />
                <input type="submit" 
                       className="btn btn-primary" />
            </form>
        </div>
    </div>;
}

function stateToProps(state) {
    return {
        input: state.answerInput,
        session: state.session
    };
}

export default connect(stateToProps)(AnswerQuestion);
