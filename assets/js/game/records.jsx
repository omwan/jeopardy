import React from 'react';
import {connect} from 'react-redux';

function Records(props) {
    let {records, title, id} = props;

    let userRecords = _.filter(records, function(record) {
        return id && record.user_id == id;
    })
    let recordList = _.map(id ? userRecords : records, function (record, ii) {
        return <Record key={ii} record={record}/>;
    });

    return <div className="leaderboard-container">
        <h3 className="text-center">{title}</h3>
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
        {recordList.length ? false : <h5 className="name mt-3 text-center">No games yet!</h5>}
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
