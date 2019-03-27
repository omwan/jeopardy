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

function rootReducer(state, action) {
    console.log("before reducer", state, action);

    let reducer = combineReducers({session, loginForm});
    let newState = reducer(state, action);

    console.log("after reducer", newState);
    return deepFreeze(newState);
}

let store = createStore(rootReducer);
export default store;
