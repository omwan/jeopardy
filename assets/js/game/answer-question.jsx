import React from 'react';
import {connect} from 'react-redux';

function AnswerQuestion(props) {
    let {dispatch, question, input} = props;
    let number = window.number || "NUMBER";

    function update(data) {
        dispatch({
            type: "UPDATE_ANSWER",
            data: data
        });
    }

    return <div className="question-container">
        <div className="question-details">
            <h4><span className="category mb-0">{question.category}:</span> <span
                className="value">{question.value}</span></h4>
        </div>
        <div className="question-wrapper mt-2">
            <h4 className="question">{question.question}</h4>
        </div>
        <div className="question-instruction mt-4"><h4>Text Your Answer, What is/are: "________", to: {number}</h4>
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
