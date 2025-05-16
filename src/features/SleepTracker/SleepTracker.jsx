// src/features/SleepTracker/SleepTracker.jsx
import { useState } from 'react';
import { format, startOfWeek, addDays, subDays } from 'date-fns';

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [sleepData, setSleepData] = useState({
    '2023-06-04': 6.5,
    '2023-06-05': 7,
    '2023-06-06': 7.5,
    '2023-06-07': 8,
    '2023-06-08': 6,
    '2023-06-09': 7.5,
    '2023-06-10': 8.5,
  });

  const startDate = startOfWeek(new Date());
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleSleepChange = (e) => {
    setSleepHours(parseFloat(e.target.value));
  };

  const logSleep = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    setSleepData(prev => ({
      ...prev,
      [today]: sleepHours
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">😴 Sleep Tracker</h1>
      
      {/* Sleep Log */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Log Your Sleep</h2>
        
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Sleep Duration: {sleepHours.toFixed(1)} hours
          </label>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={sleepHours}
            onChange={handleSleepChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4h</span>
            <span>8h</span>
            <span>12h</span>
          </div>
        </div>

        <button
          onClick={logSleep}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Log Sleep
        </button>
      </div>

      {/* Sleep Insights */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Sleep Insights</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800 mb-1">Average Sleep</h3>
            <p className="text-2xl font-bold">
              {(
                Object.values(sleepData).reduce((a, b) => a + b, 0) / 
                Object.values(sleepData).length
              ).toFixed(1)}h
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-indigo-800 mb-1">Last Night</h3>
            <p className="text-2xl font-bold">
              {sleepData[format(subDays(new Date(), 1), 'yyyy-MM-dd')] || '--'}h
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-2">
            Adults should aim for 7-8 hours of quality sleep per night. Consistent sleep patterns help improve overall health, mood, and cognitive function.
          </p>
        </div>
      </div>

      {/* Weekly Sleep Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Weekly Sleep Data</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {weekDays.map((day) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const hours = sleepData[dateKey] || 0;
            const barHeight = Math.min(100, (hours / 10) * 100);
            
            return (
              <div key={dateKey} className="space-y-2">
                <div className="text-xs text-gray-500">
                  {format(day, 'EEE')}
                </div>
                <div 
                  className="relative h-32 bg-gray-100 rounded-t-lg overflow-hidden"
                  title={`${hours} hours`}
                >
                  <div 
                    className={`absolute bottom-0 left-0 right-0 ${
                      hours >= 7 ? 'bg-green-400' : 'bg-yellow-400'
                    }`}
                    style={{ height: `${barHeight}%` }}
                  />
                  <div className="absolute bottom-1 left-0 right-0 text-xs font-medium">
                    {hours || '--'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;