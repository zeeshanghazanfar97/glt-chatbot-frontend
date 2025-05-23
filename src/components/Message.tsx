import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageType, ProductType } from '../types';
import { Bot, User } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { motion } from 'framer-motion';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { sendMessage } = useChat();
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} 
        animate-messageAppear transition-all duration-300`}
    >
      <div 
        className={`flex max-w-[85%] ${isBot ? 'flex-row' : 'flex-row-reverse'} items-end`}
      >
        <div 
          className={`flex items-center justify-center w-8 h-8 rounded-full
            ${isBot ? 'bg-gradient-to-br from-pink-400 to-pink-400 text-white mr-2' : 
              'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 ml-2'}`}
        >
          {isBot ? <Bot size={16} /> : <User size={16} />}
        </div>
        <div 
          className={`rounded-2xl py-3 px-4 shadow-sm
            ${isBot 
              ? 'bg-white text-gray-800 rounded-tl-none prose prose-pink max-w-none' 
              : 'bg-gradient-to-br from-pink-400 to-pink-400 text-white rounded-tr-none'}`}
        >
          {isBot ? (
            <ReactMarkdown className="text-sm leading-relaxed">{message.text}</ReactMarkdown>
          ) : (
            <p className="text-sm">{message.text}</p>
          )}
          
          {message.suggestions && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(message.suggestions).map(([key, value]) => (
                <button 
                  key={key}
                  onClick={() => sendMessage(value)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium
                    ${isBot 
                      ? 'bg-pink-400 text-white hover:bg-pink-500' 
                      : 'bg-white/20 text-white hover:bg-white/30'} 
                    transition-all duration-200 hover:shadow-md`}
                >
                  {key}
                </button>
              ))}
            </div>
          )}
          
          <span className="block text-right text-xs mt-1 opacity-70">
            {message.time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;