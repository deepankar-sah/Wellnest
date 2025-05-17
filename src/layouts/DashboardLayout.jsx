import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HeartIcon, SunIcon, MoonIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/dashboard/mood', icon: '😊', label: 'Mood' },
  { path: '/dashboard/water', icon: '💧', label: 'Water' },
  { path: '/dashboard/sleep', icon: '😴', label: 'Sleep' },
  { path: '/dashboard/breathing', icon: '🧘', label: 'Breathing' },
  { path: '/dashboard/meals', icon: '🍎', label: 'Meals' },
  { path: '/dashboard/journal', icon: '📓', label: 'Journal' }
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('User signed out');
    navigate('/'); // Redirect to home page
  };

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
    <div className={`flex h-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-300`}>
      {/* Sidebar */}
      <motion.aside 
        className={`w-64 ${isDarkMode 
          ? 'bg-gray-800/80 text-white border-r border-gray-700' 
          : 'bg-white/80 text-gray-800 border-r border-gray-100'
        } backdrop-blur-md shadow-lg hidden md:block relative z-10 transition-colors duration-300`}
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-64 h-64 ${isDarkMode ? 'bg-purple-900' : 'bg-pink-100'} rounded-full opacity-20 blur-3xl -mr-32 -mt-32`}></div>
        <div className={`absolute bottom-0 left-0 w-64 h-64 ${isDarkMode ? 'bg-blue-900' : 'bg-purple-100'} rounded-full opacity-20 blur-3xl -ml-32 -mb-32`}></div>
        
        <div className="p-6">
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
          
          <div className="mb-8 flex justify-between items-center">
            <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>MENU</h3>
            <motion.button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </motion.button>
          </div>
          
          <nav className="space-y-1 relative z-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div key={item.path} variants={linkVariants}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? isDarkMode 
                          ? 'bg-purple-500/20 text-purple-400 font-medium' 
                          : 'bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-pink-600 font-medium shadow-sm'
                        : isDarkMode 
                          ? 'hover:bg-gray-700/50 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                      isActive 
                        ? isDarkMode 
                          ? 'bg-purple-500/30 text-purple-300' 
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700/70 text-gray-300' 
                          : 'bg-gray-100'
                    }`}>
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <span>{item.label}</span>
                    
                    {isActive && (
                      <motion.div
                        className={`absolute right-3 w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-purple-400' : 'bg-pink-500'}`}
                        layoutId="activeIndicator"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>

        {/* Profile Section */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
              D
            </div>
            <div>
              <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Deepankar</p>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium Member</p>
            </div>
          </div>
          <motion.button
            onClick={handleSignOut}
            className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } transition-colors duration-200`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* <ArrowLeftOnRectangleIcon className="w-5 h-5" /> */}
            <span className="text-sm font-medium">Sign Out</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Mobile slide-over menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className={`fixed inset-y-0 left-0 w-64 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-xl overflow-y-auto`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="w-6 h-6 text-pink-500" />
                    <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Wellnest</span>
                  </div>
                  <motion.button 
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                  </motion.button>
                </div>
                
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? isDarkMode 
                              ? 'bg-purple-500/20 text-purple-400 font-medium' 
                              : 'bg-gradient-to-r from-pink-500/10 to-purple-600/10 text-pink-600 font-medium'
                            : isDarkMode 
                              ? 'hover:bg-gray-700/50 text-gray-300' 
                              : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                          isActive 
                            ? isDarkMode 
                              ? 'bg-purple-500/30 text-purple-300' 
                              : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : isDarkMode 
                              ? 'bg-gray-700/70 text-gray-300' 
                              : 'bg-gray-100'
                        }`}>
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Profile Section */}
              <div className={`absolute bottom-0 left-0 right-0 p-6 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Deepankar</p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Premium Member</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-center gap-2 p-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main 
        className="flex-1 pb-20 md:pb-6 relative"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        <Outlet />
      </motion.main>
    </div>
  );
}