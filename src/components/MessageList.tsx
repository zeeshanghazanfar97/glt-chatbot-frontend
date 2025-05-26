import React from 'react';
import Message from './Message';
import { useChat } from '../context/ChatContext';
import WelcomeMessage from './WelcomeMessage';

const MessageList: React.FC = () => {
  const { messages } = useChat();

  return (
    <div className="space-y-4 animate-fadeIn">
      {messages.length === 0 ? (
        <WelcomeMessage />
      ) : (
        messages.map((message) => (
          <Message
            key={message.id}
            message={message}
          />
        ))
      )}
    </div>
  );
};

export default MessageList;
