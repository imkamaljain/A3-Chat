import React, { useState, useEffect } from 'react';
import './InfoBar.css';

const InfoBar = ({ room, users }) => {
  const [showInfoBar, setShowInfoBar] = useState(true);
  const toogleInfoBar = () => setShowInfoBar(!showInfoBar);
  return (
    showInfoBar ? (
      <div className="infoBar">
        <div className="roomContainer">
          <span>Room: {room}</span>
        </div>
        <div className="closeIcon" onClick={toogleInfoBar}>
          <img></img>
        </div>
        <div className="usersContainer">
          <span>Users Online:</span>
          {
            users
              ? (
                <div className="usersList">
                  <ul>
                    {users.map(({ name }) => (
                      <li key={name}>
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              )
              : null
          }
        </div>
        <div className="signOutContainer">
          <a href="/">Sign Out</a>
        </div>
      </div>) : null
  )
};

export default InfoBar;