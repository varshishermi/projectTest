import React from 'react';
import ChatInterface from '../components/ChatGPT/ChatInterface';


const ChatPage = () => {
  return (
    <div>
      <h2 style={{ color: 'green', textAlign: 'center' }}>Ask me any recipes. I am here to help :)</h2>
      <ChatInterface />
    </div>
  );
};

export default ChatPage;
