import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const InputArea: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, isTyping } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const maxHeight = Math.min(window.innerHeight * 0.2, 100);
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  return (
    <div className="p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-4xl mx-auto">
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border border-pink-100 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 
              focus:ring-pink-300 focus:border-pink-300 resize-none placeholder-gray-400 text-gray-700
              min-h-[44px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          {isTyping && (
            <div className="absolute -top-2 left-4 bg-gray-800 text-white text-xs py-1 px-3 
              rounded-full shadow-lg animate-fadeIn">
              GLT is typing...
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className={`p-3 rounded-xl bg-gradient-to-br from-pink-500 to-pink-400 text-white 
            transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed 
            disabled:hover:shadow-none ${message.trim() ? 'opacity-100' : 'opacity-50'}`}
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default InputArea;