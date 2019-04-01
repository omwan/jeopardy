import React from 'react';
import {connect} from 'react-redux';

function Alert(props) {
  let {alert, dispatch} = props;

  function clear() {
    dispatch({
      type: "CLEAR_ALERT"
    })
  }

  if (!alert) return false;
  return <div className={"alert alert-" + alert.type}>
    <p>{alert.message}</p>
    <button onClick={clear} className="btn">✕</button>
  </div>;
}

function stateToProps(state) {
  return {
    alert: state.alert
  };
}

export default connect(stateToProps)(Alert);