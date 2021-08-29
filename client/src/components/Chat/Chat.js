import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { InfoBar, Messages, Input, socket, Loader } from '../../index';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import './Chat.css';

const Chat = ({ location }) => {
  let history = useHistory();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showInfoBar, setShowInfoBar] = useState(true);

  useEffect(() => {
    const { name, room } = location.state;
    setRoom(room);
    setName(name)
    socket.emit('welcome', { name, room }, (error) => {
      if (error) {
        doLogout();
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

    setShowInfoBar(window.innerWidth > 620);
  }, []);

  useEffect(() => {
    const handleResize = () => setShowInfoBar(window.innerWidth > 620);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  const toggleInfoBar = () => setShowInfoBar(!showInfoBar);

  const doLogout = () => {
    socket.disconnect(true);
    history.push('/');
  };

  return (
    <>
      <Loader />
      <div className="chatContainer">
        <div className="mobileHeader">
          <div onClick={toggleInfoBar}><FiMenu /></div>
          <div onClick={doLogout}><FiLogOut /></div>
        </div>
        {showInfoBar ? (<InfoBar room={room} users={users} />) : null}
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </>
  );
}

export default Chat;