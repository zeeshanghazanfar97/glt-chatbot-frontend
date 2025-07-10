import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Code, Users, Target, Zap, Star, Globe, Shield, Palette, Brush, Type, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BrandingAnimation: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const brandColors = [
    { hex: '#FC7DAF', name: 'Primary Pink', usage: 'Main brand color, CTAs, highlights' },
    { hex: '#FFA4C8', name: 'Light Pink', usage: 'Backgrounds, soft accents' },
    { hex: '#E56A9C', name: 'Dark Pink', usage: 'Text, borders, emphasis' },
    { hex: '#FF9DBF', name: 'Medium Pink', usage: 'Gradients, hover states' },
    { hex: '#FFE0EB', name: 'Blush Pink', usage: 'Subtle backgrounds, cards' },
  ];

  const animations = [
    {
      id: 'logo-reveal',
      title: '',
      description: ''
    },
    {
      id: 'brand-values',
      title: '',
      description: ''
    },
    {
      id: 'color-palette',
      title: 'Color System',
      description: 'Warm, empowering colors that inspire confidence, growth, and technological innovation'
    },
    {
      id: 'typography',
      title: 'Typography',
      description: 'Quicksand font family - clean, modern, and approachable for all age groups'
    },
    {
      id: 'icons',
      title: 'Icon Language',
      description: 'Consistent iconography representing wellness, technology, community, and empowerment'
    },
    {
      id: 'applications',
      title: 'Brand Applications',
      description: 'How our brand comes to life across digital platforms and educational materials'
    }
  ];

  // Handle spacebar press to advance animation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setCurrentAnimation((prev) => (prev + 1) % animations.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [animations.length]);

  const LogoRevealAnimation = () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            duration: 2 
          }}
          className="relative mb-8"
        >
          {/* Outer glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-3xl scale-150"
          />
          
          {/* Main logo container */}
          <motion.div
            className="relative w-40 h-40 bg-gradient-to-br from-pink-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
            >
              <Heart className="w-20 h-20 text-white" fill="white" />
            </motion.div>
          </motion.div>

          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-pink-300 rounded-full"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0 
              }}
              animate={{ 
                x: Math.cos(i * 30 * Math.PI / 180) * 120,
                y: Math.sin(i * 30 * Math.PI / 180) * 120,
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{ 
                delay: 1.5 + i * 0.1,
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}
        </motion.div>

        {/* Brand name reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4">
            Girlz Love Tech
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-xl text-gray-600 font-medium"
          >
            Empowering Young Women Through Technology
          </motion.p>
        </motion.div>
      </div>
    </div>
  );

  const ColorPaletteAnimation = () => (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Palette className="w-16 h-16 text-pink-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Brand Color Palette</h2>
          <p className="text-gray-600">Carefully selected colors that embody empowerment and innovation</p>
        </motion.div>

        <div className="grid grid-cols-5 gap-6">
          {brandColors.map((color, index) => (
            <motion.div
              key={color.hex}
              initial={{ scale: 0, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.15,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="text-center"
            >
              <motion.div
                className="w-24 h-24 rounded-2xl shadow-xl mb-4 mx-auto relative overflow-hidden"
                style={{ backgroundColor: color.hex }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  animate={{ 
                    x: [-100, 100],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 + 1,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.5 }}
              >
                <h4 className="font-bold text-gray-900 text-sm mb-1">{color.name}</h4>
                <p className="text-xs font-mono text-gray-600 mb-2">{color.hex}</p>
                <p className="text-xs text-gray-500 leading-tight">{color.usage}</p>
              </motion.div>
              
              {/* Ripple effect */}
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-2xl border-2 border-pink-300"
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: [1, 1.3, 1.6], opacity: [0, 0.6, 0] }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.4 + 2,
                  ease: "easeOut"
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Color harmony demonstration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 text-center"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Color Harmony in Action</h3>
          <div className="flex justify-center space-x-4">
            <div className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold">
              Primary Action
            </div>
            <div className="bg-pink-100 text-pink-700 px-6 py-3 rounded-xl font-semibold">
              Secondary Action
            </div>
            <div className="border-2 border-pink-400 text-pink-600 px-6 py-3 rounded-xl font-semibold">
              Outline Button
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const TypographyAnimation = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <Type className="w-16 h-16 text-pink-500 mx-auto mb-6" />
        <motion.h1
          className="text-7xl font-bold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
        >
          Quicksand
        </motion.h1>
        <motion.p
          className="text-2xl text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Modern • Friendly • Accessible
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full max-w-6xl"
      >
        {[
          { size: 'text-4xl', weight: 'font-bold', text: 'Bold Headlines', sample: 'Empowering Girls' },
          { size: 'text-2xl', weight: 'font-semibold', text: 'Semibold Subheads', sample: 'Technology Education' },
          { size: 'text-lg', weight: 'font-medium', text: 'Medium Labels', sample: 'Course Categories' },
          { size: 'text-base', weight: 'font-normal', text: 'Regular Body', sample: 'Learning content and descriptions' }
        ].map((style, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 + index * 0.15 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-100 text-center"
          >
            <div className={`${style.size} ${style.weight} text-gray-900 mb-3`}>
              {style.sample}
            </div>
            <div className="text-sm text-gray-600 mb-2">{style.text}</div>
            <div className="text-xs text-gray-500">Quicksand {style.weight.replace('font-', '')}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Typography in context */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="bg-white rounded-3xl p-8 shadow-xl max-w-2xl text-center"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Typography Hierarchy</h3>
        <p className="text-gray-600 leading-relaxed">
          Our typography system creates clear information hierarchy while maintaining 
          the friendly, approachable tone that makes technology education accessible 
          to young women of all backgrounds.
        </p>
      </motion.div>
    </div>
  );

  const IconSystemAnimation = () => {
    const iconCategories = [
      { 
        title: 'Core Values',
        icons: [
          { Icon: Heart, color: 'from-pink-400 to-rose-500', label: 'Wellness & Care' },
          { Icon: Code, color: 'from-blue-400 to-indigo-500', label: 'Technology' },
          { Icon: Users, color: 'from-purple-400 to-pink-500', label: 'Community' }
        ]
      },
      { 
        title: 'Education',
        icons: [
          { Icon: Target, color: 'from-green-400 to-emerald-500', label: 'Goal Setting' },
          { Icon: Zap, color: 'from-yellow-400 to-orange-500', label: 'Innovation' },
          { Icon: Award, color: 'from-indigo-400 to-purple-500', label: 'Achievement' }
        ]
      },
      { 
        title: 'Support',
        icons: [
          { Icon: Shield, color: 'from-cyan-400 to-blue-500', label: 'Safety & Privacy' },
          { Icon: Globe, color: 'from-teal-400 to-cyan-500', label: 'Global Reach' },
          { Icon: Star, color: 'from-amber-400 to-yellow-500', label: 'Excellence' }
        ]
      }
    ];

    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-5xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Sparkles className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Icon System</h2>
            <p className="text-gray-600">Consistent visual language across all touchpoints</p>
          </motion.div>

          <div className="space-y-12">
            {iconCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: categoryIndex * 0.3 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{category.title}</h3>
                <div className="grid grid-cols-3 gap-8">
                  {category.icons.map(({ Icon, color, label }, index) => (
                    <motion.div
                      key={label}
                      initial={{ scale: 0, rotate: -180, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{ 
                        delay: categoryIndex * 0.3 + index * 0.1,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                      className="flex flex-col items-center group"
                    >
                      <motion.div
                        className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 3,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-12 h-12 text-white relative z-10" />
                        
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                          animate={{ 
                            x: [-100, 100],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            delay: categoryIndex * 0.5 + index * 0.2 + 2,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: categoryIndex * 0.3 + index * 0.1 + 0.3 }}
                        className="text-sm font-medium text-gray-700 mt-4 text-center"
                      >
                        {label}
                      </motion.span>
                      
                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute w-24 h-24 rounded-2xl bg-gradient-to-br ${color} opacity-20`}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          delay: categoryIndex * 0.5 + index * 0.3 + 3
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BrandValuesAnimation = () => {
    const values = [
      { 
        title: 'Empowerment', 
        description: 'Building confidence and self-efficacy in young women through technology education and mentorship',
        icon: Star,
        color: 'from-pink-400 to-rose-500',
        stats: '95% report increased confidence'
      },
      { 
        title: 'Innovation', 
        description: 'Embracing cutting-edge technology and creative problem-solving approaches',
        icon: Zap,
        color: 'from-blue-400 to-indigo-500',
        stats: '50+ tech skills taught'
      },
      { 
        title: 'Community', 
        description: 'Creating supportive networks where young women can learn, grow, and thrive together',
        icon: Users,
        color: 'from-purple-400 to-pink-500',
        stats: '10,000+ students connected'
      },
      { 
        title: 'Accessibility', 
        description: 'Making technology education available and approachable for all backgrounds and skill levels',
        icon: Globe,
        color: 'from-green-400 to-emerald-500',
        stats: 'Available in 25+ schools'
      }
    ];

    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {values.map(({ title, description, icon: Icon, color, stats }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-6 shadow-lg relative overflow-hidden`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-10 h-10 text-white relative z-10" />
                  
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    animate={{ 
                      x: [-100, 100],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5 + 1,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
                
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {title}
                </motion.h3>
                
                <motion.p
                  className="text-gray-600 mb-4 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {description}
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                  className={`inline-block bg-gradient-to-r ${color} text-white px-4 py-2 rounded-xl text-sm font-semibold`}
                >
                  {stats}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ApplicationsAnimation = () => {
    const applications = [
      {
        title: 'Web Platform',
        description: 'Responsive design across all devices',
        preview: 'Chat Interface • Dashboard • Learning Modules',
        color: 'from-blue-400 to-cyan-500'
      },
      {
        title: 'Educational Materials',
        description: 'Branded learning resources and guides',
        preview: 'Hygiene Guides • Tech Tutorials • Career Resources',
        color: 'from-green-400 to-emerald-500'
      },
      {
        title: 'Marketing Assets',
        description: 'Consistent brand presence across channels',
        preview: 'Social Media • Presentations • Print Materials',
        color: 'from-purple-400 to-pink-500'
      },
      {
        title: 'Product Packaging',
        description: 'Hygiene kit packaging and inserts',
        preview: 'Kit Boxes • Information Cards • Thank You Notes',
        color: 'from-pink-400 to-rose-500'
      }
    ];

    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Brush className="w-16 h-16 text-pink-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Brand Applications</h2>
            <p className="text-gray-600">Consistent brand experience across all touchpoints</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 group hover:shadow-2xl transition-all duration-500"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div
                  className={`w-full h-32 rounded-2xl bg-gradient-to-br ${app.color} mb-6 flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Animated pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 20% 50%, white 2px, transparent 2px),
                                       radial-gradient(circle at 80% 50%, white 2px, transparent 2px)`,
                      backgroundSize: '30px 30px'
                    }}
                    animate={{ 
                      x: [0, 30, 0],
                      y: [0, -15, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <div className="text-white text-center relative z-10">
                    <div className="text-2xl font-bold mb-2">{app.title}</div>
                    <div className="text-sm opacity-90">{app.preview}</div>
                  </div>
                </motion.div>
                
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  {app.title}
                </motion.h3>
                
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.5 }}
                >
                  {app.description}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Brand consistency note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 text-center border border-pink-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Unified Brand Experience</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Every touchpoint reinforces our commitment to empowering young women through technology, 
              maintaining visual consistency while adapting to different contexts and audiences.
            </p>
          </motion.div>
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
      case 'applications':
        return <ApplicationsAnimation />;
      default:
        return <LogoRevealAnimation />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-5"
            style={{
              width: Math.random() * 400 + 200,
              height: Math.random() * 400 + 200,
              background: `linear-gradient(45deg, ${brandColors[i % brandColors.length].hex}, ${brandColors[(i + 1) % brandColors.length].hex})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 25 + Math.random() * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Animation Title */}
        <motion.div
          key={currentAnimation}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {animations[currentAnimation].title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {animations[currentAnimation].description}
          </p>
        </motion.div>

        {/* Animation Container */}
        <div className="w-full max-w-7xl h-[500px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAnimation}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {renderCurrentAnimation()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Sequence indicator (minimal) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2">
          {animations.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAnimation 
                  ? 'bg-pink-500 scale-125' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandingAnimation;