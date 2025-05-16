import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

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

  // Animation variants
  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Enhanced with glass morphism */}
      <motion.aside 
        className="w-64 bg-white/80 backdrop-blur-md shadow-lg p-6 hidden md:block relative z-10"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100 rounded-full opacity-20 blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full opacity-20 blur-3xl -ml-32 -mb-32"></div>
        
        <Link to="/" className="block relative z-10">
          <div className="flex items-center space-x-2 mb-10 p-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <HeartIcon className="w-8 h-8 text-pink-500" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Wellnest</span>
          </div>
        </Link>
        
        <nav className="space-y-2 relative z-10">
          {navItems.map((item) => (
            <motion.div key={item.path} variants={linkVariants}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-pink-600 font-medium shadow-sm'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className={`w-9 h-9 flex items-center justify-center rounded-full ${
                  location.pathname === item.path 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'bg-gray-100'
                }`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <span>{item.label}</span>
                
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-pink-500"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile bottom nav - Enhanced with glass morphism */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 flex flex-col items-center text-xs ${
                location.pathname === item.path 
                  ? 'text-pink-500 font-medium'
                  : 'text-gray-500'
              }`}
            >
              <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 ${
                location.pathname === item.path 
                  ? 'bg-gradient-to-r from-pink-500/10 to-purple-600/10'
                  : ''
              }`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.main 
        className="flex-1 pb-20 md:pb-0 relative"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}