import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import UserRecords from '../game/user-records';


function ShowUser(props) {
  let {id, session, records} = props;
  let title = "Your Account";
  let edit;

  if (session.user_id == id) {
    edit = <span><Link to={"/users/:id/edit"}>Edit Account</Link> | </span>;
  }

  return <div className="show-user">
    <h4>Your account info:</h4>
    <div className="email">Email: {session.username}</div> 

    <h5>Game History</h5>
    <div className="row">
        <UserRecords records={records} id={id} />
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