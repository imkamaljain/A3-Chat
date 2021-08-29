import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { socket, Loader } from '../../index';
import './Login.css';

export default function Login() {
  let history = useHistory();
  const [user, setUser] = useState({
    name: '',
    room: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const doLogin = () => {
    const { name, room } = user;
    if (!name || !room) {
      alert('Please enter all required fields.');
      return;
    }
    socket.connect();
    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      } else {
        history.push({
          pathname: '/chat',
          state: user
        });
      }
    });
  };

  return (
    <>
      <Loader />
      <div className="loginContainer">
        <div className="leftContainer">
          <img className="logo"></img>
          <h1 className="heading">Welcome to A3 Chat</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name="name" placeholder="Username" className="inputTextbox mt-10" maxLength="15"
              onChange={handleChange}
              onKeyPress={event => event.key === 'Enter' ? doLogin() : null} />
          </div>
          <div className="mt-20">
            <label htmlFor="room">Room:</label>
            <input type="text" name="room" placeholder="Room" className="inputTextbox mt-10" maxLength="15"
              onChange={handleChange}
              onKeyPress={event => event.key === 'Enter' ? doLogin() : null} />
          </div>
          <div>
            <button className="loginButton" type="submit" onClick={doLogin}>Sign In</button>
          </div>
        </div>
        <div className="rightContainer">
        </div>
      </div>
    </>
  );
}