import { useState } from 'react';
import { format, startOfWeek, addDays, subDays } from 'date-fns';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const SleepTracker = () => {
  const { isDarkMode } = useTheme();
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepData, setSleepData] = useState({
    '2023-06-04': 6.5,
    '2023-06-05': 7,
    '2023-06-06': 7.5,
    '2023-06-07': 8,
    '2023-06-08': 6,
    '2023-06-09': 7.5,
    '2023-06-10': 8.5,
  });

  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleSleepChange = (e) => {
    setSleepHours(parseFloat(e.target.value));
  };

  const logSleep = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setSleepData(prev => {
      const updated = { ...prev, [today]: sleepHours };
      return updated;
    });
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

  const getQualityColor = (hours) => {
    if (hours >= 7 && hours <= 9) return 'from-green-400 to-green-600';
    if (hours >= 6 && hours < 7) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  }

  // Theme-based classes
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/90 border border-indigo-100 text-gray-800 shadow-md';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-indigo-50/80 border border-indigo-100 text-gray-800';
  const sectionTitle = isDarkMode ? 'text-indigo-300' : 'text-indigo-600';
  const inputBg = isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white/90 border-indigo-100 text-gray-800 placeholder-gray-400';
  const inputFocus = isDarkMode ? 'focus:ring-indigo-400 focus:border-indigo-400' : 'focus:ring-indigo-300 focus:border-indigo-300';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <motion.div 
      className="p-6 max-w-3xl mx-auto relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md text-white"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            😴
          </motion.div>
          Sleep Tracker
        </motion.h1>
      </div>
      {/* Sleep Log */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg mb-8 border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle}`}>Log Your Sleep</h2>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <label className={`text-sm font-medium ${sectionTitle}`}>
              Sleep Duration
          </label>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              {sleepHours.toFixed(1)} hours
            </span>
          </div>
          
          <div className="relative mt-6 mb-6">
            <div className="absolute -top-3 left-0 right-0 flex justify-between">
              <SunIcon className="w-6 h-6 text-yellow-500" />
              <MoonIcon className="w-6 h-6 text-indigo-600" />
            </div>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={sleepHours}
            onChange={handleSleepChange}
              className={`w-full h-3 rounded-lg appearance-none cursor-pointer accent-indigo-600 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}
          />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>4h</span>
            <span>8h</span>
            <span>12h</span>
          </div>
        </div>

          <motion.button
          onClick={logSleep}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-300/50 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
        >
          Log Sleep
          </motion.button>
      </div>
      </motion.div>

      {/* Sleep Insights */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg mb-8 border ${cardBg} relative z-10 overflow-hidden backdrop-blur-sm`}
        variants={itemVariants}
      >
        <div className={`absolute -right-16 -top-16 w-32 h-32 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-full opacity-40`}></div>
        <div className={`absolute -left-16 -bottom-16 w-32 h-32 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full opacity-40`}></div>
        
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle} relative z-10`}>Sleep Insights</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          <motion.div 
            className={`${isDarkMode ? 'bg-indigo-900/80 text-indigo-200 border-indigo-800' : 'bg-indigo-50/90 text-indigo-700 border-indigo-200'} p-5 rounded-xl border`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-indigo-400 mb-1">Average Sleep</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {(
                Object.values(sleepData).reduce((a, b) => a + b, 0) / 
                Object.values(sleepData).length
              ).toFixed(1)}h
            </p>
          </motion.div>
          <motion.div 
            className={`${isDarkMode ? 'bg-purple-900/80 text-purple-200 border-purple-800' : 'bg-purple-50/90 text-purple-700 border-purple-200'} p-5 rounded-xl border`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-purple-400 mb-1">Last Night</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {sleepData[format(subDays(new Date(), 1), 'yyyy-MM-dd')] || '--'}h
            </p>
          </motion.div>
        </div>

        <motion.div 
          className={`rounded-xl p-5 border ${cardInnerBg} relative z-10`}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className={`text-sm font-medium mb-2 ${sectionTitle}`}>Sleep Quality Tips</h3>
          <div className="text-sm space-y-2">
            <p className="flex gap-2 items-start">
              <span className="text-indigo-500">✓</span>
              <span>Adults should aim for 7-8 hours of quality sleep per night.</span>
            </p>
            <p className="flex gap-2 items-start">
              <span className="text-indigo-500">✓</span>
              <span>Consistent sleep patterns help improve overall health and cognitive function.</span>
            </p>
            <p className="flex gap-2 items-start">
              <span className="text-indigo-500">✓</span>
              <span>Reduce screen time 1 hour before bed for better sleep quality.</span>
          </p>
        </div>
        </motion.div>
      </motion.div>

      {/* Weekly Sleep Chart */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle}`}>Weekly Sleep Data</h2>
        <div className="grid grid-cols-7 gap-3 text-center">
          {weekDays.map((day, index) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const hours = sleepData[dateKey] || 0;
            const barHeight = Math.min(100, (hours / 10) * 100);
            const qualityColor = getQualityColor(hours);
            
            return (
              <motion.div 
                key={dateKey} 
                className="space-y-2"
                variants={itemVariants}
                custom={index}
              >
                <div className="text-xs font-medium text-gray-600">
                  {format(day, 'EEE')}
                </div>
                <div 
                  className={`relative h-40 rounded-xl overflow-hidden border ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
                  title={`${hours} hours`}
                >
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${qualityColor}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${barHeight}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  <motion.div 
                    className="absolute bottom-2 left-0 right-0 text-sm font-bold text-white mix-blend-difference"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {hours || '--'}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <div className="flex justify-center mt-8 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"></div>
            <span>Optimal (7-9h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
            <span>Adequate (6-7h)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600"></div>
            <span>Insufficient (&lt;6h)</span>
      </div>
    </div>
      </motion.div>
    </motion.div>
  );
};

export default SleepTracker;