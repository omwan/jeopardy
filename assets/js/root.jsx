import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import {Provider} from 'react-redux';

import api from './api';
import store from './store';

import Header from './header';

export default function root_init(node, store, channel) {
    ReactDOM.render(
        <Provider store={store}>
            <Root channel={channel}/>
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
        }

        props.channel.join()
            .receive("ok", resp => {
                console.log("Joined successfully", resp)
            })
            .receive("error", resp => {
                console.log("Unable to join", resp)
            });
    }

    render() {
        return <div>
            <Header/>
        </div>
    }
}
