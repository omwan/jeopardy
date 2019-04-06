import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Records from '../game/records';


function ShowUser(props) {
  let {id, session, records} = props;
  let edit;

  if (session.user_id == id) {
    edit = <span><Link to={"/users/" + session.user_id + "/edit"}>Edit Account</Link> | </span>;
  }

  return <div className="show-user">
    <h4>Account info:</h4>
    <div className="email">Email: {session.username}</div> 

    <div className="row">
        <Records id={id} title="Game History"/>
    </div>
    {edit}<Link to={"/"} >Back to Lobby</Link>

  </div>
}

function stateToProps(state) {
  return {
    session: state.session,
    form: state.ShowUser
  }
}

export default connect(stateToProps)(ShowUser);
