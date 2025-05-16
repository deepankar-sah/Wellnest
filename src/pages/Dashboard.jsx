// src/pages/Dashboard.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {  MoonIcon, HeartIcon } from '@heroicons/react/24/outline';

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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Mood Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              <HeartIcon className="w-5 h-5 text-pink-500" />
              Mood
            </h2>
            <Link to="/dashboard/mood" className="text-sm text-pink-500 hover:underline">
              View
            </Link>
          </div>
          {mood ? (
            <div className={`flex items-center gap-3 p-3 rounded-lg ${mood.color}`}>
              <span className="text-2xl">{mood.emoji}</span>
              <span>{mood.label}</span>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500 mb-2">No mood logged today</p>
              <Link 
                to="/dashboard/mood" 
                className="text-sm text-pink-500 hover:underline"
              >
                Log your mood
              </Link>
            </div>
          )}
        </div>

        {/* Water Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              {/* <WaterDropIcon className="w-5 h-5 text-blue-500" /> */}
              Water Intake
            </h2>
            <Link to="/dashboard/water" className="text-sm text-blue-500 hover:underline">
              View
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{waterIntake}/8</p>
              <p className="text-sm text-gray-500">glasses today</p>
            </div>
            <button 
              onClick={addWaterGlass}
              disabled={waterIntake >= 8}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg disabled:opacity-50"
            >
              +1
            </button>
          </div>
          <div className="flex gap-1 mt-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full ${
                  i < waterIntake ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sleep Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium flex items-center gap-2">
              <MoonIcon className="w-5 h-5 text-indigo-500" />
              Sleep
            </h2>
            <Link to="/dashboard/sleep" className="text-sm text-indigo-500 hover:underline">
              View
            </Link>
          </div>
          <div>
            <p className="text-2xl font-bold">{sleepHours}h</p>
            <p className="text-sm text-gray-500">last night</p>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500" 
                style={{ width: `${Math.min(100, (sleepHours / 10) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4h</span>
              <span>8h</span>
              <span>12h</span>
            </div>
          </div>
        </div>

        {/* Meals Card */}
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium">🍎 Meals</h2>
            <Link to="/dashboard/meals" className="text-sm text-green-500 hover:underline">
              View
            </Link>
          </div>
          <div>
            <p className="text-2xl font-bold">{calories} kcal</p>
            <p className="text-sm text-gray-500">consumed today</p>
          </div>
          <div className="mt-3">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${Math.min(100, (calories / 2000) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>2000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breathing Exercise */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">🧘 Breathing Exercise</h2>
          <Link to="/dashboard/breathing" className="text-pink-500 hover:underline">
            Start Session
          </Link>
        </div>
        <p className="text-gray-600 mb-4">
          Take a moment to breathe and relax. Try our guided breathing exercises to reduce stress.
        </p>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">1 min</span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">3 min</span>
          <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">5 min</span>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-1">Avg. Water</h3>
            <p className="text-xl font-bold">6.2/8</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800 mb-1">Avg. Sleep</h3>
            <p className="text-xl font-bold">7.3h</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-green-800 mb-1">Avg. Calories</h3>
            <p className="text-xl font-bold">1850</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-pink-800 mb-1">Breathing Sessions</h3>
            <p className="text-xl font-bold">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;