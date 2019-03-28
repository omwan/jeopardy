import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import _ from "lodash";

function session(state = null, action) {
    switch (action.type) {
        case "NEW_SESSION":
            return action.data;
        case "DELETE_SESSION":
            return null;
        default:
            return state;
    }
}

function loginForm(state = {username: "", password: ""}, action) {
    switch (action.type) {
        case 'UPDATE_LOGIN_FORM':
            return _.assign({}, state, action.data);
        default:
            return state;
    }
}

function channelJoined(state = false, action) {
    switch (action.type) {
        case 'JOINED_CHANNEL':
            return action.data;
        default:
            return state;
    }
}

function rootReducer(state, action) {
    let reducer = combineReducers({session, loginForm, channelJoined});
    let newState = reducer(state, action);
    return deepFreeze(newState);
}

let store = createStore(rootReducer);
export default store;
