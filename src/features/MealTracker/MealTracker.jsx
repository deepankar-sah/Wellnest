// src/features/MealTracker/MealTracker.jsx
import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🍎 Meal Tracker</h1>

      {/* Daily Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Today's Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Calories</h3>
            <p className="text-xl font-bold">{totalCalories}/{dailyGoal}</p>
            <div className="h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${Math.min(100, (totalCalories / dailyGoal) * 100)}%` }}
              />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-1">Carbs</h3>
            <p className="text-xl font-bold">{totalCarbs}g</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800 mb-1">Protein</h3>
            <p className="text-xl font-bold">{totalProtein}g</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-1">Fat</h3>
            <p className="text-xl font-bold">{totalFat}g</p>
          </div>
        </div>
      </div>

      {/* Meal List */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Today's Meals</h2>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 px-3 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
          >
            <PlusIcon className="w-4 h-4" />
            Add Meal
          </button>
        </div>

        {isAdding && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-3">Add New Meal</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                <select
                  value={newMeal.type}
                  onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
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
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                <input
                  type="text"
                  value={newMeal.name}
                  onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
                  placeholder="e.g. Chicken Salad"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                <input
                  type="number"
                  value={newMeal.calories}
                  onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                  placeholder="kcal"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  value={newMeal.carbs}
                  onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={newMeal.protein}
                  onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                <input
                  type="number"
                  value={newMeal.fat}
                  onChange={(e) => setNewMeal({...newMeal, fat: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMeal}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
              >
                Save Meal
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {meals.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No meals logged today</p>
          ) : (
            meals
              .sort((a, b) => a.time.localeCompare(b.time))
              .map(meal => {
                const mealType = mealTypes.find(type => type.value === meal.type);
                return (
                  <div key={meal.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{mealType?.emoji}</span>
                          <h3 className="font-medium">{meal.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500">{meal.time} • {meal.calories} kcal</p>
                      </div>
                      <button
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      <div className="bg-blue-50 p-2 rounded text-center">
                        <p className="text-xs text-blue-800">Carbs</p>
                        <p className="font-medium">{meal.carbs}g</p>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded text-center">
                        <p className="text-xs text-yellow-800">Protein</p>
                        <p className="font-medium">{meal.protein}g</p>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <p className="text-xs text-red-800">Fat</p>
                        <p className="font-medium">{meal.fat}g</p>
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </div>

      {/* Nutrition Tips */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Nutrition Tips</h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Include a variety of colorful fruits and vegetables</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Choose whole grains over refined grains</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Limit added sugars and saturated fats</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Stay hydrated throughout the day</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MealTracker;