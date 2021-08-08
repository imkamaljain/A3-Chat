import io from "socket.io-client";

const ENDPOINT = 'https://a3chat.herokuapp.com/';
let socket = io(ENDPOINT);

export default socket;