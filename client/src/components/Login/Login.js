import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className="loginContainer">
      <div className="leftContainer">
          <img className="logo"></img>
          <h1 className="heading">Welcome to A3 Chat</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Username" className="inputTextbox mt-10" maxLength="20" onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="mt-20">
            <label htmlFor="room">Room:</label>
            <input type="text" placeholder="Room" className="inputTextbox mt-10" maxLength="20" onChange={(event) => setRoom(event.target.value)} />
          </div>
          <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
            <button className="loginButton" type="submit">Sign In</button>
          </Link>
      </div>
      <div className="rightContainer">
      </div>
    </div>
  );
}