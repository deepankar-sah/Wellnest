
import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';

const moods = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800' },
  { emoji: '😐', label: 'Neutral', color: 'bg-yellow-100 text-yellow-800' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800' },
  { emoji: '😨', label: 'Anxious', color: 'bg-purple-100 text-purple-800' }
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const startDate = startOfWeek(new Date());
  const dates = Array.from({ length: 7 }).map((_, i) => addDays(startDate, i));

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodHistory(prev => ({
      ...prev,
      [selectedDate.toISOString().split('T')[0]]: mood
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Mood Tracker</h1>
      
      {/* Mood Selection */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">How are you feeling today?</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.label}
              onClick={() => handleMoodSelect(mood)}
              className={`flex flex-col items-center p-4 rounded-lg ${mood.color} ${
                selectedMood?.label === mood.label ? 'ring-2 ring-pink-500' : ''
              }`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Calendar */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Mood History</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {dates.map((date) => {
            const dateKey = date.toISOString().split('T')[0];
            const mood = moodHistory[dateKey];
            return (
              <div 
                key={dateKey}
                onClick={() => setSelectedDate(date)}
                className={`p-2 rounded-lg cursor-pointer ${
                  isSameDay(date, selectedDate) ? 'bg-pink-100' : 'hover:bg-gray-100'
                }`}
              >
                <div className="text-sm text-gray-500 mb-1">
                  {format(date, 'EEE')}
                </div>
                <div className="text-xs mb-1">
                  {format(date, 'd')}
                </div>
                {mood && (
                  <div className="text-2xl">
                    {mood.emoji}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}