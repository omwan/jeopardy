import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import _ from "lodash";

import api from './api';

function Session (props) {
    let {session, loginForm, dispatch} = props;
    let sessionInfo = null;

    if (session == null) {
        sessionInfo = <form onSubmit={login} className="form-inline my-2">
            <input type="email"
                   required
                   className="form-control mr-1"
                   placeholder="email"
                   onChange={(ev) => update({username: ev.target.value})} />
            <input type="password"
                   required
                   className="form-control mr-1"
                   placeholder="password"
                   onChange={(ev) => update({password: ev.target.value})} />
            <input type="submit" className="btn btn-secondary" value="Login" />
            <Link to={"/users/new"} className="ml-3">Register</Link>
        </form>;
    } else {
        sessionInfo = <div className="my-2">
            <p>
                Logged in as {session.username} |&nbsp;
                <Link to={"/users/"+session.user_id+"/edit"}>Edit Account</Link> |&nbsp;
                <a href="javascript:void(0)" onClick={logout}>Logout</a>
            </p>
        </div>
    }

    function login(ev) {
        ev.preventDefault();
        api.createSession(loginForm.username, loginForm.password);
    }

    function logout() {
        api.deleteSession();
    }

    function update(data) {
        dispatch({
            type: "UPDATE_LOGIN_FORM",
            data: data
        });
    }

    return sessionInfo;
}

function stateToProps(state) {
    return {
        session: state.session,
        loginForm: state.loginForm
    };
}

export default connect(stateToProps)(Session);
