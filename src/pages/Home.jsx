import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ChartBarIcon, HeartIcon, MoonIcon,  } from '@heroicons/react/24/outline';

// SVG Icons
const WaterDropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-500">
    <path fillRule="evenodd" d="M10.5 1.5a.75.75 0 01.75.75V4.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0110.5 1.5zM5.636 4.136a.75.75 0 011.06 0l1.592 1.591a.75.75 0 01-1.061 1.06l-1.591-1.59a.75.75 0 010-1.061zm12.728 0a.75.75 0 010 1.06l-1.591 1.592a.75.75 0 01-1.06-1.061l1.59-1.591a.75.75 0 011.061 0zm-6.816 4.496a.75.75 0 01.82.311l5.228 7.917a.75.75 0 01-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 01-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 01-1.247-.606l.569-9.47a.75.75 0 01.554-.68zM3 10.5a.75.75 0 01.75-.75H6a.75.75 0 010 1.5H3.75A.75.75 0 013 10.5zm14.25 0a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zm-8.962 3.712a.75.75 0 010 1.061l-1.591 1.591a.75.75 0 11-1.061-1.06l1.591-1.592a.75.75 0 011.06 0z" clipRule="evenodd" />
  </svg>
);

const HeartLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-pink-500">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HeartLogo />
              <span className="text-xl font-semibold text-gray-900">Wellnest</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-95" />
        
        <div className="relative container mx-auto px-6 z-10">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Wellness Journey Starts Here
              </h1>
              <p className="text-xl text-white opacity-90 mb-8">
                Track, improve, and visualize your health with our all-in-one wellness platform. 
                Monitor mood, hydration, sleep, and more with beautifully designed tools.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-pink-600 font-medium rounded-lg hover:bg-opacity-90 transition"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Woman meditating" 
                className="rounded-xl shadow-2xl w-full max-w-md object-cover h-80 md:h-96"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Wellness Matters Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Wellness Matters</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              In our fast-paced world, taking care of your holistic health has never been more important
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <HeartIcon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Mental Health</h3>
              <p className="text-gray-600 text-center">
                Chronic stress affects 77% of people, leading to physical and mental health issues. Tracking helps manage stress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <WaterDropIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Physical Health</h3>
              <p className="text-gray-600 text-center">
                75% of adults are chronically dehydrated. Proper hydration improves energy and cognitive function.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <MoonIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">Sleep Quality</h3>
              <p className="text-gray-600 text-center">
                1 in 3 adults don't get enough sleep. Quality sleep boosts immunity and productivity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wellnest helps you monitor all aspects of your health and wellness in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mood Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <HeartIcon className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mood Tracking</h3>
              <p className="text-gray-600">
                Log your daily moods and emotions to identify patterns and improve mental wellness.
              </p>
            </motion.div>

            {/* Water Intake */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <WaterDropIcon />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Water Intake</h3>
              <p className="text-gray-600">
                Track your daily hydration with visual indicators and custom goals.
              </p>
            </motion.div>

            {/* Sleep Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <MoonIcon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sleep Tracking</h3>
              <p className="text-gray-600">
                Monitor your sleep patterns and improve your rest quality over time.
              </p>
            </motion.div>

            {/* Breathing Exercises */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🧘</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Breathing Exercises</h3>
              <p className="text-gray-600">
                Guided breathing sessions to help you relax, focus, and reduce stress.
              </p>
            </motion.div>

            {/* Meal Logging */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🍎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Meal Logging</h3>
              <p className="text-gray-600">
                Keep track of your meals and nutrition to maintain a balanced diet.
              </p>
            </motion.div>

            {/* Progress Insights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <ChartBarIcon className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Insights</h3>
              <p className="text-gray-600">
                Visualize your wellness journey with beautiful charts and statistics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-pink-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Wellness?</h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-bold rounded-lg hover:bg-opacity-90 transition text-lg"
            >
              Start Your Journey Today
              <ArrowRightIcon className="ml-3 h-6 w-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 Wellnest. All rights reserved.</p>
          <p className="mt-2">Built with ❤️ by Deepankar_Sah</p>
          
        </div>
      </footer>
    </div>
  );
};

export default Home;