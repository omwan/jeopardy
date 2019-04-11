import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import store from './store';
import api from './api';

import Alert from './alert';
import Header from './header';
import Jeopardy from './game/jeopardy';
import Lobby from "./game/lobby";
import NewUserForm from "./user/new-user-form";
import EditUserForm from "./user/edit-user-form";
import ShowUser from "./user/show-user";

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
        return <div className="container">
            <Router>
                <div className="row">
                    <div className="col">
                        <div className="header mb-2">
                            <Link to="/"><span className="logo"/></Link>
                            <Header />
                        </div>
                    </div>
                </div>
                <Alert />
                <Route path={"/"} exact={true} render={() => {
                    store.dispatch({
                        type: "GAME_NAME_SUBMITTED",
                        data: false
                    });
                    return <Lobby/>;
                }} />
                <Route path={"/game/:name"} exact={true}
                       render={({match}) => <Jeopardy name={match.params.name} />
                } />
                <Route path={"/users/new"} exact={true} render={() => <NewUserForm />}/>
                <Route path={"/users/:id/edit"} exact={true} 
                       render={({match}) => <EditUserForm id={match.params.id} />}/>
                <Route path={"/users/:id/show"} exact={true} 
                render={({match}) => <ShowUser id={match.params.id} />}/>
            </Router>
        </div>;
    }
}
