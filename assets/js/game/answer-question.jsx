import React from 'react';
import {connect} from 'react-redux';

import api from '../api';

function AnswerQuestion(props) {
    let {dispatch, question, input} = props;

    let handleSubmit = function(ev) {
        ev.preventDefault();
        api.answerQuestion("olivia", input.answer);
        update({answer: ""});
    }

    function update(data) {
        dispatch({
            type: "UPDATE_ANSWER",
            data: data
        });
    }

    return <div>
        <h4>Question: {question}</h4>
        <div className="submission mt-5">
            <h3>Text Your Answer to: {"TODO PHONE #"}</h3>
            <h3>OR</h3>
            <h3>Submit Your Answer</h3>
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