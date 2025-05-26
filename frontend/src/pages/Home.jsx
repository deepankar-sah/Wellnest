import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChartBarIcon, HeartIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

// SVG Icons
const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

// Physical Health SVG Icon
const PhysicalHealthIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" className="w-10 h-10 text-white">
    <rect x="6" y="13" width="20" height="6" rx="2" fill="currentColor" />
    <rect x="2" y="11" width="4" height="10" rx="1.5" fill="currentColor" />
    <rect x="26" y="11" width="4" height="10" rx="1.5" fill="currentColor" />
  </svg>
);

const HeartLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-pink-500">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

// WaterDropIconFeature SVG Icon
const WaterDropIconFeature = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 text-blue-500">
    <path fillRule="evenodd" d="M12 2C12 2 7 8.5 7 13a5 5 0 1010 0c0-4.5-5-11-5-11zm0 17a4 4 0 01-4-4c0-2.5 2.5-7 4-9.5C13.5 8 16 12.5 16 15a4 4 0 01-4 4z" clipRule="evenodd" fill="currentColor" />
  </svg>
);

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};
const lineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};
const ctaVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, delay: 0.5 } }
};
const svgCircleVariants = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, delay: 0.4 } }
};
const floatCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
};

const Home = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const bg = isDarkMode ? 'bg-gray-950' : 'bg-gray-50';
  const text = isDarkMode ? 'text-white' : 'text-gray-900';
  const subtext = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const card = isDarkMode ? 'bg-gray-900 border-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-900 shadow-sm';
  const sectionBg = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
  const border = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const navBg = isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-b border-gray-200';
  const footerBg = isDarkMode ? 'bg-gray-950 border-gray-800' : 'bg-white border-t border-gray-200';

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className={`${navBg} sticky top-0 z-50`}>
        <div className="container mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <HeartLogo />
              </motion.div>
              <span className={`text-xl font-bold ${text}`}>wellnest</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full border ${isDarkMode ? 'bg-gray-800 text-yellow-300 border-gray-700' : 'bg-gray-100 text-yellow-500 border-gray-200 hover:bg-yellow-50'} transition`}
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
              </button>
              <Link to="/dashboard" className="px-6 py-2.5 bg-pink-500 text-white rounded-full font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`py-16 md:py-24 lg:py-32 px-6 md:px-12 container mx-auto ${bg}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div 
            className="lg:col-span-7 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div className="pl-4 border-l-4 border-pink-500 mb-8" variants={lineVariants}>
              <span className="text-pink-500 font-medium">wellness platform</span>
            </motion.div>
            <motion.h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8" style={{lineHeight:1.1}}>
              <motion.div variants={lineVariants} className={text}>Organize</motion.div>
              <motion.div variants={lineVariants} className={text}>Your</motion.div>
              <motion.span variants={lineVariants} className="relative inline-block">
                <span className={text}>Wellness</span>
                <motion.svg
                  className="absolute -top-1 -right-8 w-16 h-16 text-pink-500"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                  variants={svgCircleVariants}
                >
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10" fill="none" />
                </motion.svg>
              </motion.span>
            </motion.h1>
            <motion.p className={`text-xl mb-10 max-w-xl ${subtext}`} variants={lineVariants}>
              Track, improve, and visualize your health with our all-in-one wellness platform. 
              Monitor mood, hydration, sleep, and more with beautifully designed tools.
            </motion.p>
            <motion.div 
              className="inline-block"
              variants={ctaVariants}
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-pink-500 text-white font-medium rounded-full inline-flex items-center"
              >
                Start Now
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
          {/* Image Column*/}
          <motion.div 
            className="lg:col-span-5 relative"
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <motion.div
              className={`${isDarkMode ? 'bg-gray-900' : 'bg-pink-100'} rounded-3xl overflow-hidden relative aspect-[4/5]`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Woman meditating" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Floating cards */}
            <motion.div 
              className={`${card} absolute -top-6 -right-6 p-4 rounded-xl shadow-lg max-w-[200px]`}
              initial="hidden"
              animate="visible"
              variants={floatCardVariants}
              whileHover={{ y: -8, scale: 1.03, boxShadow: '0 8px 32px 0 rgba(60,60,120,0.10)' }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <WaterDropIcon />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">Hydration</p>
                  <p className="text-xs text-gray-500">78% of goal</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className={`${card} absolute -bottom-6 -left-6 p-4 rounded-xl shadow-lg max-w-[200px]`}
              initial="hidden"
              animate="visible"
              variants={floatCardVariants}
              whileHover={{ y: 5 }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MoonIcon className="w-6 h-6 text-purple-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">Sleep Quality</p>
                  <p className="text-xs text-gray-500">8.2 hrs - Excellent</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Wellness Matters Section */}
      <section className={`py-24 md:py-32 ${sectionBg}`}>
        <div className="container mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-24"
          >
            <h2 className={`text-6xl font-bold ${text} leading-tight mb-8`}>
              Why Wellness<br/> 
              <span className="relative inline-block pr-4">
                Matters
                <div className="absolute h-6 w-full -bottom-2 bg-pink-200/50 -z-10"></div>
              </span>
            </h2>
            <p className={`text-xl ${subtext} max-w-2xl`}>
              In our fast-paced world, taking care of your holistic health has never been more important
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${card} p-10 rounded-3xl border group`}
            >
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mb-8">
                <HeartIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${text} mb-4`}>Mental Health</h3>
              <p className={`${subtext} leading-relaxed`}>
                Chronic stress affects 77% of people, leading to physical and mental health issues. Regular tracking helps identify patterns and manage stress effectively.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${card} p-10 rounded-3xl border group md:mt-16`}
            >
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mb-8">
                <PhysicalHealthIcon />
              </div>
              <h3 className={`text-2xl font-bold ${text} mb-4`}>Physical Health</h3>
              <p className={`${subtext} leading-relaxed`}>
                75% of adults are chronically dehydrated. Proper hydration improves energy levels, cognitive function, and overall physical well-being.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${card} p-10 rounded-3xl border group lg:mt-32`}
            >
              <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mb-8">
                <MoonIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className={`text-2xl font-bold ${text} mb-4`}>Sleep Quality</h3>
              <p className={`${subtext} leading-relaxed`}>
                1 in 3 adults don't get enough sleep. Quality sleep is essential for immune function, metabolism, and mental clarity throughout your day.
              </p>
            </motion.div>
          </div>
          
          {/* Statistics section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 py-16 px-10 bg-pink-500 rounded-3xl text-white"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-5xl font-bold mb-2">10k+</h3>
                <p className="text-white/80">Active Users</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <h3 className="text-5xl font-bold mb-2">85%</h3>
                <p className="text-white/80">Stress Reduction</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h3 className="text-5xl font-bold mb-2">92%</h3>
                <p className="text-white/80">User Satisfaction</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <h3 className="text-5xl font-bold mb-2">24/7</h3>
                <p className="text-white/80">Health Tracking</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section*/}
      <section id="features" className={`py-24 md:py-32 ${bg} relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute right-0 top-40 w-64 h-64 bg-pink-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute left-0 bottom-40 w-96 h-96 bg-blue-50 rounded-full opacity-30 blur-3xl"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-24"
          >
            <div className="inline-block bg-pink-100 text-pink-500 px-4 py-1 rounded-full mb-6">
              present
            </div>
            <div className="flex items-end">
              <h2 className={`text-6xl sm:text-7xl font-bold ${text} leading-tight mb-6 mr-3`}>
                Surprise
              </h2>
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-7 relative"
              >
                <span className="text-7xl sm:text-8xl font-bold text-pink-500">.</span>
                <svg className="absolute -right-10 -top-10 w-16 h-16 text-pink-200" viewBox="0 0 100 100">
                  <motion.path 
                    d="M 95,50 C 95,75 75,95 50,95 25,95 5,75 5,50 5,25 25,5 50,5 75,5 95,25 95,50 Z" 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                </svg>
              </motion.div>
            </div>
            <div className="h-1 w-24 bg-pink-500 mb-8 rounded-full"></div>
            <p className={`text-xl ${subtext} max-w-2xl`}>
              Wellnest helps you monitor all aspects of your health and wellness in one beautifully designed platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Mood Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-pink-50 to-pink-100 overflow-hidden relative group-hover:from-pink-100 group-hover:to-pink-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <HeartIcon className="w-20 h-20 text-pink-500" />
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-pink-500 transition-colors duration-300`}>Mood Tracking</h3>
                <p className={subtext}>
                  Log your daily moods and emotions to identify patterns and improve mental wellness over time.
                </p>
              </div>
            </motion.div>

            {/* Water Intake */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500 md:mt-16`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden relative group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <WaterDropIconFeature />
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-blue-500 transition-colors duration-300`}>Water Intake</h3>
                <p className={subtext}>
                  Track your daily hydration with visual indicators and custom goals for better health.
                </p>
              </div>
            </motion.div>

            {/* Sleep Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500 lg:mt-32`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-50 to-purple-100 overflow-hidden relative group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MoonIcon className="w-20 h-20 text-purple-500" />
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-purple-500 transition-colors duration-300`}>Sleep Tracking</h3>
                <p className={subtext}>
                  Monitor your sleep patterns and improve your rest quality over time with detailed insights.
                </p>
              </div>
            </motion.div>

            {/* Breathing Exercises */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-indigo-50 to-indigo-100 overflow-hidden relative group-hover:from-indigo-100 group-hover:to-indigo-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-5xl">🧘</span>
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-indigo-500 transition-colors duration-300`}>Breathing Exercises</h3>
                <p className={subtext}>
                  Guided breathing sessions to help you relax, focus, and reduce stress throughout your day.
                </p>
              </div>
            </motion.div>

            {/* Meal Logging */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500 md:mt-16`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden relative group-hover:from-yellow-100 group-hover:to-yellow-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-5xl">🍎</span>
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-yellow-500 transition-colors duration-300`}>Meal Logging</h3>
                <p className={subtext}>
                  Keep track of your meals and nutrition to maintain a balanced diet and better eating habits.
                </p>
              </div>
            </motion.div>

            {/* Progress Insights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className={`${card} rounded-3xl border overflow-hidden group hover:shadow-xl transition-all duration-500 lg:mt-32`}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-video bg-gradient-to-br from-green-50 to-green-100 overflow-hidden relative group-hover:from-green-100 group-hover:to-green-200 transition-all duration-500">
                <motion.div 
                  className="h-full w-full flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <ChartBarIcon className="w-20 h-20 text-green-500" />
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className={`text-2xl font-bold ${text} mb-4 group-hover:text-green-500 transition-colors duration-300`}>Progress Insights</h3>
                <p className={subtext}>
                  Visualize your wellness journey with beautiful charts and statistics to track your improvement.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Feature highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-32 bg-gradient-to-br from-pink-500 to-pink-600 rounded-3xl overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-400 rounded-full opacity-30 blur-3xl"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 p-10 md:p-12 lg:p-16 items-center gap-10 lg:gap-20">
              <div>
                <h3 className="text-4xl font-bold text-white mb-6">Experience Wellness Like Never Before</h3>
                <p className="text-white/90 mb-8 text-lg">
                  Our platform combines beautiful design with powerful tracking features to help you achieve your wellness goals.
                </p>
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-white text-pink-600 font-medium rounded-full inline-flex items-center"
                  >
                    Explore Features
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className="flex justify-center items-center h-full"
                initial={{ rotate: -5, scale: 0.9 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white p-3 rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Dashboard preview" 
                    className="w-full h-auto rounded-2xl aspect-[4/3] object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className={`py-24 md:py-32 ${sectionBg}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-block bg-pink-100 text-pink-500 px-4 py-1 rounded-full mb-6">
                  choose wellnest
                </div>
                <h2 className={`text-5xl md:text-6xl font-bold mb-8 ${isDarkMode ? 'text-white' : text} leading-tight`}>
                  Ready to 
                  <span className="relative inline-block ml-2 mr-3">
                    transform
                    <div className="absolute h-5 w-full -bottom-2 bg-pink-200/50 -z-10"></div>
                  </span>
                  your wellness journey?
                </h2>
                <p className={`text-xl mb-8 max-w-xl ${isDarkMode ? 'text-gray-300' : subtext}`}>
                  Join thousands of users who have already improved their health and well-being with Wellnest's comprehensive tools.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Free Setup</h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Get started completely free with all essential features</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>Expert Support</h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Access to our team of wellness experts</p>
                    </div>
                  </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-pink-500 text-white font-medium rounded-full inline-flex items-center"
                  >
                    Start Your Journey
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="aspect-square bg-pink-100 rounded-3xl overflow-hidden relative hidden lg:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Person practicing yoga" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-16 ${footerBg} border-t ${border}`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <HeartLogo />
              </motion.div>
              <span className={`text-xl font-bold ${text}`}>wellnest</span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="https://instagram.com/deepankar_sah" className={`hover:text-pink-500 transition-colors ${subtext}`} aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link to="https://github.com/deepankar-sah" className={`hover:text-pink-500 transition-colors ${subtext}`} aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className={`border-t ${border} pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <p className={subtext}>© 2025 Wellnest. All rights reserved.</p>
            <p className={`mt-4 md:mt-0 ${subtext}`}>Built with ❤️ by Deepankar</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;