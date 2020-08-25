import io from 'socket.io-client'

export default class {
    constructor() {
      
        this.baseURL = window.location.hostname.includes("localhost")
            ? "http://localhost:3231/socket"
            : "/socket";
        this.socket = io(this.baseURL, { transports: ["websocket"] });
        this.players = [];
        this.initSocketChat();
    }

    initSocketChat() {
        //this event execute when other player send your data
        const disconnect = (userID) => {
            let player = this.players.filter(obj => obj.id == userID)[0]
            this.players = this.players.filter(obj => obj.id != userID);
            //disconect interface
            console.log("players", this.players);
            console.log("player disconnect", player)
        }

        const connectToRoomMe = (data) => {
            //this event execute only when i connect into a socket chat get all players connect in this
            console.log("entro", data)
            for (let i = 0; i < data.length; i++) {
                this.players.push({
                    id: data[i].id,
                    name: data[i].name,
                    typing: false
                })
            }
            //display in interface all players
        }

        const connectRoomNewPlayer = (data) => {
            const { id, name } = data;
            this.players.push({
                id: id,
                name: name,
                typing: false
            })
            console.log("all players with the player connect", this.players)
            //display interface user connect
        }

        const reciveMessage = (data) => {
            const { id, name, message } = data;
            console.log("recive message", id, name, message);
        }

        const reciveStateTyping = (data) => {
            const { id, name, state } = data;
            this.players.filter(obj => obj.id == id)[0].state = state;//state is bool
            console.log("set state typing", id, name, state)
            if (state) {
                //set typing into an interface
            } else {
                //remove typing into an interface
            }
        }

        this.socket.on("disconnectRoom", disconnect);
        this.socket.on("connectedRoom", connectToRoomMe);
        this.socket.on("connectedOtherPlayer", connectRoomNewPlayer);
        this.socket.on("sendMessageOtherPlayers", reciveMessage);
        this.socket.on("setTypingOtherPlayers", reciveStateTyping);
    }

    conectRoom(data) {
        const { id, name } = data;
        this.player = { id: id, name: name, typing: false };
        this.socket.emit("connectedRoom", this.player)
    }
    sendMessage(message) {
        //display in my interface
        const { id, name } = this.player;
        //send to other players for display in your interface
        this.socket.emit("sendMessageOtherPlayers", {
            id: id,
            name: name,
            message: message
        })
    }
    setTyping(state) {
        const { id, name, statePlayer } = this.player;
        if (state !== statePlayer) {
            this.player.state = state;
            //send to other players for display in your interface
            this.socket.emit("setTypingOtherPlayers", {
                id: id,
                name: name,
                state: state
            })
        }
    }

    disconnectRoom() {
        this.socket.emit("disconnectRoom");
        delete this.players;
        this.players = [];
    }

}