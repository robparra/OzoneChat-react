/* eslint-disable no-prototype-builtins */
const ioSocket = require("socket.io")(3231);

const io = ioSocket.of("/socket");

class Player {
    constructor(data, _socketID) {
        this.id = data.id;
        this.name = data.name;
        this.tipyng = false;
        this.socketID = _socketID;
    }
}
let players = [];
const currentRoom = "main"

io.on("connection", (socket) => {

    const disconnect = () => {
        console.log("data", socket.id)

        let player = players.filter(object => object.socketID == socket.id)
        let userID = (player.length) ? player[0].id : 0;
        console.log("disconnect player", player, userID)
        players = players.filter(object => object.socketID != socket.id)
        socket.leave(currentRoom, () => {
            socket.to(currentRoom).emit("disconnectRoom", userID);
        });
    }

    const connectToRoom = (data) => {
        console.log("data", data)
        console.log("data", players)
        let player = players.filter(object => object.id == data.id)[0];
        console.log("data", player)

        if (!player) {
            player = new Player(data, socket.id);
            players.push(player);
        }
        console.log("player", player)

        socket.join(currentRoom, () => {
            io.to(socket.id).emit("connectedRoom", players.filter(obj => obj.id != data.id));
            socket.to(currentRoom).emit("connectedOtherPlayer", player);
        });
    }

    const sendMessage = (data) => {
        console.log("data", data)

        socket.to(currentRoom).emit("sendMessageOtherPlayers", data);
    }

    const setTyping = (data) => {
        console.log("data", data)

        let player = player = players.filter(object => object.id == data.id)[0];
        if (player.tipyng != data.tipyng) {
            socket.to(currentRoom).emit("setTypingOtherPlayers", data);
            player.tipyng = data.tipyng;
        }
    }

    socket.on("disconnect", disconnect);
    socket.on("disconnectRoom", disconnect);
    socket.on("connectedRoom", connectToRoom);
    socket.on("sendMessageOtherPlayers", sendMessage);
    socket.on("setTypingOtherPlayers", setTyping);
});
