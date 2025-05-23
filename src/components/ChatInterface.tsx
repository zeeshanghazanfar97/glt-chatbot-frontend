import React, { useEffect, useRef } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import InputArea from './InputArea';
import QuickButtons from './QuickButtons';
import { useChat } from '../context/ChatContext';

interface ChatInterfaceProps {
  onMenuClick: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onMenuClick }) => {
  const { messages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle viewport height changes (e.g., when keyboard shows/hides)
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        containerRef.current.style.height = `${window.visualViewport?.height}px`;
      }
    };

    window.visualViewport?.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.visualViewport?.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col w-full bg-white overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <Header onMenuClick={onMenuClick} />
      <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
        <MessageList />
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-pink-100 mt-auto">
        <QuickButtons />
        <InputArea />
      </div>
    </div>
  );
};

export default ChatInterface;