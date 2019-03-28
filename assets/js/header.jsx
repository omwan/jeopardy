import React from 'react';
import {connect} from 'react-redux';
import _ from "lodash";

import api from './api';

function Header(props) {
    let {session, loginForm, dispatch} = props;
    let sessionInfo = null;

    if (session == null) {
        sessionInfo = <div className="form-inline my-2">
            <input type="text"
                   className="form-control"
                   placeholder="username"
                   onChange={(ev) => update({username: ev.target.value})}/>
            <input type="password"
                   className="form-control"
                   placeholder="password"
                   onChange={(ev) => update({password: ev.target.value})}/>
            <button className="btn btn-secondary" onClick={login}>Login</button>
        </div>;
    } else {
        sessionInfo = <div className="my-2">
            <p>
                Logged in as {session.username} |&nbsp;
                <a href="javascript:void(0)" onClick={logout}>Logout</a>
            </p>
        </div>
    }

    function login() {
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

export default connect(stateToProps)(Header);
