import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import AnalyticsCharts from '../components/AnalyticsCharts';
import LeadSourceChart from '../components/LeadSourceChart';
import ConversionFunnel from '../components/ConversionFunnel';

const Analytics = () => {
  const { analytics, leads } = useCRM();

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive insights into your lead performance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AnalyticsCharts />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LeadSourceChart />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ConversionFunnel />
      </motion.div>
    </div>
  );
};

export default Analytics;