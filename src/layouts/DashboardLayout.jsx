import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/dashboard/mood', icon: '😊', label: 'Mood' },
  { path: '/dashboard/water', icon: '💧', label: 'Water' },
  { path: '/dashboard/sleep', icon: '😴', label: 'Sleep' },
  { path: '/dashboard/breathing', icon: '🧘', label: 'Breathing' },
  { path: '/dashboard/meals', icon: '🍎', label: 'Meals' }
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-sm p-4 hidden md:block">
        <div className="flex items-center space-x-2 mb-8 p-2">
          <HeartIcon className="w-8 h-8 text-pink-500" />
          <span className="text-xl font-semibold">Wellnest</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                location.pathname === item.path
                  ? 'bg-pink-100 text-pink-600'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="flex justify-around">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 flex flex-col items-center text-xs ${
                location.pathname === item.path ? 'text-pink-500' : 'text-gray-500'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
}