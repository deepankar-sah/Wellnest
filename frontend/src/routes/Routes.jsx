import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import MoodTracker from '../features/MoodTracker/MoodTracker';
import WaterTracker from '../features/WaterTracker/WaterTracker';
import SleepTracker from '../features/SleepTracker/SleepTracker';
import BreathingExercise from '../features/Breathing/BreathingExercise';
import MealTracker from '../features/MealTracker/MealTracker';
import Journal from '../features/Journal/Journal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'mood',
        element: <MoodTracker />,
      },
      {
        path: 'water',
        element: <WaterTracker />,
      },
      {
        path: 'sleep',
        element: <SleepTracker />,
      },
      {
        path: 'breathing',
        element: <BreathingExercise />,
      },
      {
        path: 'meals',
        element: <MealTracker />,
      },
      {
        path: 'journal',
        element: <Journal />,
      },
    ],
  },
]);

export default router;