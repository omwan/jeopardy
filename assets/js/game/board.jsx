import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';

import api from '../api';

function Board(props) {
    let {gameState, name, session, dispatch} = props;

    let letters = ["A", "B", "C", "D", "E", "F"];
    let i = 0;

    let board = _.map(gameState.board, function(c, name) {
        let letter = letters[i];
        i++;
        return <Category key={name} category={c} name={name} letter={letter}/>;
    });

    return <div className="board">
        {board}
    </div>;
}

function Category(props) {
    let {name, category, letter} = props;
    let values = _.sortBy(_.map(category, (status) => {
        return {"completed": status.completed, "value": parseInt(status.value)}; 
    }), ['value']);

    return <div className="category">
        <div className="title-card card">{letter}: {name}</div>
        {_.map(values, (status, idx) => <Card key={idx} category={name} status={status} />)}
    </div>
}

function Card(props) {
    let {category, status} = props;

    let onClick = function() {
        if (status.completed) {
            return;
        } else {
            api.showQuestion(category, points);
        }
    }

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

export default connect(stateToProps)(Board);
