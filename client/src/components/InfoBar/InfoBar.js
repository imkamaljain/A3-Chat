import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { socket } from '../../index';
import { FiLogOut } from 'react-icons/fi';
import { CgSearch, CgProfile } from 'react-icons/cg';
import { RiCloseFill } from 'react-icons/ri';
import './InfoBar.css';

export default function InfoBar({ room, users }) {
  let history = useHistory();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showInfoBar, setShowInfoBar] = useState(true);

  useEffect(() => {
    if (search === '') {
      setFilteredUsers(users);
    }
  });

  const toggleInfoBar = () => setShowInfoBar(!showInfoBar);

  const onInput = value => {
    setSearch(value);
    let filteredUsersData = [];
    users.forEach(user => {
      if (user.name.toLowerCase().includes(value.toLowerCase()))
        filteredUsersData.push(user);
    });
    setFilteredUsers(filteredUsersData);
  };

  const doLogout = () => {
    socket.disconnect(true);
    history.push('/');
  };

  return (
    showInfoBar
      ? (
        <div className="infoBar">
          <div className="roomContainer">
            <span>Room: {room}</span>
            <div onClick={doLogout}><FiLogOut /></div>
            <div onClick={toggleInfoBar}><RiCloseFill /></div>
          </div>
          <div className="searchContainer">
            <CgSearch/>
            <input type="text" name="search" value={search} placeholder="Search by name" autoComplete="off"
              onChange={event => onInput(event.target.value)}
              onFocus={event => onInput(event.target.value)}
            />
          </div>
          <div className="usersList">
            {
              filteredUsers && filteredUsers.map(({ name }) => (
                <div>
                  <CgProfile />
                  <div>
                    <span key={name}>{name}</span>
                    <span>Online</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>)
      : null
  )
};