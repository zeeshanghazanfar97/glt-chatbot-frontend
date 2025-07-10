import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OutroAnimation: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [showReplay, setShowReplay] = useState(false);

  // Auto-advance through phases
  useEffect(() => {
    const timings = [3000, 2000, 2500, 3000]; // Duration for each phase
    
    if (phase < timings.length) {
      const timer = setTimeout(() => {
        setPhase(phase + 1);
      }, timings[phase]);
      
      return () => clearTimeout(timer);
    } else {
      // Show replay button after animation completes
      const timer = setTimeout(() => {
        setShowReplay(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const resetAnimation = () => {
    setPhase(0);
    setShowReplay(false);
  };

  // Phase 0: Logo Formation
  const LogoFormation = () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        {/* Particle burst effect */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-pink-400 rounded-full"
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              x: Math.cos(i * 22.5 * Math.PI / 180) * 150,
              y: Math.sin(i * 22.5 * Math.PI / 180) * 150,
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.05,
              ease: "easeOut"
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}

        {/* Main logo container with dramatic entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.5,
            duration: 1.5
          }}
          className="relative w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
        >
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 0.4, 0.8]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Heart icon with entrance animation */}
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="relative z-10"
          >
            <Heart className="w-16 h-16 text-white" fill="white" />
          </motion.div>

          {/* Sparkle effects around logo */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2,
                delay: 1.5 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 60}%`,
                top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 60}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <Sparkles className="w-4 h-4 text-pink-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );

  // Phase 1: Brand Name Reveal
  const BrandNameReveal = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Logo (smaller, positioned above) */}
      <motion.div
        initial={{ y: 0, scale: 1 }}
        animate={{ y: -50, scale: 0.6 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl mb-8"
      >
        <Heart className="w-16 h-16 text-white" fill="white" />
      </motion.div>

      {/* Brand name with letter-by-letter animation */}
      <div className="mb-6">
        <motion.div className="flex items-center justify-center space-x-1">
          {"Girlz Love Tech".split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: index * 0.08,
                duration: 0.6,
                type: "spring",
                stiffness: 200
              }}
              className={`text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent ${
                letter === ' ' ? 'w-4' : ''
              }`}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Underline animation */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        className="h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full max-w-lg"
      />
    </div>
  );

  // Phase 2: Tagline Reveal
  const TaglineReveal = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Logo (even smaller, top position) */}
      <motion.div
        initial={{ scale: 0.6, y: -50 }}
        animate={{ scale: 0.4, y: -80 }}
        transition={{ duration: 0.6 }}
        className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-lg mb-4"
      >
        <Heart className="w-16 h-16 text-white" fill="white" />
      </motion.div>

      {/* Brand name (smaller) */}
      <motion.h1
        initial={{ scale: 1 }}
        animate={{ scale: 0.7 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-8"
      >
        Girlz Love Tech
      </motion.h1>

      {/* Tagline with elegant entrance */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 150
        }}
        className="relative"
      >
        <motion.p
          className="text-2xl text-gray-600 font-medium tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Empowering Tomorrow's Tech Leaders
        </motion.p>

        {/* Decorative elements around tagline */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute -left-12 top-1/2 transform -translate-y-1/2"
        >
          <Star className="w-6 h-6 text-pink-400" />
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute -right-12 top-1/2 transform -translate-y-1/2"
        >
          <Star className="w-6 h-6 text-pink-400" />
        </motion.div>
      </motion.div>
    </div>
  );

  // Phase 3: Final Flourish
  const FinalFlourish = () => (
    <div className="flex flex-col items-center justify-center h-full text-center relative">
      {/* Background energy waves */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-pink-300 rounded-full opacity-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 3],
            opacity: [0, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            delay: i * 0.3,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Complete brand lockup */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        {/* Logo */}
        <motion.div
          className="w-24 h-24 bg-gradient-to-br from-pink-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl mx-auto mb-6"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-12 h-12 text-white" fill="white" />
        </motion.div>

        {/* Brand name */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4">
          Girlz Love Tech
        </h1>

        {/* Tagline */}
        <p className="text-xl text-gray-600 font-medium mb-8">
          Empowering Tomorrow's Tech Leaders
        </p>

        {/* Floating icons animation */}
        {[
          { Icon: Zap, delay: 0, x: -100, y: -50 },
          { Icon: Star, delay: 0.2, x: 100, y: -30 },
          { Icon: Sparkles, delay: 0.4, x: -80, y: 40 },
          { Icon: Heart, delay: 0.6, x: 90, y: 50 }
        ].map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0, 
              opacity: 0,
              rotate: 0
            }}
            animate={{ 
              x, 
              y, 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 0.7],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              delay: delay + 1,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <Icon className="w-8 h-8 text-pink-400" />
          </motion.div>
        ))}
      </motion.div>

      {/* Final sparkle burst */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          delay: 2,
          duration: 1.5,
          ease: "easeOut"
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-pink-400 rounded-full"
            animate={{
              x: Math.cos(i * 18 * Math.PI / 180) * 200,
              y: Math.sin(i * 18 * Math.PI / 180) * 200,
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              delay: 2 + i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5 bg-gradient-to-br from-pink-300 to-purple-300"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.1, 1],
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

      {/* Main animation content */}
      <div className="relative z-10 w-full h-screen">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <LogoFormation />
            </motion.div>
          )}
          
          {phase === 1 && (
            <motion.div
              key="brand"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <BrandNameReveal />
            </motion.div>
          )}
          
          {phase === 2 && (
            <motion.div
              key="tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <TaglineReveal />
            </motion.div>
          )}
          
          {phase >= 3 && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <FinalFlourish />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Replay button */}
      <AnimatePresence>
        {showReplay && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={resetAnimation}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 z-20"
          >
            Replay Animation
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              phase >= index ? 'bg-pink-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default OutroAnimation;