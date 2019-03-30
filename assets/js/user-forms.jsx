import React from 'react';
import {connect} from 'react-redux';

import api from './api';

function _NewUserForm(props) {
  let {newUserForm, dispatch} = props;

  function register(ev) {
    ev.preventDefault();
    api.createUser(newUserForm.username, newUserForm.password);
  }

  function update(data) {
    dispatch({
      type: "UPDATE_NEW_USER_FORM",
      data: data
    });
  }

  return <form onSubmit={register} className="mb-2">
    <h1>New User</h1>
    <div className="form-group">
      <label htmlFor="username">Email</label>
      <input type="email"
             id="username"
             className="form-control"
             value={newUserForm.username}
             onChange={(ev) => update({username: ev.target.value})}
             required />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password"
           id="password"
           className="form-control"
           value={newUserForm.password}
           onChange={(ev) => update({password: ev.target.value})}
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
           title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
           required />
    </div>
    <input type="submit" value="Register" className="btn btn-primary" />
  </form>;
}

export const NewUserForm = connect((state) => {
  return {
    newUserForm: state.newUserForm
  }
})(_NewUserForm);