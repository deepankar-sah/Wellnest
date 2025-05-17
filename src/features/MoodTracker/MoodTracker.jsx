import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { HeartIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800', bg: 'bg-green-500' },
  { emoji: '😐', label: 'Neutral', color: 'bg-yellow-100 text-yellow-800', bg: 'bg-yellow-500' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800', bg: 'bg-blue-500' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800', bg: 'bg-red-500' },
  { emoji: '😨', label: 'Anxious', color: 'bg-purple-100 text-purple-800', bg: 'bg-purple-500' }
];

export default function MoodTracker() {
  const { isDarkMode } = useTheme();
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [journalEntry, setJournalEntry] = useState('');
  const [showJournal, setShowJournal] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const startDate = startOfWeek(currentWeek);
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));
  const dateKey = selectedDate.toISOString().split('T')[0];

  useEffect(() => {
    // Load saved data from localStorage
    const savedMoods = JSON.parse(localStorage.getItem('moodHistory')) || {};
    const savedJournals = JSON.parse(localStorage.getItem('journalEntries')) || {};
    
    setMoodHistory(savedMoods);
    if (savedMoods[dateKey]) {
      setSelectedMood(savedMoods[dateKey]);
    }
    if (savedJournals[dateKey]) {
      setJournalEntry(savedJournals[dateKey]);
    }
  }, [dateKey]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    const updatedHistory = {
      ...moodHistory,
      [dateKey]: mood
    };
    setMoodHistory(updatedHistory);
    localStorage.setItem('moodHistory', JSON.stringify(updatedHistory));
  };

  const handleJournalSave = () => {
    const updatedJournals = {
      ...JSON.parse(localStorage.getItem('journalEntries') || '{}'),
      [dateKey]: journalEntry
    };
    localStorage.setItem('journalEntries', JSON.stringify(updatedJournals));
    setShowJournal(false);
  };

  const navigateWeek = (direction) => {
    setCurrentWeek(addDays(currentWeek, direction * 7));
  };

  // Theme-based classes
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/80 border-pink-100 text-gray-900';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-white border-gray-100 text-gray-900';
  const sectionTitle = isDarkMode ? 'text-pink-300' : 'text-pink-800';
  const inputBg = isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900';
  const inputFocus = isDarkMode ? 'focus:ring-pink-400 focus:border-pink-400' : 'focus:ring-pink-300 focus:border-pink-300';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="p-4 max-w-4xl mx-auto relative">
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-pink-900' : 'bg-pink-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>

      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg shadow-md text-white"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <HeartIcon className="w-7 h-7" />
          </motion.div>
          Mood & Journal
        </motion.h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateWeek(-1)}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d')}
          </span>
          <button 
            onClick={() => navigateWeek(1)}
            className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`rounded-xl p-6 shadow-lg border ${cardBg} lg:col-span-2 backdrop-blur-sm`}
        >
          <h2 className={`text-lg font-semibold mb-4 ${sectionTitle}`}>How are you feeling today?</h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {moods.map((mood) => (
              <motion.button
                key={mood.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-900 text-white' : mood.color} ${selectedMood?.label === mood.label ? 'ring-2 ring-pink-500' : ''} transition-all`}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span>{mood.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Journal Toggle */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowJournal(!showJournal)}
            className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 ${
              showJournal ? (isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700') : 'bg-pink-500 text-white'
            }`}
          >
            <BookOpenIcon className="w-5 h-5" />
            {showJournal ? 'Hide Journal' : 'Write Journal Entry'}
          </motion.button>

          {/* Journal Input */}
          <AnimatePresence>
            {showJournal && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <textarea
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Write about your day, thoughts, or feelings..."
                  className={`w-full p-4 rounded-lg h-40 outline-none transition-all ${inputBg} ${inputFocus}`}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleJournalSave}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                  >
                    Save Journal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Mood Calendar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={`rounded-xl p-6 shadow-lg border ${cardBg} backdrop-blur-sm`}
        >
          <h2 className={`text-lg font-semibold mb-4 ${sectionTitle}`}>Mood History</h2>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {dates.map((date) => {
              const dateKey = date.toISOString().split('T')[0];
              const mood = moodHistory[dateKey];
              const isToday = isSameDay(date, new Date());
              const isSelected = isSameDay(date, selectedDate);
              
              return (
                <motion.div
                  key={dateKey}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedDate(date)}
                  className={`p-2 rounded-lg cursor-pointer transition-all ${
                    isSelected ? (isDarkMode ? 'bg-pink-900/40' : 'bg-pink-100') : (isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100')
                  } ${isToday ? 'border border-pink-300' : ''}`}
                >
                  <div className={`text-xs mb-1 ${
                    isSelected ? 'font-bold text-pink-400' : 'text-gray-400'
                  }`}>
                    {format(date, 'd')}
                  </div>
                  {mood && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-8 h-8 rounded-full ${mood.bg} text-white flex items-center justify-center mx-auto`}
                    >
                      {mood.emoji}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Selected Day Summary */}
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900/80 text-white' : 'bg-gray-50'}`}
            >
              <h3 className="font-medium mb-2">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${selectedMood.bg} text-white flex items-center justify-center`}>
                  {selectedMood.emoji}
                </div>
                <div>
                  <p className="font-medium">{selectedMood.label}</p>
                  <p className="text-sm text-gray-400">
                    {moodHistory[dateKey] ? 'Mood recorded' : 'No mood recorded'}
                  </p>
                </div>
              </div>
              
              {journalEntry && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-pink-400 mb-1">Journal Entry</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-200 bg-gray-900/60' : 'text-gray-600 bg-white'} p-3 rounded-lg`}>
                    {journalEntry}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Weekly Mood Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className={`rounded-xl p-6 shadow-lg border ${cardBg} mt-6 backdrop-blur-sm`}
      >
        <h2 className={`text-lg font-semibold mb-4 ${sectionTitle}`}>Weekly Mood Patterns</h2>
        <div className="h-40 flex items-end gap-1">
          {dates.map((date) => {
            const dateKey = date.toISOString().split('T')[0];
            const mood = moodHistory[dateKey];
            const height = mood ? 100 : 20;
            
            return (
              <div key={dateKey} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, type: 'spring' }}
                  className={`w-full rounded-t-lg ${
                    mood ? mood.bg : (isDarkMode ? 'bg-gray-800' : 'bg-gray-200')
                  } flex items-end justify-center`}
                >
                  {mood && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-white -mb-5"
                    >
                      {mood.emoji}
                    </motion.span>
                  )}
                </motion.div>
                <span className="text-xs mt-1 text-gray-500">
                  {format(date, 'EEE')}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}