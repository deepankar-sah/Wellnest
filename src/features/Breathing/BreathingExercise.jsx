// src/features/Breathing/BreathingExercise.jsx
import { useState, useEffect, useRef } from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

const breathingTechniques = [
  {
    name: "4-7-8 Breathing",
    description: "Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Repeat 4 times.",
    pattern: [4, 7, 8],
    cycles: 4
  },
  {
    name: "Box Breathing",
    description: "Inhale, hold, exhale, and hold again - each for 4 seconds.",
    pattern: [4, 4, 4, 4],
    cycles: 5
  },
  {
    name: "Deep Breathing",
    description: "Simple deep breathing with equal inhale and exhale.",
    pattern: [5, 0, 5],
    cycles: 6
  }
];

export default function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);
  const animationRef = useRef(null);
  const [circleSize, setCircleSize] = useState(100);

  const phases = [
    { name: "Inhale", color: "bg-blue-400" },
    { name: "Hold", color: "bg-purple-400" },
    { name: "Exhale", color: "bg-green-400" },
    { name: "Hold", color: "bg-purple-400" }
  ];

  const technique = breathingTechniques[currentTechnique];
  const currentPhaseName = phases[currentPhase % phases.length].name;
  const currentPhaseColor = phases[currentPhase % phases.length].color;

  useEffect(() => {
    if (isActive) {
      startBreathing();
    } else {
      stopBreathing();
    }
    return () => stopBreathing();
  }, [isActive, currentTechnique]);

  useEffect(() => {
    if (timeLeft > 0 && isActive) {
      const interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      timerRef.current = interval;
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && isActive) {
      nextPhase();
    }
  }, [timeLeft, isActive]);

  useEffect(() => {
    // Breathing animation
    if (isActive) {
      const totalTime = technique.pattern[currentPhase % technique.pattern.length];
      const steps = totalTime * 10;
      let step = 0;
      
      const animate = () => {
        if (currentPhaseName === "Inhale") {
          setCircleSize(100 + (step / steps) * 100);
        } else if (currentPhaseName === "Exhale") {
          setCircleSize(200 - (step / steps) * 100);
        }
        step++;
        if (step <= steps) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animate();
      return () => cancelAnimationFrame(animationRef.current);
    } else {
      setCircleSize(100);
    }
  }, [currentPhase, isActive]);

  const startBreathing = () => {
    setCurrentPhase(0);
    setCycleCount(0);
    setTimeLeft(technique.pattern[0]);
  };

  const stopBreathing = () => {
    clearInterval(timerRef.current);
    cancelAnimationFrame(animationRef.current);
    timerRef.current = null;
    animationRef.current = null;
  };

  const nextPhase = () => {
    const nextPhase = (currentPhase + 1) % technique.pattern.length;
    setCurrentPhase(nextPhase);
    setTimeLeft(technique.pattern[nextPhase]);
    
    if (nextPhase === 0) {
      setCycleCount(prev => {
        if (prev + 1 >= technique.cycles) {
          setIsActive(false);
          return 0;
        }
        return prev + 1;
      });
    }
  };

  const toggleBreathing = () => {
    setIsActive(!isActive);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeLeft(technique.pattern[0]);
    setCycleCount(0);
  };

  const changeTechnique = (index) => {
    setCurrentTechnique(index);
    resetBreathing();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🧘 Breathing Exercise</h1>
      
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">{technique.name}</h2>
        <p className="text-gray-600 mb-6">{technique.description}</p>
        
        {/* Breathing Visualization */}
        <div className="flex justify-center mb-8">
          <div 
            className={`rounded-full ${currentPhaseColor} flex items-center justify-center transition-all duration-1000 ease-in-out`}
            style={{
              width: `${circleSize}px`,
              height: `${circleSize}px`,
            }}
          >
            <span className="text-white font-bold text-xl">
              {currentPhaseName}
            </span>
          </div>
        </div>
        
        {/* Timer and Controls */}
        <div className="text-center mb-6">
          <div className="text-4xl font-bold mb-2">{timeLeft}s</div>
          <div className="text-gray-500 mb-4">
            Cycle {cycleCount + 1} of {technique.cycles}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={toggleBreathing}
              className={`flex items-center gap-2 px-6 py-3 rounded-full ${
                isActive ? 'bg-red-500' : 'bg-green-500'
              } text-white font-medium`}
            >
              {isActive ? (
                <>
                  <PauseIcon className="w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <PlayIcon className="w-5 h-5" />
                  Start
                </>
              )}
            </button>
            <button
              onClick={resetBreathing}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-medium"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>
      
      {/* Techniques */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Breathing Techniques</h2>
        <div className="space-y-4">
          {breathingTechniques.map((tech, index) => (
            <div
              key={tech.name}
              onClick={() => changeTechnique(index)}
              className={`p-4 rounded-lg cursor-pointer transition ${
                currentTechnique === index
                  ? 'bg-pink-100 border border-pink-300'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <h3 className="font-medium">{tech.name}</h3>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}