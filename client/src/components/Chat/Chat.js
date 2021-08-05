import React, { useState, useEffect } from "react";
import { InfoBar, Messages, Input } from "../../index";
import { socket } from '../../config/web-socket';
import './Chat.css';

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showInfoBar, setShowInfoBar] = useState(true);
  const toogleInfoBar = () => setShowInfoBar(!showInfoBar);

  useEffect(() => {
    const { name, room } = location.state;
    setRoom(room);
    setName(name)
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [location.state]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <div className="chatContainer">
      <div className="mobileHeader">
        <img className="listIcon" onClick={toogleInfoBar}></img>
        <a href="/"><img className="logoutIcon"></img></a>
      </div>
      {showInfoBar ? (<InfoBar room={room} users={users} />) : null}
      <Messages messages={messages} name={name} />
      <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
    </div>
  );
}

export default Chat;