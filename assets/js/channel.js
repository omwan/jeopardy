import store from './store';
import {Socket} from "phoenix";

class Channel {
    constructor() {
        this.channel = null;
        this.socket = null;
    }

    connect(token) {
        this.socket = new Socket("/socket", {
            params: {
                token: token
            }
        });
        this.socket.connect();
        console.log("Connected to socket");
    }

    join(game, token) {
        if (this.socket !== null) {
            this.channel = this.socket.channel(`games:${game}`, {token: token});
            this.channel.join()
                .receive("ok", resp => {
                    console.log("Joined successfully", resp)
                })
                .receive("error", resp => {
                    console.log("Unable to join", resp)
                });

            store.dispatch({
                type: "JOINED_CHANNEL",
                data: true
            });
        }
    }

    push(message, body) {
        this.channel.push(message, body)
            .receive("ok", function (view) {
                console.log(view);
                //store.dispatch(...);
            });
    }
}

export default new Channel();
