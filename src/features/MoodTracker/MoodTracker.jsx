import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { HeartIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800', bg: 'bg-green-500' },
  { emoji: '😐', label: 'Neutral', color: 'bg-yellow-100 text-yellow-800', bg: 'bg-yellow-500' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800', bg: 'bg-blue-500' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800', bg: 'bg-red-500' },
  { emoji: '😨', label: 'Anxious', color: 'bg-purple-100 text-purple-800', bg: 'bg-purple-500' }
];

export default function MoodTracker() {
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

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-2">
          <HeartIcon className="w-8 h-8 text-pink-500" />
          <h1 className="text-2xl font-bold">Mood & Journal</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateWeek(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">
            {format(startDate, 'MMM d')} - {format(addDays(startDate, 6), 'MMM d')}
          </span>
          <button 
            onClick={() => navigateWeek(1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mood Selection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2"
        >
          <h2 className="text-lg font-semibold mb-4">How are you feeling today?</h2>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {moods.map((mood) => (
              <motion.button
                key={mood.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMoodSelect(mood)}
                className={`flex flex-col items-center p-4 rounded-lg ${mood.color} ${
                  selectedMood?.label === mood.label ? 'ring-2 ring-pink-500' : ''
                } transition-all`}
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
              showJournal ? 'bg-gray-100 text-gray-700' : 'bg-pink-500 text-white'
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
                  className="w-full p-4 border border-gray-200 rounded-lg h-40 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-4">Mood History</h2>
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
                    isSelected ? 'bg-pink-100' : 'hover:bg-gray-100'
                  } ${isToday ? 'border border-pink-300' : ''}`}
                >
                  <div className={`text-xs mb-1 ${
                    isSelected ? 'font-bold text-pink-700' : 'text-gray-700'
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
              className="mt-6 p-4 rounded-lg bg-gray-50"
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
                  <p className="text-sm text-gray-600">
                    {moodHistory[dateKey] ? 'Mood recorded' : 'No mood recorded'}
                  </p>
                </div>
              </div>
              
              {journalEntry && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Journal Entry</h4>
                  <p className="text-sm text-gray-600 bg-white p-3 rounded-lg">
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
        className="bg-white rounded-xl p-6 shadow-sm mt-6"
      >
        <h2 className="text-lg font-semibold mb-4">Weekly Mood Patterns</h2>
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
                    mood ? mood.bg : 'bg-gray-200'
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