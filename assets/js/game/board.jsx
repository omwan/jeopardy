import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';

import api from '../api';

function Board(props) {
    let {gameState, name, session, dispatch} = props;

    return <div className="board">
        {_.map(gameState.board, (c, name) => <Category key={name} category={c} name={name}/>)}
    </div>;
}

function Category(props) {
    let {name, category} = props;
    let values = _.sortBy(_.map(category, (value) => parseInt(value)));

    return <div className="category">
        <div className="title-card card">{name}</div>
        {_.map(values, (points, idx) => <Card key={idx} category={name} points={points} />)}
    </div>
}

function Card(props) {
    return <div className="question-card card"
                onClick={() => api.showQuestion(props.category, props.points)}>{props.points}</div>;
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
