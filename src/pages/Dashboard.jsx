// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoonIcon, HeartIcon, ChartBarIcon, PlusIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Custom Water Drop Icon
const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-500">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const Dashboard = () => {
  const [mood, setMood] = useState(null);
  const [waterIntake, setWaterIntake] = useState(3);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [calories, setCalories] = useState(840);

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800' },
    { emoji: '😐', label: 'Neutral', color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' }
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

  return (
    <motion.div 
      className="p-6 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Page header with decorative bg */}
      <div className="relative mb-10 pb-2 border-b border-gray-200">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-20 blur-3xl -mr-32 -mt-32"></div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent relative z-10">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-1 relative z-10">Welcome to your wellness dashboard</p>
      </div>
      
      {/* Quick Stats */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        {/* Mood Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <span>Mood</span>
            </h2>
            <Link to="/dashboard/mood" className="text-sm text-pink-500 hover:text-pink-600 transition-colors">
              View
            </Link>
          </div>
          {mood ? (
            <div className={`flex items-center gap-3 p-4 rounded-lg ${mood.color} relative z-10`}>
              <span className="text-2xl">{mood.emoji}</span>
              <span>{mood.label}</span>
            </div>
          ) : (
            <div className="text-center py-4 bg-gray-50 rounded-lg relative z-10">
              <p className="text-gray-500 mb-3">No mood logged today</p>
              <Link 
                to="/dashboard/mood" 
                className="inline-flex items-center px-4 py-2 text-sm bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg hover:shadow-pink-500/25 transition duration-300"
              >
                Log your mood
              </Link>
            </div>
          )}
        </motion.div>

        {/* Water Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <WaterDropIcon />
              </div>
              <span>Water Intake</span>
            </h2>
            <Link to="/dashboard/water" className="text-sm text-blue-500 hover:text-blue-600 transition-colors">
              View
            </Link>
          </div>
          <div className="flex justify-between items-center mb-3 relative z-10">
            <div>
              <p className="text-2xl font-bold">{waterIntake}/8</p>
              <p className="text-sm text-gray-500">glasses today</p>
            </div>
            <motion.button 
              onClick={addWaterGlass}
              disabled={waterIntake >= 8}
              className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg disabled:opacity-50 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="flex gap-1 mt-3 relative z-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < waterIntake ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gray-200'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Sleep Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <MoonIcon className="w-5 h-5 text-white" />
              </div>
              <span>Sleep</span>
            </h2>
            <Link to="/dashboard/sleep" className="text-sm text-purple-500 hover:text-purple-600 transition-colors">
              View
            </Link>
          </div>
          <div className="relative z-10">
            <p className="text-2xl font-bold">{sleepHours}h</p>
            <p className="text-sm text-gray-500">last night</p>
          </div>
          <div className="mt-3 relative z-10">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600" 
                style={{ width: `${Math.min(100, (sleepHours / 10) * 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (sleepHours / 10) * 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4h</span>
              <span>8h</span>
              <span>12h</span>
            </div>
          </div>
        </motion.div>

        {/* Meals Card */}
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative overflow-hidden group"
          variants={itemVariants}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h2 className="font-medium flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                🍎
              </div>
              <span>Meals</span>
            </h2>
            <Link to="/dashboard/meals" className="text-sm text-green-500 hover:text-green-600 transition-colors">
              View
            </Link>
          </div>
          <div className="relative z-10">
            <p className="text-2xl font-bold">{calories} kcal</p>
            <p className="text-sm text-gray-500">consumed today</p>
          </div>
          <div className="mt-3 relative z-10">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600" 
                style={{ width: `${Math.min(100, (calories / 2000) * 100)}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (calories / 2000) * 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>2000</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Breathing Exercise */}
      <motion.div 
        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 mb-8 relative overflow-hidden group"
        variants={itemVariants}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="flex justify-between items-center mb-4 relative z-10">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
              🧘
            </div>
            <span>Breathing Exercise</span>
          </h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/dashboard/breathing" 
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full shadow-md hover:shadow-lg hover:shadow-indigo-500/25 transition duration-300 text-sm"
            >
              Start Session
            </Link>
          </motion.div>
        </div>
        <p className="text-gray-600 mb-6 relative z-10">
          Take a moment to breathe and relax. Try our guided breathing exercises to reduce stress.
        </p>
        <div className="flex gap-3 relative z-10">
          {['1 min', '3 min', '5 min'].map((time, index) => (
            <motion.span 
              key={time}
              className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 text-indigo-700 rounded-full text-sm"
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
            >
              {time}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Weekly Overview */}
      <motion.div 
        className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 relative overflow-hidden"
        variants={itemVariants}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-20 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="flex items-center gap-2 mb-6 relative z-10">
          <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <ChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold">Weekly Overview</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200/30 shadow-sm"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm font-medium text-blue-800 mb-2">Avg. Water</h3>
            <p className="text-2xl font-bold text-blue-700">6.2/8</p>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-200/30 shadow-sm"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm font-medium text-indigo-800 mb-2">Avg. Sleep</h3>
            <p className="text-2xl font-bold text-indigo-700">7.3h</p>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200/30 shadow-sm"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm font-medium text-green-800 mb-2">Avg. Calories</h3>
            <p className="text-2xl font-bold text-green-700">1850</p>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border border-pink-200/30 shadow-sm"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <h3 className="text-sm font-medium text-pink-800 mb-2">Breathing Sessions</h3>
            <p className="text-2xl font-bold text-pink-700">3</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;