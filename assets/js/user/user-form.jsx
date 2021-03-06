import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function UserForm(props) {
  const {title, button, form, onSubmit, update, onDelete} = props;

  return <form onSubmit={onSubmit} className="mb-2">
    <h1>{title}</h1>
    <div className="form-group">
      <label htmlFor="username">Email</label>
      <input type="email"
             id="username"
             className="form-control"
             value={form.username}
             onChange={(ev) => update({username: ev.target.value})}
             required />
    </div>
    <div className="form-group">
    <label htmlFor="password">Password</label>
    <input type="password"
           id="password"
           className="form-control"
           value={form.password}
           onChange={(ev) => update({password: ev.target.value})}
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
           title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 or more characters"
           required />
    </div>
    <input type="submit" value={button} className="btn btn-primary" />
    <Link className="back-btn" to={"/"}>Back to Lobby</Link>
    { onDelete ? <button className="btn btn-danger float-right" onClick={onDelete}>Delete Account</button> : false }
  </form>;
}
