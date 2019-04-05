import store from './store';
import $ from "jquery";

import channel from './channel';

class Server {
    fetchPath(path, callback) {
        $.ajax(path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: callback,
        });
    }

    handleError(err) {
        store.dispatch({
            type: "NEW_ALERT",
            data: { 
                type: "danger",
                message: err.responseText
            }
        })
    }

    sendPost(path, data, callback) {
        $.ajax(path, {
            // headers: {"X-Auth": token}, // TODO
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
            error: this.handleError
        });
    }

    sendPatch(path, data, callback) {
        $.ajax(path, {
            // headers: {"X-Auth": token}, // TODO
            method: "patch",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(data),
            success: callback,
            error: this.handleError
        });
    }

    sendDelete(path, callback) {
        $.ajax(path, {
            // headers: {"X-Auth": token}, // TODO
            method: "DELETE",
            success: callback,
        });
    }

    fetchSession() {
        if (window.session !== null) {
            store.dispatch({
                type: 'NEW_SESSION',
                data: window.session
            });
            channel.connect(window.session.token, window.session.username);
        }
    }

    createSession(username, password) {
        this.sendPost("/api/v1/auth", {username, password}, 
            function (response) {
                store.dispatch({
                    type: "NEW_SESSION",
                    data: response.data
                });
                channel.connect(response.data.token, response.data.username);
            }
        );
    }

    deleteSession() {
        this.sendDelete("/api/v1/auth", function() {
            store.dispatch({
                type: "DELETE_SESSION",
            });
        });
    }

    createUser(username, password) {
        this.sendPost("/api/v1/users", {user: {username, password}}, 
            function (response) {
                store.dispatch({
                    type: "UPDATE_NEW_USER_FORM",
                    data: {username: "", password: ""}
                });
                store.dispatch({
                    type: "NEW_ALERT",
                    data: {type: "info", message: "Registered new user: " + response.data.username}
                });
            }
        );
    }

    updateUser(userid, username, password) {
        this.sendPatch("/api/v1/users/" + userid, {user: {username, password}}, 
            function(response) {
                store.dispatch({
                    type: "UPDATE_EDIT_USER_FORM",
                    data: {username: "", password: ""}
                });
                store.dispatch({
                    type: "NEW_ALERT",
                    data: {type: "info", message: "Updated user: " + response.data.username}
                });
            }
        );
    }

    fetchGame() {
        if (window.session !== null) {
            channel.connect(window.session.token, window.session.username);
        }
    }

    showQuestion(category, points) {
        channel.push("new_question", {category: category, value: points});
    }

    answerQuestion(username, answer) {
        channel.push("answer", {username: username, answer: answer});
    }

    endGame() {
        store.dispatch({
            type: "CLEAR_GAME_NAME"
        });

        channel.push("end_game");
    }

    fetchAllRecords() {
        this.fetchPath("/api/v1/records", function(response) {
            store.dispatch({
                type: "UPDATE_RECORDS",
                data: response.data
            })
        });
    }
}

export default new Server();
