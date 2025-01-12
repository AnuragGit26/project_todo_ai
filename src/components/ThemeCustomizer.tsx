import React, { useState } from 'react';
import { Settings, Moon, Sun, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodoStore } from '../store/todoStore';

const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTodoStore();

  const toggleTheme = () => {
    setTheme({
      ...theme,
      mode: theme.mode === 'light' ? 'dark' : 'light',
    });
    // Force document class update
    document.documentElement.classList.toggle('dark', theme.mode === 'light');
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Settings className="w-6 h-6 text-gray-700 dark:text-gray-200" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            />
            
            {/* Settings Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="absolute right-0 mt-2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-80 z-50"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Theme Settings</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 dark:text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Theme Mode</label>
                  <button
                    onClick={toggleTheme}
                    className="w-full p-3 flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      {theme.mode === 'light' ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                      {theme.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${
                      theme.mode === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full"
                        animate={{ x: theme.mode === 'dark' ? 16 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </div>
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Primary Color</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-200">Secondary Color</label>
                  <div className="relative">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-gray-700">
                  <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }} />
                    <span>Primary: {theme.primaryColor}</span>
                  </div>
                  <div className="flex gap-2 items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.secondaryColor }} />
                    <span>Secondary: {theme.secondaryColor}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeCustomizer;