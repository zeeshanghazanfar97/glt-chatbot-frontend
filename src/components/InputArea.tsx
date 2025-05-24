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
      const maxHeight = Math.min(window.visualViewport?.height || window.innerHeight, window.innerHeight) / 4;
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
        textareaRef.current.style.height = 'auto';
        textareaRef.current.blur();
      }
    }
  };

  return (
    <div className="sticky bottom-0 p-3 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-2 max-w-4xl mx-auto">
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border border-pink-100 rounded-2xl px-3.5 py-2.5 focus:outline-none focus:ring-2 
              focus:ring-pink-300 focus:border-pink-300 resize-none placeholder-gray-400 text-gray-700
              min-h-[44px] text-base"
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
          className={`p-3 rounded-xl bg-gradient-to-br from-pink-400 to-pink-500 text-white 
            transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed 
            disabled:active:scale-100 ${message.trim() ? 'opacity-100' : 'opacity-50'}`}
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