import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import channel from './channel';

import Header from './header';
import Lobby from './lobby';

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
        </div>;
    }
}
