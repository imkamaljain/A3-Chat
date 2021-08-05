import io from "socket.io-client";

const ENDPOINT = 'https://a3chat.herokuapp.com/';

export const socket = io(ENDPOINT);