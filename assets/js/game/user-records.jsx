import React from 'react';
import {connect} from 'react-redux';
import Record from './record';

function UserRecords(props) {
    let {records, id} = props;

    let recordList = _.map(records, function (record, ii) {
        console.log(JSON.stringify(record));
        if (record.user_id != id) {
            return;
        }
        return <Record key={ii} record={record}/>;
    });

    return <div className="leaderboard-container">
        <table className="table table-striped leaderboard">
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

export default connect(stateToProps)(UserRecords);