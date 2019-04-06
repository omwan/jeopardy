import React from 'react';
import {connect} from 'react-redux';
import api from '../api';

import UserForm from "./user-form";

function EditUserForm(props) {
  let {id, form, dispatch, session} = props;
  let title = "Edit User Account";

  function submit(ev) {
    ev.preventDefault();
    api.updateUser(id, form.username, form.password);
  }

  function onMount() {
    dispatch({
      type: "UPDATE_EDIT_USER_FORM",
      data: { username: session.username }
    })
  }

  function update(data) {
    dispatch({
      type: "UPDATE_EDIT_USER_FORM",
      data: data
    });
  }

  function deleteUser(ev) {
    ev.preventDefault();
    api.deleteUser(id);
    api.deleteSession();
  }

  if (!session) {
    return <div>
      <h2>{title}</h2>
      <p>You must be logged in to edit a user account.</p>
    </div>;
  }

  if (session.user_id != id) {
    return <div>
      <h2>{title}</h2>
      <p>You can only edit your own user account.</p>
    </div>;
  }

  return <UserForm title={title} 
                   button={"Save"} 
                   onSubmit={submit} 
                   form={form} 
                   update={update} 
                   onMount={onMount}
                   onDelete={deleteUser} />
}

function stateToProps(state) {
  return {
    session: state.session,
    form: state.editUserForm
  }
}

export default connect(stateToProps)(EditUserForm);