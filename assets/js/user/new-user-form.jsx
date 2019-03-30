import React from 'react';
import {connect} from 'react-redux';
import api from '../api';

import UserForm from "./user-form";

function NewUserForm(props) {
  let {form, dispatch} = props;

  function register(ev) {
    ev.preventDefault();
    api.createUser(form.username, form.password);
  }

  function update(data) {
    dispatch({
      type: "UPDATE_NEW_USER_FORM",
      data: data
    });
  }

  return <UserForm title={"New User"} button={"Register"} onSubmit={register} form={form} update={update} />
}

function stateToProps(state) {
  return {
    form: state.newUserForm
  }
}

export default connect(stateToProps)(NewUserForm);