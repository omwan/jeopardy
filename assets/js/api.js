import store from './store';
import $ from "jquery";

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
}

export default new Server();
