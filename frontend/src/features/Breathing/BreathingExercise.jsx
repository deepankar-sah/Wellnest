import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const breathingTechniques = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.",
    pattern: [4, 7, 8],
    cycles: 4,
    color: "from-blue-400 to-indigo-600"
  },
  {
    name: "Box Breathing",
    description: "Inhale, hold, exhale, and hold again - each for 4 seconds.",
    pattern: [4, 4, 4, 4],
    cycles: 5,
    color: "from-purple-400 to-pink-600"
  },
  {
    name: "Deep Breathing",
    description: "Simple deep breathing with equal inhale and exhale.",
    pattern: [5, 0, 5],
    cycles: 6,
    color: "from-emerald-400 to-teal-600"
  }
];

export default function BreathingExercise() {
  const { isDarkMode } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const [circleSize, setCircleSize] = useState(100);

  const phases = [
    { name: "Inhale", color: "bg-gradient-to-r from-blue-400 to-sky-500" },
    { name: "Hold", color: "bg-gradient-to-r from-purple-400 to-indigo-500" },
    { name: "Exhale", color: "bg-gradient-to-r from-emerald-400 to-teal-500" },
    { name: "Hold", color: "bg-gradient-to-r from-purple-400 to-indigo-500" }
  ];

  const technique = breathingTechniques[currentTechnique];
  const currentPhaseName = phases[currentPhase % phases.length].name;
  const currentPhaseColor = phases[currentPhase % phases.length].color;

  useEffect(() => {
    if (isActive) {
      startBreathing();
    } else {
      stopBreathing();
    }
    return () => stopBreathing();
  }, [isActive, currentTechnique]);

  useEffect(() => {
    if (isActive) {
      const currentPhaseDuration = technique.pattern[currentPhase % technique.pattern.length];
      
      // Skip phases with 0 duration immediately
      if (currentPhaseDuration === 0) {
        nextPhase();
        return;
      }

      setTimeLeft(currentPhaseDuration);
      
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            nextPhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timerRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [currentPhase, isActive, technique]);

  useEffect(() => {
    // Breathing animation
    if (isActive) {
      const totalTime = technique.pattern[currentPhase % technique.pattern.length];
      if (totalTime === 0) return; 
      
      const steps = totalTime * 10;
      let step = 0;
      
      const animate = () => {
        if (currentPhaseName === "Inhale") {
          setCircleSize(100 + (step / steps) * 150);
        } else if (currentPhaseName === "Exhale") {
          setCircleSize(250 - (step / steps) * 150);
        }
        step++;
        if (step <= steps) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animate();
      return () => cancelAnimationFrame(animationRef.current);
    } else {
      setCircleSize(100);
    }
  }, [currentPhase, isActive, currentPhaseName, technique]);

  const startBreathing = () => {
    setCurrentPhase(0);
    setCycleCount(0);
    const initialDuration = technique.pattern[0];
    setTimeLeft(initialDuration);
  };

  const stopBreathing = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    timerRef.current = null;
    animationRef.current = null;
  };

  const nextPhase = () => {
    const nextPhase = (currentPhase + 1) % technique.pattern.length;
    const nextDuration = technique.pattern[nextPhase];
    
    setCurrentPhase(nextPhase);
    setTimeLeft(nextDuration);
    
    if (nextPhase === 0) {
      setCycleCount(prev => {
        if (prev + 1 >= technique.cycles) {
          setIsActive(false);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeLeft(technique.pattern[0]);
    setCycleCount(0);
  };

  const changeTechnique = (index) => {
    setCurrentTechnique(index);
    resetBreathing();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  // Theme-based classes
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/90 border border-purple-100 text-gray-800 shadow-md';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-purple-50/80 border border-purple-100 text-gray-800';
  const sectionTitle = isDarkMode ? 'text-purple-300' : 'text-purple-600';
  const inputBg = isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white/90 border-purple-100 text-gray-800 placeholder-gray-400';
  const inputFocus = isDarkMode ? 'focus:ring-purple-400 focus:border-purple-400' : 'focus:ring-purple-300 focus:border-purple-300';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <motion.div 
      className="p-6 max-w-3xl mx-auto relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-teal-900' : 'bg-teal-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-purple-500 to-teal-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-purple-500 to-teal-600 rounded-lg shadow-md text-white"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            🧘
          </motion.div>
          Breathing Exercise
        </motion.h1>
      </div>
      
      <motion.div 
        className={`rounded-2xl p-8 shadow-lg mb-8 border ${cardBg} relative z-10 overflow-hidden backdrop-blur-sm`}
        variants={itemVariants}
      >
        <div className={`absolute -right-32 -top-32 w-72 h-72 ${isDarkMode ? 'bg-pink-900' : 'bg-pink-100'} rounded-full opacity-20`}></div>
        
        <motion.h2 
          className={`text-xl font-semibold mb-4 ${sectionTitle} relative z-10`}
          variants={itemVariants}
        >
          {technique.name}
        </motion.h2>
        <motion.p 
          className={`mb-8 relative z-10 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}
          variants={itemVariants}
        >
          {technique.description}
        </motion.p>
        
        {/* Breathing Visualization */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${currentPhaseColor} opacity-10`}
                style={{ 
                  width: `${circleSize + i * 50}px`, 
                  height: `${circleSize + i * 50}px` 
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: i * 1
                }}
              />
            ))}
          </div>
          <motion.div 
            className={`relative rounded-full ${currentPhaseColor} flex items-center justify-center shadow-lg z-10`}
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <motion.span 
              className="text-white font-bold text-xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentPhaseName}
            </motion.span>
          </motion.div>
        </div>
        
        {/* Timer and Controls */}
        <div className="text-center mb-6 relative z-10">
          <motion.div 
            className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            animate={{ 
              scale: timeLeft <= 3 && isActive && timeLeft > 0 ? [1, 1.1, 1] : 1,
              transition: { duration: 0.5, repeat: timeLeft <= 3 && isActive && timeLeft > 0 ? Infinity : 0 }
            }}
          >
            {timeLeft}s
          </motion.div>
          <div className={`text-gray-400 mb-6 ${isDarkMode ? 'text-gray-300' : ''}`}>
            Cycle {cycleCount + 1} of {technique.cycles}
          </div>
          <div className="flex justify-center gap-4">
            <motion.button
              onClick={toggleBreathing}
              className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-md hover:shadow-lg ${
                isActive 
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-red-300/50' 
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-green-300/50'
              } text-white font-medium transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? (
                <>
                  <PauseIcon className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  Start
                </>
              )}
            </motion.button>
            <motion.button
              onClick={resetBreathing}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-md hover:shadow transition-all ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowPathIcon className="w-5 h-5" />
              Reset
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Techniques */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <motion.h2 
          className={`text-xl font-semibold mb-5 ${sectionTitle}`}
          variants={itemVariants}
        >
          Breathing Techniques
        </motion.h2>
        <div className="space-y-4">
          {breathingTechniques.map((tech, index) => (
            <motion.div
              key={tech.name}
              onClick={() => changeTechnique(index)}
              className={`p-5 rounded-xl cursor-pointer transition border ${
                currentTechnique === index
                  ? 'bg-gradient-to-r bg-opacity-20 shadow-md'
                  : isDarkMode ? 'bg-gray-900 hover:bg-gray-800 border-gray-800' : 'bg-gray-50 hover:bg-gray-100 border-gray-100'
              }`}
              style={{
                backgroundImage: currentTechnique === index ? `linear-gradient(to right, ${tech.color.split(' ')[1]}20, ${tech.color.split(' ')[3]}20)` : '',
                borderColor: currentTechnique === index ? `#d8b4fe` : ''
              }}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              animate={{ 
                scale: currentTechnique === index ? [1, 1.01, 1] : 1,
                transition: { 
                  duration: 2, 
                  repeat: currentTechnique === index ? Infinity : 0,
                  repeatType: "reverse" 
                }
              }}
            >
              <h3 className={`font-medium text-lg ${
                currentTechnique === index 
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
                  : isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {tech.name}
              </h3>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-600'}`}>{tech.description}</p>
              
              {currentTechnique === index && (
                <motion.div 
                  className="mt-2 flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {tech.pattern.map((seconds, i) => (
                    <motion.div
                      key={i}
                      className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {phases[i % phases.length].name}: {seconds}s
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}