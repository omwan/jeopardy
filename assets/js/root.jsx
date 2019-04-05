import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import store from './store';
import channel from './channel';
import api from './api';

import Alert from './alert';
import Header from './header';
import Jeopardy from './game/jeopardy';
import Lobby from "./game/lobby";
import NewUserForm from "./user/new-user-form";
import EditUserForm from "./user/edit-user-form";

export default function root_init(node, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        api.fetchSession();
        api.fetchGame();
        api.fetchAllRecords();
    }

    render() {
        return <div>
            <Router>
                <Header />
                <Alert />
                <Route path={"/"} exact={true} render={() => {
                    store.dispatch({
                        type: "GAME_NAME_SUBMITTED",
                        data: false
                    });
                    api.fetchAllRecords();
                    return <Lobby/>;
                }} />
                <Route path={"/game/:name"} exact={true}
                       render={({match}) => <Jeopardy name={match.params.name} />
                } />
                <Route path={"/users/new"} exact={true} render={() => <NewUserForm />}/>
                <Route path={"/users/:id/edit"} exact={true} 
                       render={({match}) => <EditUserForm id={match.params.id} />}/>
            </Router>
        </div>;
    }
}
