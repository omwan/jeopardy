import React from 'react';
import {connect} from 'react-redux';
import api from '../api';

import UserForm from "./user-form";

function EditUserForm(props) {
  let {id, form, dispatch} = props;

  function submit(ev) {
    ev.preventDefault();
    api.updateUser(id, form.username, form.password);
  }

  function update(data) {
    dispatch({
      type: "UPDATE_EDIT_USER_FORM",
      data: data
    });
  }

  return <UserForm title={"Edit User"} button={"Save"} onSubmit={submit} form={form} update={update} />
}

function stateToProps(state) {
  return {
    form: state.editUserForm
  }
}

export default connect(stateToProps)(EditUserForm);