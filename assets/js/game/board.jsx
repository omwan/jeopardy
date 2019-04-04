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
    let values = _.sortBy(_.map(category, (value) => parseInt(value)));

    return <div className="category">
        <div className="title-card card">{letter}: {name}</div>
        {_.map(values, (points, idx) => <Card key={idx} category={name} points={points} />)}
    </div>
}

function Card(props) {
    let onClick = function() {
        if (props.points == -1) {
            return;
        } else {
            api.showQuestion(props.category, props.points);
        }
    }

    return <div className={"question-card card " + (props.points == -1 ? "disabled" : "")} onClick={onClick}>
        {props.points == -1 ? "" : props.points}
    </div>;
}

Card.propTypes = {
    category: PropTypes.string,
    points: PropTypes.number
};

function stateToProps(state) {
    return {
        gameState: state.gameState,
        session: state.session
    }
}

export default connect(stateToProps)(Board);
