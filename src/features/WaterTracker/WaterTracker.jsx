// src/features/WaterTracker/WaterTracker.jsx
import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

export default function WaterTracker() {
  const { isDarkMode } = useTheme();
  const [dailyGoal] = useState(8); // 8 glasses (64oz)
  const [currentIntake, setCurrentIntake] = useState(3);
  const [weeklyData, setWeeklyData] = useState({
    '2023-06-04': 5,
    '2023-06-05': 2,
    '2023-06-06': 6,
    '2023-06-07': 7,
    '2023-06-08': 5,
    '2023-06-09': 7,
    '2023-06-10': 7,
  });

  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const addGlass = () => {
    if (currentIntake < dailyGoal) {
      setCurrentIntake(prev => prev + 1);
    }
  };

  const removeGlass = () => {
    if (currentIntake > 0) {
      setCurrentIntake(prev => prev - 1);
    }
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

  const waterDropVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500 } },
    exit: { scale: 0, opacity: 0 }
  };

  // Theme-based classes
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/80 border-blue-100 text-gray-900';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-900';
  const sectionTitle = isDarkMode ? 'text-blue-300' : 'text-blue-800';
  const inputBg = isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900';
  const inputFocus = isDarkMode ? 'focus:ring-blue-400 focus:border-blue-400' : 'focus:ring-blue-300 focus:border-blue-300';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <motion.div 
      className="p-6 max-w-3xl mx-auto relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-sky-900' : 'bg-sky-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-blue-500 to-sky-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-blue-500 to-sky-600 rounded-lg shadow-md"
            whileHover={{ scale: 1.05, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
          >
            <WaterDropIcon />
          </motion.div>
          Water Intake Tracker
        </motion.h1>
      </div>
      {/* Daily Tracker */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg mb-8 border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-semibold ${sectionTitle}`}>
            Today's Intake: <span className={`text-xl ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>{currentIntake} / {dailyGoal}</span> glasses
          </h2>
          <div className="flex gap-2">
            <motion.button 
              onClick={removeGlass}
              disabled={currentIntake <= 0}
              className={`p-2 rounded-full disabled:opacity-50 transition-colors shadow-sm ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MinusIcon className="w-5 h-5" />
            </motion.button>
            <motion.button 
              onClick={addGlass}
              disabled={currentIntake >= dailyGoal}
              className="p-2 bg-gradient-to-r from-blue-500 to-sky-600 text-white rounded-full disabled:opacity-50 shadow-md hover:shadow-lg hover:shadow-blue-300/50 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <PlusIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {Array.from({ length: dailyGoal }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-16 h-16 rounded-full flex items-center justify-center border ${
                i < currentIntake 
                  ? 'bg-gradient-to-r from-blue-400 to-sky-500 shadow-lg shadow-blue-200' 
                  : isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-200'
              }`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ 
                scale: i < currentIntake ? 1 : 0.85, 
                opacity: i < currentIntake ? 1 : 0.5,
                transition: { duration: 0.3 }
              }}
            >
              <AnimatePresence>
                {i < currentIntake && (
                  <motion.div 
                    className="w-8 h-8 text-white"
                    variants={waterDropVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <WaterDropIcon />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className={`rounded-xl p-5 border ${cardInnerBg}`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className={`font-medium mb-3 ${sectionTitle}`}>Hydration Tips</h3>
          <ul className="list-disc pl-5 text-sm space-y-2">
            <motion.li variants={itemVariants}>Drink a glass of water first thing in the morning</motion.li>
            <motion.li variants={itemVariants}>Keep a water bottle with you throughout the day</motion.li>
            <motion.li variants={itemVariants}>Set reminders if you often forget to drink</motion.li>
            <motion.li variants={itemVariants}>Add fruits or herbs to your water for flavor</motion.li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle}`}>Weekly Progress</h2>
        <div className="grid grid-cols-7 gap-3 text-center">
          {weekDays.map((day, index) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const glasses = weeklyData[dateKey] || 0;
            const percentage = Math.min(100, (glasses / dailyGoal) * 100);
            const today = isSameDay(day, new Date());
            
            return (
              <motion.div 
                key={dateKey} 
                className={`space-y-2 ${today ? 'ring-2 ring-blue-300 rounded-lg ring-offset-2' : ''}`}
                variants={itemVariants}
                custom={index}
              >
                <div className="text-xs font-medium text-gray-600">
                  {format(day, 'EEE')}
                </div>
                <div 
                  className={`relative h-40 rounded-xl overflow-hidden border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  title={`${glasses} glasses`}
                >
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 to-sky-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  <motion.div 
                    className="absolute bottom-2 left-0 right-0 text-sm font-bold"
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {glasses}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}