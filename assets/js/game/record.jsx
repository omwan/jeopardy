import React from 'react';

function Record(props) {
    let {record} = props;

    return <tr>
        <td className="name">{record.player}</td>
        <td className="score">{record.score}</td>
        <td className="game">{record.game}</td>
    </tr>
}


export default Record;