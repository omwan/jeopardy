import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import api from '../api';
import channel from "../channel";

function Board(props) {
    let {gameState, name, session, dispatch} = props;

    let getBoard = function() {
        if (session !== null) {
            if (gameState !== null) {
                return <div className="board">
                    {_.map(gameState.board, (c, name) => <Category key={name} category={c} name={name}/>)}
                </div>;
            } else {
                channel.join(name, session.token);
            }
        }
        return <div>Must be logged in to view game</div>;
    };

    let board = getBoard();

    return <div>
        <div>
            <Link to={"/"}>
                <button className="btn btn-primary mb-3">Return to lobby</button>
            </Link>
        </div>
        {board}
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
