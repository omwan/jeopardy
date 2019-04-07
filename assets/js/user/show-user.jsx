import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Records from '../game/records';


function ShowUser(props) {
  let {id, session, records} = props;
  let edit;
  let title = "Account Info";
  if (!session) {
    return <div>
      <h2>{title}</h2>
      <p>You must be logged in to view a user account.</p>
    </div>;
  }

  if (session.user_id != id) {
    return <div>
      <h2>{title}</h2>
      <p>You can only view your own user account.</p>
    </div>;
  }

  return <div className="show-user">
    <h1>Your Account info:</h1>
    <div className="email">Email: {session.username}</div> 

    <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2">
            <Records id={id} title="Game History"/>
        </div>
    </div>
    <div className="row mt-3">
        <div className="col">
            <span><Link to={"/users/" + id + "/edit"}>Edit Account</Link> | </span><Link to={"/"} >&nbsp;Back to Lobby</Link>
        </div>
    </div>
  </div>
}

function stateToProps(state) {
  return {
    session: state.session,
    form: state.ShowUser
  }
}

export default connect(stateToProps)(ShowUser);
