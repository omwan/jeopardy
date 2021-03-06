import {createStore, combineReducers} from 'redux';
import deepFreeze from 'deep-freeze';
import _ from "lodash";


function alert(state = null, action) {
    switch (action.type) {
        case "CLEAR_ALERT":
            return null;
        case "NEW_ALERT":
            // { message: "", type: <TYPE>}, where <TYPE> is one of: "info" "danger"
            return action.data;
        default:
            return state;
    }
}

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

function newUserForm(state = {username: "", password: ""}, action) {
    switch (action.type) {
        case 'UPDATE_NEW_USER_FORM':
            return _.assign({}, state, action.data);
        default:
            return state;
    }
}

function editUserForm(state = {username: "", password: ""}, action) {
    switch (action.type) {
        case 'UPDATE_EDIT_USER_FORM':
            return _.assign({}, state, action.data);
        default:
            return state;
    }
}

function gameName(state = false, action) {
    switch (action.type) {
        case 'JOIN_GAME':
            return action.data;
        default:
            return state;
    }
}

function gameState(state = null, action) {
    switch (action.type) {
        case 'UPDATE_GAME_STATE':
            return action.data;
        default:
            return state;
    }
}

function joinGameInput(state = "", action) {
    switch (action.type) {
        case 'UPDATE_GAME_NAME':
            return action.data;
        case 'CLEAR_GAME_NAME':
            return "";
        default:
            return state;
    }
}

function answerInput(state = "", action) {
    switch (action.type) {
        case 'UPDATE_ANSWER':
            return action.data;
        default:
            return state;
    }
}

function records(state = [], action) {
    switch (action.type) {
        case 'UPDATE_RECORDS':
            return action.data;
        default:
            return state;
    }
}

function rootReducer(state, action) {
    let reducer = combineReducers({
        session, loginForm, gameName,
        alert, newUserForm, editUserForm,
        gameState, joinGameInput, answerInput,
        records
    });

    let newState = reducer(state, action);
    console.log(newState);
    return deepFreeze(newState);
}

let store = createStore(rootReducer);
export default store;
