import React from 'react';
import {connect} from 'react-redux';

function Records(props) {
    let {records} = props;

    let recordList = _.map(records, function (record, ii) {
        return <Record key={ii} record={record}/>;
    });

    return <div className="leaderboard-container">
        <h3>Leaderboard</h3>
        <table className="table leaderboard">
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Game</th>
            </tr>
            </thead>
            <tbody>
            {recordList}
            </tbody>
        </table>
    </div>;
}

function Record(props) {
    let {record} = props;

    return <tr>
        <td className="name">{record.player}</td>
        <td className="score">{record.score}</td>
        <td className="game">{record.game}</td>
    </tr>
}

function stateToProps(state) {
    return {
        records: state.records
    };
}

export default connect(stateToProps)(Records);