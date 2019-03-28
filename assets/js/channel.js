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
        
            // listeners for stuff happening, TODO don't hard-code this here
            this.channel.on("shout", (msg) => console.log("SHOUT", msg));
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
