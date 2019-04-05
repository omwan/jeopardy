import React from 'react';
import {connect} from 'react-redux';

function Records(props) {
    let {records} = props;

    let recordList = _.map(records, function (record, ii) {
        return <Record key={ii} record={record}/>;
    });

    return <div>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Name</th>
                <th>Score</th>
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
        <td>{record.player}</td>
        <td>{record.score}</td>
    </tr>
}

function stateToProps(state) {
    return {
        records: state.records
    };
}

export default connect(stateToProps)(Records);