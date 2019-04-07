import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import Records from '../game/records';


function ShowUser(props) {
  let {id, session, records} = props;
  let edit;

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
        <Records id={id} title="Game History"/>
    </div>
     <span><Link to={"/users/" + id + "/edit"}>Edit Account</Link> | </span><Link to={"/"} >Back to Lobby</Link>

  </div>
}

function stateToProps(state) {
  return {
    session: state.session,
    form: state.ShowUser
  }
}

export default connect(stateToProps)(ShowUser);
