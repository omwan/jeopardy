import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import {Provider} from 'react-redux';

import api from './api';

import Header from './header';

export default function root_init(node, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Root/>
        </Provider>, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header />
        </div>
    }
}