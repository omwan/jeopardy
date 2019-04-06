import React from 'react';
import {connect} from 'react-redux';
import Record from './record';

function Records(props) {
    let {records} = props;

    let recordList = _.map(records, function (record, ii) {
        console.log(JSON.stringify(record));
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

function stateToProps(state) {
    return {
        records: state.records
    };
}

export default connect(stateToProps)(Records);