import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import api from '../api';

export default function Board(props) {
  return <div className="board">
    {_.map(props.board, (c, idx) => <Category key={idx} category={c} />)}
  </div>;
}

function Category(props) {
  let name = Object.keys(props.category)[0];
  let point_values = _.sortBy(_.map(props.category[name], (val) => parseInt(val)));

  return <div className="category">
    <div className="title-card card">{name}</div>
    {_.map(point_values, (points, idx) => <Card key={idx} category={name} points={points} c/>)}
  </div>
}

function Card(props) {
  return <div className="question-card card" onClick={() => api.showQuestion(props.category, props.points)}>{props.points}</div>;
}

Card.propTypes = {
  category: PropTypes.string,
  points: PropTypes.number
};