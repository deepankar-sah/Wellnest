// src/features/MealTracker/MealTracker.jsx
import { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const MealTracker = () => {
  const { isDarkMode } = useTheme();
  const [meals, setMeals] = useState([
    { id: 1, type: 'breakfast', name: 'Oatmeal with fruits', time: '08:30', calories: 350, carbs: 45, protein: 12, fat: 8 },
    { id: 2, type: 'lunch', name: 'Grilled chicken salad', time: '12:45', calories: 450, carbs: 20, protein: 35, fat: 15 }
  ]);
  const [newMeal, setNewMeal] = useState({
    type: 'breakfast',
    name: '',
    time: '',
    calories: '',
    carbs: '',
    protein: '',
    fat: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [dailyGoal] = useState(2000);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0);
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0);
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0);

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast', emoji: '🥞' },
    { value: 'lunch', label: 'Lunch', emoji: '🍲' },
    { value: 'dinner', label: 'Dinner', emoji: '🍛' },
    { value: 'snack', label: 'Snack', emoji: '🍎' }
  ];

  const handleAddMeal = () => {
    if (
      newMeal.name &&
      newMeal.time &&
      newMeal.calories &&
      newMeal.carbs &&
      newMeal.protein &&
      newMeal.fat
    ) {
      setMeals([
        ...meals,
        {
          id: Date.now(),
          ...newMeal,
          calories: parseInt(newMeal.calories),
          carbs: parseInt(newMeal.carbs),
          protein: parseInt(newMeal.protein),
          fat: parseInt(newMeal.fat)
        }
      ]);
      setNewMeal({
        type: 'breakfast',
        name: '',
        time: '',
        calories: '',
        carbs: '',
        protein: '',
        fat: ''
      });
      setIsAdding(false);
    }
  };

  const handleDeleteMeal = (id) => {
    setMeals(meals.filter(meal => meal.id !== id));
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
  const cardBg = isDarkMode ? 'bg-gray-900/80 border-gray-800 text-white' : 'bg-white/80 border-pink-100 text-gray-900';
  const cardInnerBg = isDarkMode ? 'bg-gray-800/80 border-gray-800 text-white' : 'bg-white/90 border-gray-100 text-gray-900';
  const sectionTitle = isDarkMode ? 'text-pink-300' : 'text-pink-800';
  const inputBg = isDarkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900';
  const inputFocus = isDarkMode ? 'focus:ring-pink-400 focus:border-pink-400' : 'focus:ring-pink-300 focus:border-pink-300';
  const labelText = isDarkMode ? 'text-gray-300' : 'text-gray-700';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-300';

  return (
    <motion.div 
      className="p-6 max-w-3xl mx-auto relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 right-0 w-72 h-72 ${isDarkMode ? 'bg-pink-900' : 'bg-pink-100'} rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0`}></div>
      <div className={`absolute bottom-0 left-0 w-72 h-72 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0`}></div>
      
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8 relative z-10">
        <motion.h1 
          className="text-2xl font-bold flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent"
          variants={itemVariants}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg shadow-md text-white"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            🍎
          </motion.div>
          Meal Tracker
        </motion.h1>
      </div>

      {/* Daily Summary */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg mb-8 border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle}`}>Today's Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div 
            className={`bg-gradient-to-br from-blue-900/40 to-blue-800/30 p-5 rounded-xl border border-blue-900/30 shadow-sm ${isDarkMode ? 'text-blue-200' : ''}`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-blue-400 mb-1">Calories</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              {totalCalories}/{dailyGoal}
            </p>
            <div className="h-2 bg-gray-700 rounded-full mt-3 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalCalories / dailyGoal) * 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className={`bg-gradient-to-br from-green-900/40 to-green-800/30 p-5 rounded-xl border border-green-900/30 shadow-sm ${isDarkMode ? 'text-green-200' : ''}`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-green-400 mb-1">Carbs</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              {totalCarbs}g
            </p>
            <div className="mt-3 w-full h-1 bg-green-900 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalCarbs / 300) * 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className={`bg-gradient-to-br from-yellow-900/40 to-yellow-800/30 p-5 rounded-xl border border-yellow-900/30 shadow-sm ${isDarkMode ? 'text-yellow-200' : ''}`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-yellow-400 mb-1">Protein</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              {totalProtein}g
            </p>
            <div className="mt-3 w-full h-1 bg-yellow-900 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalProtein / 100) * 100)}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className={`bg-gradient-to-br from-red-900/40 to-red-800/30 p-5 rounded-xl border border-red-900/30 shadow-sm ${isDarkMode ? 'text-red-200' : ''}`}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-red-400 mb-1">Fat</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
              {totalFat}g
            </p>
            <div className="mt-3 w-full h-1 bg-red-900 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalFat / 70) * 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Meal List */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg mb-8 border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-semibold ${sectionTitle}`}>Today's Meals</h2>
          <motion.button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-pink-300/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon className="w-4 h-4" />
            Add Meal
          </motion.button>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div 
              className={`bg-gradient-to-br from-gray-900/80 to-pink-900/40 p-5 rounded-xl mb-6 border border-pink-900/40 shadow-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className={`font-medium mb-4 ${sectionTitle}`}>Add New Meal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Meal Type</label>
                  <select
                    value={newMeal.type}
                    onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  >
                    {mealTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.emoji} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Time</label>
                  <input
                    type="time"
                    value={newMeal.time}
                    onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Meal Name</label>
                  <input
                    type="text"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                    placeholder="e.g. Chicken Salad"
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Calories</label>
                  <input
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                    placeholder="kcal"
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Carbs (g)</label>
                  <input
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Protein (g)</label>
                  <input
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${labelText}`}>Fat (g)</label>
                  <input
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                    className={`w-full p-2.5 rounded-xl outline-none transition-all ${inputBg} ${inputFocus}`}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setIsAdding(false)}
                  className={`px-4 py-2.5 rounded-xl hover:bg-gray-800/40 transition-all ${isDarkMode ? 'bg-gray-900 border border-gray-700 text-white' : 'border border-gray-300 bg-white text-gray-900'}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleAddMeal}
                  className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl shadow-md hover:shadow-lg hover:shadow-pink-300/50 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Save Meal
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence>
            {meals.length === 0 ? (
              <motion.p 
                className="text-center py-8 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No meals logged today
              </motion.p>
            ) : (
              meals
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((meal, index) => {
                  const mealType = mealTypes.find(type => type.value === meal.type);
                  return (
                    <motion.div 
                      key={meal.id}
                      className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition-all ${cardInnerBg}`}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{mealType?.emoji}</span>
                            <h3 className="font-medium">{meal.name}</h3>
                          </div>
                          <p className="text-sm text-gray-400">{meal.time} • {meal.calories} kcal</p>
                        </div>
                        <motion.button
                          onClick={() => handleDeleteMeal(meal.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <motion.div 
                          className="bg-green-900/30 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-green-400">Carbs</p>
                          <p className="font-medium text-green-300">{meal.carbs}g</p>
                        </motion.div>
                        <motion.div 
                          className="bg-yellow-900/30 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-yellow-400">Protein</p>
                          <p className="font-medium text-yellow-300">{meal.protein}g</p>
                        </motion.div>
                        <motion.div 
                          className="bg-red-900/30 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-red-400">Fat</p>
                          <p className="font-medium text-red-300">{meal.fat}g</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Nutrition Tips */}
      <motion.div 
        className={`rounded-2xl p-6 shadow-lg border ${cardBg} relative z-10 backdrop-blur-sm`}
        variants={itemVariants}
      >
        <motion.div 
          className={`absolute -right-10 -top-10 w-40 h-40 ${isDarkMode ? 'bg-green-900' : 'bg-green-100'} rounded-full opacity-20 blur-2xl`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <h2 className={`text-lg font-semibold mb-5 ${sectionTitle} relative z-10`}>Nutrition Tips</h2>
        <ul className="space-y-3 relative z-10">
          <motion.li 
            className="flex items-start gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <span className="text-green-500 font-bold">✓</span>
            <span>Include a variety of colorful fruits and vegetables</span>
          </motion.li>
          <motion.li 
            className="flex items-start gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <span className="text-green-500 font-bold">✓</span>
            <span>Choose whole grains over refined grains</span>
          </motion.li>
          <motion.li 
            className="flex items-start gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <span className="text-green-500 font-bold">✓</span>
            <span>Limit added sugars and saturated fats</span>
          </motion.li>
          <motion.li 
            className="flex items-start gap-2"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <span className="text-green-500 font-bold">✓</span>
            <span>Stay hydrated throughout the day</span>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default MealTracker;