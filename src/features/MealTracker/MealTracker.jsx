// src/features/MealTracker/MealTracker.jsx
import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const MealTracker = () => {
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

  return (
    <motion.div 
      className="p-6 max-w-3xl mx-auto relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-pink-100 rounded-full opacity-20 blur-3xl -mr-20 -mt-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-100 rounded-full opacity-20 blur-3xl -ml-20 -mb-20 z-0"></div>
      
      <motion.h1 
        className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10 bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent"
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

      {/* Daily Summary */}
      <motion.div 
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-pink-100 relative z-10"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold mb-5 text-pink-800">Today's Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <motion.div 
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200/30 shadow-sm"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-blue-800 mb-1">Calories</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              {totalCalories}/{dailyGoal}
            </p>
            <div className="h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalCalories / dailyGoal) * 100)}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200/30 shadow-sm"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-green-800 mb-1">Carbs</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              {totalCarbs}g
            </p>
            <div className="mt-3 w-full h-1 bg-green-200 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalCarbs / 300) * 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200/30 shadow-sm"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Protein</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-amber-500 bg-clip-text text-transparent">
              {totalProtein}g
            </p>
            <div className="mt-3 w-full h-1 bg-yellow-200 rounded-full">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (totalProtein / 100) * 100)}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-red-50 to-red-100 p-5 rounded-xl border border-red-200/30 shadow-sm"
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-sm font-medium text-red-800 mb-1">Fat</h3>
            <p className="text-xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
              {totalFat}g
            </p>
            <div className="mt-3 w-full h-1 bg-red-200 rounded-full">
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
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8 border border-pink-100 relative z-10"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-pink-800">Today's Meals</h2>
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
              className="bg-gradient-to-br from-gray-50 to-pink-50 p-5 rounded-xl mb-6 border border-pink-100/50 shadow-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-medium mb-4 text-pink-800">Add New Meal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                  <select
                    value={newMeal.type}
                    onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  >
                    {mealTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.emoji} {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={newMeal.time}
                    onChange={(e) => setNewMeal({...newMeal, time: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                  <input
                    type="text"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                    placeholder="e.g. Chicken Salad"
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                  <input
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                    placeholder="kcal"
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                  <input
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                  <input
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                    className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-all"
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
                      className="border border-gray-100 rounded-xl p-5 bg-white/90 shadow-sm hover:shadow-md transition-all"
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
                            <h3 className="font-medium text-gray-800">{meal.name}</h3>
                          </div>
                          <p className="text-sm text-gray-500">{meal.time} • {meal.calories} kcal</p>
                        </div>
                        <motion.button
                          onClick={() => handleDeleteMeal(meal.id)}
                          className="text-gray-400 hover:text-red-500 transition p-1 rounded-full hover:bg-red-50"
                          whileHover={{ scale: 1.1, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <motion.div 
                          className="bg-green-50 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-green-800">Carbs</p>
                          <p className="font-medium text-green-600">{meal.carbs}g</p>
                        </motion.div>
                        <motion.div 
                          className="bg-yellow-50 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-yellow-800">Protein</p>
                          <p className="font-medium text-yellow-600">{meal.protein}g</p>
                        </motion.div>
                        <motion.div 
                          className="bg-red-50 p-2 rounded-lg text-center"
                          whileHover={{ y: -2 }}
                        >
                          <p className="text-xs text-red-800">Fat</p>
                          <p className="font-medium text-red-600">{meal.fat}g</p>
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
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100 relative z-10"
        variants={itemVariants}
      >
        <motion.div 
          className="absolute -right-10 -top-10 w-40 h-40 bg-green-100 rounded-full opacity-20 blur-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <h2 className="text-lg font-semibold mb-5 text-pink-800 relative z-10">Nutrition Tips</h2>
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