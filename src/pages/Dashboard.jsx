import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoonIcon, SunIcon, HeartIcon, ChartBarIcon, PlusIcon, UserCircleIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Custom Water Drop Icon
const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-400">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const recentJournals = [
  {
    id: 1,
    date: '2023-11-10',
    title: 'Morning Reflection',
    preview: 'Today I woke up feeling energized and ready to tackle the day...'
  },
  {
    id: 2,
    date: '2023-11-09',
    title: 'Evening Thoughts',
    preview: 'Reflecting on today\'s achievements and planning for tomorrow...'
  }
];

const Dashboard = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [mood, setMood] = useState(null);
  const [waterIntake, setWaterIntake] = useState(3);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [calories, setCalories] = useState(840);

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-900/60 text-green-300' },
    { emoji: '😐', label: 'Neutral', color: 'bg-yellow-900/60 text-yellow-300' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-900/60 text-blue-300' }
  ];

  const addWaterGlass = () => {
    if (waterIntake < 8) setWaterIntake(prev => prev + 1);
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

  // Theme-based classes for light mode improvements
  const mainBg = isDarkMode ? 'bg-gradient-to-br from-gray-950 to-gray-900' : 'bg-white';
  const topBarText = isDarkMode ? 'text-white' : 'text-gray-900';
  const topBarBorder = isDarkMode ? 'border-b border-gray-800' : 'border-b border-gray-200';
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-900 shadow-sm';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-gray-50 border border-gray-100 text-gray-900';
  const accentLink = isDarkMode ? 'text-pink-400' : 'text-pink-600 hover:text-pink-700';
  const accentBlue = isDarkMode ? 'text-blue-300' : 'text-blue-700';
  const accentPurple = isDarkMode ? 'text-purple-300' : 'text-purple-700';
  const accentGreen = isDarkMode ? 'text-green-300' : 'text-green-700';
  const accentPink = isDarkMode ? 'text-pink-300' : 'text-pink-700';
  const accentYellow = isDarkMode ? 'text-yellow-300' : 'text-yellow-700';
  const accentRed = isDarkMode ? 'text-red-300' : 'text-red-700';

  return (
    <motion.div 
      className={`min-h-screen ${mainBg} p-0 md:p-8`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Top Bar */}
      <div className={`flex items-center justify-between mb-10 px-6 md:px-0 ${topBarBorder}`}>
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight uppercase ${topBarText}`}>Dashboard</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full border ${isDarkMode ? 'bg-gray-800 text-yellow-300 border-gray-700' : 'bg-gray-100 text-yellow-500 border-gray-200 hover:bg-yellow-50'} transition`}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
        variants={containerVariants}
      >
        {/* Mood Card */}
        <motion.div 
          className={`${cardBg} rounded-2xl p-6 flex flex-col gap-2`}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold">Mood</span>
            </div>
            <Link to="/dashboard/mood" className={`text-xs font-semibold hover:underline ${accentLink}`}>View</Link>
          </div>
          {mood ? (
            <div className={`flex items-center gap-2 p-3 rounded-xl ${mood.color}`}>
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-base">{mood.label}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-100 dark:bg-gray-800/60">
              <span className="text-gray-400 text-sm mb-2">No mood logged today</span>
              <Link to="/dashboard/mood" className={`text-xs font-semibold hover:underline ${accentLink}`}>Log Mood</Link>
            </div>
          )}
        </motion.div>

        {/* Water Card */}
        <motion.div 
          className={`${cardBg} rounded-2xl p-6 flex flex-col gap-2`}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <WaterDropIcon />
              </div>
              <span className="text-lg font-bold">Water</span>
            </div>
            <Link to="/dashboard/water" className={`text-xs font-semibold hover:underline ${accentLink}`}>View</Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-2xl font-bold ${accentBlue}`}>{waterIntake}</span>
            <span className="text-xs text-gray-400">/8 glasses</span>
            <motion.button 
              onClick={addWaterGlass}
              disabled={waterIntake >= 8}
              className="ml-auto p-2 bg-blue-700/80 text-white rounded-lg disabled:opacity-40 hover:bg-blue-600 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-4 h-4" />
            </motion.button>
          </div>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < waterIntake ? 'bg-blue-400' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Sleep Card */}
        <motion.div 
          className={`${cardBg} rounded-2xl p-6 flex flex-col gap-2`}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <MoonIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold">Sleep</span>
            </div>
            <Link to="/dashboard/sleep" className={`text-xs font-semibold hover:underline ${accentLink}`}>View</Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-2xl font-bold ${accentPurple}`}>{sleepHours}h</span>
            <span className="text-xs text-gray-400">last night</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-3">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-400 to-purple-600" 
              style={{ width: `${Math.min(100, (sleepHours / 10) * 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (sleepHours / 10) * 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* Meals Card */}
        <motion.div 
          className={`${cardBg} rounded-2xl p-6 flex flex-col gap-2`}
          variants={itemVariants}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🍎</span>
              </div>
              <span className="text-lg font-bold">Meals</span>
            </div>
            <Link to="/dashboard/meals" className={`text-xs font-semibold hover:underline ${accentLink}`}>View</Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-2xl font-bold ${accentGreen}`}>{calories}</span>
            <span className="text-xs text-gray-400">kcal</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mt-3">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-400 to-green-600" 
              style={{ width: `${Math.min(100, (calories / 2000) * 100)}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (calories / 2000) * 100)}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Journal Card */}
      <motion.div 
        className={`${cardBg} rounded-2xl p-6 mb-10 max-w-3xl mx-auto`}
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpenIcon className="w-7 h-7 text-pink-400" />
          <h2 className="text-xl font-bold">Recent Journal</h2>
          <Link to="/dashboard/journal" className={`ml-auto text-xs font-semibold hover:underline ${accentLink}`}>View All</Link>
        </div>
        <div className="space-y-4">
          {recentJournals.map(journal => (
            <div key={journal.id} className={`${cardInnerBg} p-4 rounded-xl flex flex-col gap-1`}>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-pink-400 text-lg`}>{journal.title}</span>
                <span className="text-xs text-gray-500 ml-auto">{journal.date}</span>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{journal.preview}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Overview */}
      <motion.div 
        className={`${cardBg} rounded-2xl p-6 max-w-5xl mx-auto`}
        variants={itemVariants}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold">Weekly Overview</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div 
            className={`${cardInnerBg} p-5 rounded-xl shadow-sm`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className={`text-sm font-medium ${accentBlue} mb-2`}>Avg. Water</h3>
            <p className={`text-2xl font-bold ${accentBlue}`}>6.2/8</p>
          </motion.div>
          <motion.div 
            className={`${cardInnerBg} p-5 rounded-xl shadow-sm`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className={`text-sm font-medium ${accentPurple} mb-2`}>Avg. Sleep</h3>
            <p className={`text-2xl font-bold ${accentPurple}`}>7.3h</p>
          </motion.div>
          <motion.div 
            className={`${cardInnerBg} p-5 rounded-xl shadow-sm`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className={`text-sm font-medium ${accentGreen} mb-2`}>Avg. Calories</h3>
            <p className={`text-2xl font-bold ${accentGreen}`}>1850</p>
          </motion.div>
          <motion.div 
            className={`${cardInnerBg} p-5 rounded-xl shadow-sm`}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className={`text-sm font-medium ${accentPink} mb-2`}>Activities</h3>
            <p className={`text-2xl font-bold ${accentPink}`}>12</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;