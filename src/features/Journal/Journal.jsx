import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PencilIcon, CalendarIcon, TrashIcon, ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Journal = () => {
  const [isDarkMode] = useOutletContext() || [false];
  const [journalEntries, setJournalEntries] = useState([
    { 
      id: 1, 
      date: '2023-11-10', 
      title: 'Morning Reflection', 
      content: 'Today I woke up feeling energized and ready to tackle the day. My sleep quality was excellent, and I\'m looking forward to maintaining my exercise routine. I want to focus on staying hydrated and eating balanced meals.',
      mood: '😊'
    },
    { 
      id: 2, 
      date: '2023-11-09', 
      title: 'Evening Thoughts', 
      content: 'Reflecting on today\'s achievements and planning for tomorrow. I managed to complete my water intake goal and meditated for 10 minutes. Tomorrow, I\'ll try to increase my meditation time to 15 minutes and focus on getting 8 hours of sleep.',
      mood: '😌'
    },
    { 
      id: 3, 
      date: '2023-11-08', 
      title: 'Workout Progress', 
      content: 'My morning workout felt great today. I increased my running time by 5 minutes and still had energy to complete a full strength training routine. I\'m noticing that my endurance is improving, which is a great sign of progress.',
      mood: '💪'
    },
  ]);
  
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const [isViewingEntry, setIsViewingEntry] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: '😊'
  });
  
  const titleInputRef = useRef(null);
  
  useEffect(() => {
    if (isAddingEntry && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isAddingEntry]);
  
  const createNewEntry = () => {
    setIsAddingEntry(true);
    setCurrentEntry(null);
    setNewEntry({
      title: '',
      content: '',
      mood: '😊'
    });
  };
  
  const saveEntry = () => {
    if (newEntry.title.trim() && newEntry.content.trim()) {
      const today = new Date().toISOString().split('T')[0];
      
      if (currentEntry) {
        // Edit existing entry
        const updatedEntries = journalEntries.map(entry => 
          entry.id === currentEntry.id 
            ? { ...entry, ...newEntry, date: today } 
            : entry
        );
        setJournalEntries(updatedEntries);
      } else {
        // Add new entry
        const entry = {
          id: Date.now(),
          date: today,
          ...newEntry
        };
        setJournalEntries([entry, ...journalEntries]);
      }
      
      setIsAddingEntry(false);
      setCurrentEntry(null);
    }
  };
  
  const editEntry = (entry) => {
    setCurrentEntry(entry);
    setNewEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood || '😊'
    });
    setIsAddingEntry(true);
    setIsViewingEntry(false);
  };
  
  const viewEntry = (entry) => {
    setCurrentEntry(entry);
    setIsViewingEntry(true);
  };
  
  const deleteEntry = (id) => {
    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
    if (currentEntry && currentEntry.id === id) {
      setCurrentEntry(null);
      setIsViewingEntry(false);
    }
  };
  
  const availableMoods = ['😊', '😌', '😔', '😡', '😴', '💪', '🧘', '🤔', '😄', '❤️'];
  
  // Theme-based classes
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/90 border border-gray-200';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-gray-50/80 border border-gray-200';
  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-800';
  const secondaryText = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const inputBg = isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400';
  const inputFocus = isDarkMode ? 'focus:ring-purple-500 focus:border-purple-500' : 'focus:ring-purple-400 focus:border-purple-400';
  const divider = isDarkMode ? 'divide-gray-700' : 'divide-gray-200';
  const hoverBg = isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50';

  return (
    <div className="p-6 max-w-6xl mx-auto relative">
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>

      {/* Header */}
      <motion.div 
        className="mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
          Journal Entries
        </h1>
        <p className={`mt-2 ${secondaryText}`}>
          Reflect on your wellness journey and track your thoughts
        </p>
      </motion.div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left sidebar - Journal list */}
        <motion.div 
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`font-semibold ${secondaryText}`}>My Entries</h2>
            <motion.button
              onClick={createNewEntry}
              className={`py-2 px-4 rounded-lg text-sm bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-sm flex items-center gap-2 backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PencilIcon className="w-4 h-4" />
              <span>New Entry</span>
            </motion.button>
          </div>
          
          <div className={`rounded-2xl overflow-hidden shadow-lg border ${cardBg} backdrop-blur-sm`}>
            <div className="p-4">
              {journalEntries.length === 0 ? (
                <div className={`text-center py-8 ${secondaryText}`}>
                  <p>No journal entries yet.</p>
                  <p className="mt-2">Create your first entry!</p>
                </div>
              ) : (
                <div className={`divide-y ${divider}`}>
                  {journalEntries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      className={`p-4 cursor-pointer transition-colors ${textColor} ${
                        currentEntry && currentEntry.id === entry.id
                          ? isDarkMode ? 'bg-gray-800' : 'bg-purple-50'
                          : hoverBg
                      }`}
                      onClick={() => viewEntry(entry)}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xl" role="img" aria-label="Mood">{entry.mood}</span>
                          <h3 className={`font-medium ${textColor}`}>
                            {entry.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={`text-xs flex items-center gap-1 ${secondaryText}`}>
                          <CalendarIcon className="w-3 h-3" />
                          {entry.date}
                        </span>
                        <div className="flex gap-1">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              editEntry(entry);
                            }}
                            className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <PencilIcon className={`w-4 h-4 ${secondaryText}`} />
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEntry(entry.id);
                            }}
                            className={`p-1 rounded ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-100'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <TrashIcon className="w-4 h-4 text-red-500" />
                          </motion.button>
                        </div>
                      </div>
                      <p className={`text-sm mt-2 ${secondaryText} line-clamp-2`}>
                        {entry.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        
        {/* Right content - Journal entry view/edit */}
        <motion.div 
          className="lg:col-span-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {isAddingEntry ? (
              /* Adding/Editing Entry Form */
              <motion.div
                key="add-form"
                className={`rounded-2xl overflow-hidden shadow-lg border ${cardBg} backdrop-blur-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
                  <h2 className={`text-lg font-semibold ${textColor}`}>
                    {currentEntry ? 'Edit Entry' : 'New Journal Entry'}
                  </h2>
                  <motion.button
                    onClick={() => setIsAddingEntry(false)}
                    className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ArrowLeftIcon className={`w-5 h-5 ${secondaryText}`} />
                  </motion.button>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <label className={`block mb-2 text-sm font-medium ${secondaryText}`}>
                      Title
                    </label>
                    <input
                      type="text"
                      ref={titleInputRef}
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                      placeholder="Title of your entry"
                      className={`w-full p-3 rounded-lg outline-none focus:ring-2 ${inputBg} ${inputFocus}`}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className={`block mb-2 text-sm font-medium ${secondaryText}`}>
                      Mood
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableMoods.map((mood) => (
                        <motion.button
                          key={mood}
                          onClick={() => setNewEntry({...newEntry, mood})}
                          className={`w-10 h-10 text-xl rounded-full flex items-center justify-center ${
                            newEntry.mood === mood
                              ? isDarkMode 
                                ? 'bg-purple-500/30 ring-2 ring-purple-500' 
                                : 'bg-purple-100 ring-2 ring-purple-500'
                              : isDarkMode 
                                ? 'bg-gray-700 hover:bg-gray-600' 
                                : 'bg-gray-100 hover:bg-gray-200'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {mood}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className={`block mb-2 text-sm font-medium ${secondaryText}`}>
                      Journal Entry
                    </label>
                    <textarea
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                      placeholder="Write your thoughts..."
                      rows={10}
                      className={`w-full p-3 rounded-lg outline-none focus:ring-2 ${inputBg} ${inputFocus}`}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.button
                      onClick={saveEntry}
                      className="py-2 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-sm flex items-center gap-2 backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!newEntry.title.trim() || !newEntry.content.trim()}
                    >
                      <CheckIcon className="w-5 h-5" />
                      <span>Save Entry</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : isViewingEntry && currentEntry ? (
              /* Viewing Entry */
              <motion.div
                key="view-entry"
                className={`rounded-2xl overflow-hidden shadow-lg border ${cardBg} backdrop-blur-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label="Mood">{currentEntry.mood}</span>
                    <h2 className={`text-lg font-semibold ${textColor}`}>{currentEntry.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => editEntry(currentEntry)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} flex items-center gap-1`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PencilIcon className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </motion.button>
                    <motion.button
                      onClick={() => deleteEntry(currentEntry.id)}
                      className={`p-2 rounded-lg ${isDarkMode ? 'bg-red-900/30 hover:bg-red-900/40 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'} flex items-center gap-1`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className={`p-3 rounded-lg mb-4 inline-block ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    <span className={`text-sm flex items-center gap-1`}>
                      <CalendarIcon className="w-4 h-4" />
                      {currentEntry.date}
                    </span>
                  </div>
                  
                  <div className={`whitespace-pre-wrap ${textColor}`}>
                    {currentEntry.content}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Welcome/Instructions when nothing is selected */
              <motion.div
                key="welcome"
                className={`rounded-2xl overflow-hidden shadow-lg border ${cardBg} p-8 text-center flex flex-col items-center justify-center min-h-[400px] backdrop-blur-sm`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-20 h-20 mb-6 rounded-full ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'} flex items-center justify-center`}>
                  <PencilIcon className="w-10 h-10 text-purple-500" />
                </div>
                <h2 className={`text-xl font-bold mb-3 ${textColor}`}>Your Journal</h2>
                <p className={`max-w-md mx-auto mb-6 ${secondaryText}`}>
                  Keep track of your thoughts, feelings, and progress. Journal entries can help you reflect on your wellness journey.
                </p>
                <motion.button
                  onClick={createNewEntry}
                  className="py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg shadow-sm backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create New Entry
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Journal;