import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';

import store from './store';
import channel from './channel';

import Header from './header';
import Lobby from './lobby';
import Board from './board';

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
            <Header />
            <Lobby />
            <Board />
        </div>;
    }
}
