import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import StatsCard from '../components/StatsCard';
import RecentLeads from '../components/RecentLeads';
import ConversionChart from '../components/ConversionChart';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiTrendingUp, FiDollarSign, FiTarget } = FiIcons;

const Dashboard = () => {
  const { analytics, leads } = useCRM();

  const statsData = [
    {
      title: 'Total Leads',
      value: analytics.totalLeads,
      icon: FiUsers,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Conversion Rate',
      value: `${analytics.conversionRate.toFixed(1)}%`,
      icon: FiTarget,
      color: 'bg-green-500',
      change: '+5.2%'
    },
    {
      title: 'Avg Deal Size',
      value: `$${analytics.avgDealSize.toFixed(0)}`,
      icon: FiDollarSign,
      color: 'bg-purple-500',
      change: '+8.1%'
    },
    {
      title: 'Monthly Growth',
      value: `${analytics.monthlyGrowth}%`,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+2.3%'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your leads.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ConversionChart />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <RecentLeads />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;