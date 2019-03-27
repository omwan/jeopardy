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
}

export default new Server();
