import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import MessageList from './MessageList';
import InputArea from './InputArea';
import QuickButtons from './QuickButtons';
import { useChat } from '../context/ChatContext';
import BadgeNotification from './BadgeNotification';
import { BadgeType } from '../types';

interface ChatInterfaceProps {
  onMenuClick: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onMenuClick }) => {
  const { messages } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [currentBadge, setCurrentBadge] = useState<BadgeType | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Check for badges in the latest message
    const latestMessage = messages[messages.length - 1];
    if (latestMessage?.badges_earned?.length) {
      setCurrentBadge(latestMessage.badges_earned[0]);
    }
  }, [messages]);

  // Handle viewport height changes (e.g., when keyboard shows/hides)
  useEffect(() => {
    if (!window.visualViewport) return;

    const onVisualViewportChange = () => {
      if (!containerRef.current || !messagesRef.current) return;

      const viewport = window.visualViewport;
      const isKeyboardVisible = window.innerHeight - viewport.height > 150;

      // Update container height to match viewport
      containerRef.current.style.height = `${viewport.height}px`;
      containerRef.current.style.transform = `translateY(${-Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)}px)`;

      // Adjust message container padding when keyboard is visible
      messagesRef.current.style.paddingBottom = isKeyboardVisible ? '0px' : '16px';

      // Scroll to bottom when keyboard appears
      if (isKeyboardVisible) {
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.visualViewport.addEventListener('resize', onVisualViewportChange);
    window.visualViewport.addEventListener('scroll', onVisualViewportChange);

    // Initial setup
    onVisualViewportChange();

    return () => {
      window.visualViewport.removeEventListener('resize', onVisualViewportChange);
      window.visualViewport.removeEventListener('scroll', onVisualViewportChange);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="flex flex-col w-full bg-white overflow-hidden"
      style={{ height: '100dvh' }}
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

      {currentBadge && (
        <BadgeNotification 
          badge={currentBadge} 
          onClose={() => setCurrentBadge(null)} 
        />
      )}
    </div>
  );
};

export default ChatInterface;