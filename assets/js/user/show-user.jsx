import React from 'react';
import {connect} from 'react-redux';
import Records from '../game/records';
import { Link } from 'react-router-dom';


function ShowUser(props) {
  let {id, session, records} = props;
  let title = "Your Account";


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
    <h4>Your account info:</h4>
    <div className="email">Email: {session.username}</div> 

    <h5>Game History</h5>
    <div className="row">
        {/* TODO: change to individual user's records */}
        <Records records={records} />
    </div>
    <Link to={"/users/:id/edit"}>Edit Account</Link> | <Link to={"/"} >Back to Lobby</Link>

  </div>
}

function stateToProps(state) {
  return {
    session: state.session,
    form: state.ShowUser
  }
}

export default connect(stateToProps)(ShowUser);