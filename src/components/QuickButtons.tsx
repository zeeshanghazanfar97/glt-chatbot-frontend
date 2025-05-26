import React from 'react';
import { Heart, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const buttons = [
  { 
    id: 'wellness', 
    label: 'Wellness', 
    icon: <Heart size={14} />, 
    prompt: 'Tell me about personal hygiene and wellness tips'
  },
  { 
    id: 'tech', 
    label: 'Tech', 
    icon: <Sparkles size={14} />, 
    prompt: 'How can I learn more about computers and technology?'
  },
  { 
    id: 'careers', 
    label: 'Careers', 
    icon: <Briefcase size={14} />, 
    prompt: 'What careers can I explore in tech?'
  },
  { 
    id: 'kits', 
    label: 'Kits', 
    icon: <BookOpen size={14} />, 
    prompt: 'How can I get a free hygiene kit?'
  }
];

const QuickButtons: React.FC = () => {
  const { sendMessage } = useChat();

  return (
    <div className="px-3 py-2 overflow-x-auto bg-gray-50/50 md:bg-transparent">
      <div className="flex gap-2">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => sendMessage(button.prompt)}
            className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 bg-white 
              text-pink-500 rounded-full text-xs font-medium border border-pink-100
              active:bg-pink-50 transition-colors duration-200 md:hover:bg-pink-50"
          >
            {button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickButtons;
