import store from './store';
import $ from "jquery";

import channel from './channel';

class Server {
    createSession(username, password) {
        $.ajax("/api/v1/auth", {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({username, password}),
            success: function (response) {
                store.dispatch({
                    type: "NEW_SESSION",
                    data: response.data
                });
                channel.connect(response.data.token);
            }
        });
    }

    deleteSession() {
        $.ajax("/api/v1/auth", {
            method: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: function() {
                store.dispatch({
                    type: "DELETE_SESSION",
                });
            }
        })
    }

    createUser(username, password) {
        console.log("create user ", username, password);
        $.ajax("/api/v1/users", {
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({user: {username, password}}),
            success: function (response) {
                console.log(response.data);
                store.dispatch({
                    type: "UPDATE_NEW_USER_FORM",
                    data: {username: "", password: ""}
                });
            }
        });
    }

    showQuestion(category, points) {
        // TODO when card is flipped, get the question for that category+point_value to show client-side
        console.log("get question, category: " + category + " points: " + points);
    }
}

export default new Server();
