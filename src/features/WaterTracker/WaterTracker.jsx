// src/features/WaterTracker/WaterTracker.jsx
import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

export default function WaterTracker() {
  const [dailyGoal] = useState(8); // 8 glasses (64oz)
  const [currentIntake, setCurrentIntake] = useState(3);
  const [weeklyData, setWeeklyData] = useState({
    '2023-06-04': 5,
    '2023-06-05': 2,
    '2023-06-06': 6,
    '2023-06-07': 7,
    '2023-06-08': 5,
    '2023-06-09': 7,
    '2023-06-10': 7,
  });

  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const addGlass = () => {
    if (currentIntake < dailyGoal) {
      setCurrentIntake(prev => prev + 1);
    }
  };

  const removeGlass = () => {
    if (currentIntake > 0) {
      setCurrentIntake(prev => prev - 1);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <WaterDropIcon />
        Water Intake
      </h1>
      
      {/* Daily Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Today's Intake: {currentIntake} / {dailyGoal} glasses
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={removeGlass}
              disabled={currentIntake <= 0}
              className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-50"
            >
              -
            </button>
            <button 
              onClick={addGlass}
              disabled={currentIntake >= dailyGoal}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg disabled:opacity-50"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: dailyGoal }).map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                i < currentIntake ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            >
              {i < currentIntake && (
                <WaterDropIcon className="w-6 h-6 text-white" />
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Hydration Tips</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Drink a glass of water first thing in the morning</li>
            <li>Keep a water bottle with you throughout the day</li>
            <li>Set reminders if you often forget to drink</li>
          </ul>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {weekDays.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const glasses = weeklyData[dateKey] || 0;
            const percentage = Math.min(100, (glasses / dailyGoal) * 100);
            
            return (
              <div key={dateKey} className="space-y-2">
                <div className="text-xs text-gray-500">
                  {format(day, 'EEE')}
                </div>
                <div 
                  className="relative h-32 bg-gray-100 rounded-t-lg overflow-hidden"
                  title={`${glasses} glasses`}
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-400"
                    style={{ height: `${percentage}%` }}
                  />
                  <div className="absolute bottom-1 left-0 right-0 text-xs font-medium">
                    {glasses}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}