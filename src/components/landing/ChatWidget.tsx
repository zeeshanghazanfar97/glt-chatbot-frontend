import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from '../../utils/mockUuid';
import { MessageType } from '../../types';
import { sendChatMessage } from '../../services/chatService';

const ChatWidget: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: 'welcome',
      text: "Hi! I'm GLT, your friendly guide. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: MessageType = {
      id: uuidv4(),
      text: input.trim(),
      sender: 'user',
      time: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(input.trim());
      const botMessage: MessageType = {
        id: uuidv4(),
        text: response.text,
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
        suggestions: response.suggestions,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: MessageType = {
        id: uuidv4(),
        text: "I'm sorry, I couldn't process your message. Please try again.",
        sender: 'bot',
        time: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'bot'
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-pink-500 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2 text-gray-400"
          >
            <span className="animate-bounce">●</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-pink-500 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </>
  );
};

export default ChatWidget;