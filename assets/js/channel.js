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
                    console.log(`Joined ${game} successfully`, resp);
                    store.dispatch({
                        type: "JOIN_GAME",
                        data: game
                    });
                })
                .receive("error", resp => {
                    console.log(`Unable to join ${game}`, resp);
                });

            // register listeners for stuff happening
            this.channel.on("shout", (game) => {
                console.log("SHOUT", game);
                store.dispatch({
                    type: "UPDATE_GAME_STATE",
                    data: game
                });
                store.dispatch({
                    type: "GAME_NAME_SUBMITTED",
                    data: true
                })
            });
        }
    }

    push(message, body) {
        console.log("push", message, body);
        this.channel.push(message, body)
            .receive("ok", function (view) {
                console.log(view);
                //store.dispatch(...);
            });
    }
}

export default new Channel();
