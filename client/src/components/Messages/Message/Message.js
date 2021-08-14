import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  if (user === name) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer currentUser">
          <div>
            <p>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
      : (
        <div className="messageContainer otherUser">
          <div>
            <p>{user}</p>
            <p>{ReactEmoji.emojify(text)}</p>
          </div>
        </div>
      )
  );
}

export default Message;