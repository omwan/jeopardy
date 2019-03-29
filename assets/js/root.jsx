import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import store from './store';
import channel from './channel';

import Header from './header';
import Board from './game/board';
import Lobby from "./game/lobby";

export default function root_init(node, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Root />
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);

        if (window.session !== null) {
            store.dispatch({
                type: 'NEW_SESSION',
                data: window.session
            });
            channel.connect(window.session.token);
        }
    }

    render() {
        return <div>
            <Router>
                <Header />
                <Route path={"/"} exact={true} render={() => {
                    store.dispatch({
                        type: "GAME_NAME_SUBMITTED",
                        data: false
                    });
                    return <Lobby/>;
                }} />
                <Route path={"/game/:name"} exact={true}
                       render={({match}) => <Board name={match.params.name} />
                } />
            </Router>
        </div>;
    }
}
