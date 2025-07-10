import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Sparkles, Code, Users, Target, Zap, Star, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BrandingAnimation: React.FC = () => {
  const navigate = useNavigate();
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const brandColors = [
    '#FC7DAF', // Primary pink
    '#FFA4C8', // Light pink
    '#E56A9C', // Dark pink
    '#FF9DBF', // Medium pink
    '#FFE0EB', // Very light pink
  ];

  const animations = [
    {
      id: 'logo-reveal',
      title: 'Logo Reveal',
      description: 'Our heart-centered logo represents love for technology and empowerment'
    },
    {
      id: 'color-palette',
      title: 'Color Palette',
      description: 'Warm, empowering colors that inspire confidence and growth'
    },
    {
      id: 'typography',
      title: 'Typography',
      description: 'Clean, modern fonts that are both friendly and professional'
    },
    {
      id: 'icons',
      title: 'Icon System',
      description: 'Consistent iconography representing our core values'
    },
    {
      id: 'brand-values',
      title: 'Brand Values',
      description: 'The principles that guide everything we do'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % animations.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, animations.length]);

  const LogoRevealAnimation = () => (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 260, 
          damping: 20,
          duration: 1.5 
        }}
        className="relative"
      >
        {/* Outer glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-3xl scale-150"
        />
        
        {/* Main logo container */}
        <motion.div
          className="relative w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <Heart className="w-16 h-16 text-white" fill="white" />
          </motion.div>
        </motion.div>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-300 rounded-full"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              x: Math.cos(i * 45 * Math.PI / 180) * 100,
              y: Math.sin(i * 45 * Math.PI / 180) * 100,
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              delay: 1 + i * 0.1,
              duration: 2,
              repeat: Infinity,
              repeatDelay: 2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  const ColorPaletteAnimation = () => (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-5 gap-4">
        {brandColors.map((color, index) => (
          <motion.div
            key={color}
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ 
              delay: index * 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="relative group"
          >
            <motion.div
              className="w-20 h-20 rounded-2xl shadow-lg cursor-pointer"
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 + 0.5 }}
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-mono text-gray-600 whitespace-nowrap"
            >
              {color}
            </motion.div>
            
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-pink-300"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.5, 2], opacity: [0, 0.5, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
                ease: "easeOut"
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );

  const TypographyAnimation = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.h1
          className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          Girlz Love Tech
        </motion.h1>
        <motion.p
          className="text-xl text-gray-600 mt-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Empowering young women through technology
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
      >
        {[
          { size: 'text-3xl', weight: 'font-bold', text: 'Headlines' },
          { size: 'text-xl', weight: 'font-semibold', text: 'Subheadings' },
          { size: 'text-base', weight: 'font-normal', text: 'Body Text' }
        ].map((style, index) => (
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 + index * 0.2 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-100"
          >
            <div className={`${style.size} ${style.weight} text-gray-900 mb-2`}>
              {style.text}
            </div>
            <div className="text-sm text-gray-500">Quicksand Font</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  const IconSystemAnimation = () => {
    const icons = [
      { Icon: Heart, color: 'from-pink-400 to-rose-500', label: 'Wellness' },
      { Icon: Code, color: 'from-blue-400 to-indigo-500', label: 'Technology' },
      { Icon: Users, color: 'from-purple-400 to-pink-500', label: 'Community' },
      { Icon: Target, color: 'from-green-400 to-emerald-500', label: 'Goals' },
      { Icon: Zap, color: 'from-yellow-400 to-orange-500', label: 'Innovation' },
      { Icon: Shield, color: 'from-cyan-400 to-blue-500', label: 'Safety' }
    ];

    return (
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-3 gap-8">
          {icons.map(({ Icon, color, label }, index) => (
            <motion.div
              key={label}
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
              className="flex flex-col items-center group"
            >
              <motion.div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="text-sm font-medium text-gray-700 mt-3"
              >
                {label}
              </motion.span>
              
              {/* Pulse effect */}
              <motion.div
                className={`absolute w-20 h-20 rounded-2xl bg-gradient-to-br ${color} opacity-30`}
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const BrandValuesAnimation = () => {
    const values = [
      { 
        title: 'Empowerment', 
        description: 'Building confidence in young women',
        icon: Star,
        color: 'from-pink-400 to-rose-500'
      },
      { 
        title: 'Innovation', 
        description: 'Embracing cutting-edge technology',
        icon: Zap,
        color: 'from-blue-400 to-indigo-500'
      },
      { 
        title: 'Community', 
        description: 'Creating supportive networks',
        icon: Users,
        color: 'from-purple-400 to-pink-500'
      },
      { 
        title: 'Accessibility', 
        description: 'Making tech education available to all',
        icon: Globe,
        color: 'from-green-400 to-emerald-500'
      }
    ];

    return (
      <div className="flex items-center justify-center h-full">
        <div className="grid grid-cols-2 gap-8">
          {values.map(({ title, description, icon: Icon, color }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.2,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center group hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-lg`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3
                className="text-xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                {title}
              </motion.h3>
              <motion.p
                className="text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCurrentAnimation = () => {
    switch (animations[currentAnimation].id) {
      case 'logo-reveal':
        return <LogoRevealAnimation />;
      case 'color-palette':
        return <ColorPaletteAnimation />;
      case 'typography':
        return <TypographyAnimation />;
      case 'icons':
        return <IconSystemAnimation />;
      case 'brand-values':
        return <BrandValuesAnimation />;
      default:
        return <LogoRevealAnimation />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              background: `linear-gradient(45deg, ${brandColors[i % brandColors.length]}, ${brandColors[(i + 1) % brandColors.length]})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        {/* Animation Title */}
        <motion.div
          key={currentAnimation}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {animations[currentAnimation].title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {animations[currentAnimation].description}
          </p>
        </motion.div>

        {/* Animation Container */}
        <div className="w-full max-w-4xl h-96 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnimation}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {renderCurrentAnimation()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center gap-3 mt-12">
          {animations.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentAnimation(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentAnimation 
                  ? 'bg-pink-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mt-6">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentAnimation + 1) / animations.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{currentAnimation + 1} of {animations.length}</span>
            <span>{Math.round(((currentAnimation + 1) / animations.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Girlz Love Tech Brand Identity
          </h3>
          <p className="text-gray-600">
            Our visual identity reflects our mission to empower young women through technology, 
            combining warmth, professionalism, and innovation in every design element.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandingAnimation;