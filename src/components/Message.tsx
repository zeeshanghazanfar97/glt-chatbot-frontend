import React from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageType } from '../types';
import { Bot, User } from 'lucide-react';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} 
        animate-messageAppear transition-all duration-300`}
    >
      <div 
        className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}
      >
        <div 
          className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0
            ${isBot ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white' : 
              'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600'}`}
        >
          {isBot ? <Bot size={14} /> : <User size={14} />}
        </div>
        <div 
          className={`rounded-2xl py-2.5 px-3.5 shadow-sm
            ${isBot 
              ? 'bg-white text-gray-800 rounded-tl-none prose prose-pink max-w-none' 
              : 'bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-tr-none'}`}
        >
          {isBot ? (
            <ReactMarkdown className="text-sm leading-relaxed">{message.text}</ReactMarkdown>
          ) : (
            <p className="text-sm">{message.text}</p>
          )}
          
          {message.suggestions && (
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(message.suggestions).map(([key, value]) => (
                <button 
                  key={key}
                  onClick={() => sendMessage(value)}
                  className={`text-xs px-2.5 py-1 rounded-full font-medium
                    ${isBot 
                      ? 'bg-pink-500 text-white hover:bg-pink-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'} 
                    transition-all duration-200`}
                >
                  {key}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;