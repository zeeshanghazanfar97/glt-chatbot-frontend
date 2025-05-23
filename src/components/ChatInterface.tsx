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
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle viewport height changes (e.g., when keyboard shows/hides)
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current && messagesRef.current) {
        const vh = window.visualViewport?.height || window.innerHeight;
        const vw = window.visualViewport?.width || window.innerWidth;
        const offsetTop = window.visualViewport?.offsetTop || 0;

        // Update container height and scroll position
        containerRef.current.style.height = `${vh}px`;
        containerRef.current.style.width = `${vw}px`;
        containerRef.current.style.transform = `translateY(-${offsetTop}px)`;
      }
    };

    window.visualViewport?.addEventListener('resize', updateLayout);
    window.visualViewport?.addEventListener('scroll', updateLayout);
    updateLayout();

    return () => {
      window.visualViewport?.removeEventListener('resize', updateLayout);
      window.visualViewport?.removeEventListener('scroll', updateLayout);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col w-full bg-white overflow-hidden fixed inset-0"
    >
      <Header onMenuClick={onMenuClick} />
      <div 
        ref={messagesRef}
        className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent"
      >
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