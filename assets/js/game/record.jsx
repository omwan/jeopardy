import React from 'react';
import {connect} from 'react-redux';

function Record(props) {
    let {record} = props;

    return <tr>
        <td className="name">{record.player}</td>
        <td className="score">{record.score}</td>
    </tr>
}

export default connect(stateToProps)(Record);