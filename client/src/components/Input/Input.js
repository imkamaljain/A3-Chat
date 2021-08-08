import React from 'react';
import './Input.css';
import { IoSend } from 'react-icons/io5';

const Input = ({ setMessage, sendMessage, message }) => (
  <div className="inputContainer">
    <input
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <div onClick={e => sendMessage(e)}>
      <IoSend />
    </div>
  </div>
)

export default Input;