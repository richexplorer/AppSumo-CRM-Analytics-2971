import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiHome, FiUsers, FiBarChart3, FiCalculator, FiSettings, FiMenu } = FiIcons;

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/leads', icon: FiUsers, label: 'Leads' },
    { path: '/analytics', icon: FiBarChart3, label: 'Analytics' },
    { path: '/calculators', icon: FiCalculator, label: 'Calculators' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  return (
    <motion.div 
      className={`fixed left-0 top-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-8 bg-appsumo-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AS</span>
              </div>
              <span className="font-bold text-gray-800">AppSumo CRM</span>
            </motion.div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiMenu} className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <nav className="mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-appsumo-primary text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <SafeIcon icon={item.icon} className="w-5 h-5" />
            {isOpen && (
              <motion.span 
                className="ml-3 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.div>
  );
};

export default Sidebar;