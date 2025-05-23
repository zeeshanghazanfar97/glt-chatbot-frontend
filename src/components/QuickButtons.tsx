import React from 'react';
import { Heart, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const buttons = [
  { 
    id: 'wellness', 
    label: 'Wellness', 
    icon: <Heart size={16} />, 
    prompt: 'Tell me about personal hygiene and wellness tips'
  },
  { 
    id: 'tech', 
    label: 'Tech Skills', 
    icon: <Sparkles size={16} />, 
    prompt: 'How can I learn more about computers and technology?'
  },
  { 
    id: 'careers', 
    label: 'Careers', 
    icon: <Briefcase size={16} />, 
    prompt: 'What careers can I explore in tech?'
  },
  { 
    id: 'kits', 
    label: 'Hygiene Kits', 
    icon: <BookOpen size={16} />, 
    prompt: 'How can I get a free hygiene kit?'
  }
];

const QuickButtons: React.FC = () => {
  const { sendMessage } = useChat();

  const handleButtonClick = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="px-4 py-2 overflow-x-auto md:block hidden">
      <div className="flex gap-2 pb-1">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.prompt)}
            className="flex items-center gap-1 whitespace-nowrap px-3 py-1.5 bg-pink-50 
              text-pink-600 rounded-full text-xs font-medium hover:bg-pink-100 
              transition-colors duration-200"
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