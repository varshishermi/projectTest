import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
// In ChatInterface.js or ChatPage.js
import './ChatStyles.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = () => {
    fetch('/api/chat', {  // Assuming '/api/chat' is the proxy endpoint in your Express server
      method: 'POST',
      body: JSON.stringify({ message: userInput }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then(response => response.json())
    .then(json => {
      // Append the bot's reply to the messages state
      const newMessages = [...messages, { id: Date.now(), text: userInput, sender: 'user' }, { id: Date.now(), text: json.reply, sender: 'bot' }];
      setMessages(newMessages);
    })
    .catch(error => {
      console.error('Error:', error);
    });

    setUserInput(''); // Clear the input after sending
  };


  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a new question..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatInterface;
