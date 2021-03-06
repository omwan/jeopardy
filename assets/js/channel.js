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

    join(game, token, username) {
        if (this.socket !== null) {
            let payload = {
                token: token,
                username: username
            };
            this.channel = this.socket.channel(`games:${game}`, payload);
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
            });
        }
    }

    push(message, body) {
        console.log("push", message, body);
        switch (message) {
            case "start":
                this.channel.push("start", body)
                    .receive("ok", function (view) {
                        console.log(view);
                        store.dispatch({
                            type: "UPDATE_GAME_STATE",
                            data: view
                        })
                    });
                break;
            default:
                this.channel.push(message, body)
                    .receive("ok", function (view) {
                        console.log(view);
                    });
                break;
        }

    }
}

export default new Channel();
