import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';

const ConversionFunnel = () => {
  const { leads } = useCRM();

  const funnelData = [
    { stage: 'Leads', count: leads.length, color: 'bg-blue-500' },
    { stage: 'Contacted', count: leads.filter(l => l.status === 'contacted').length, color: 'bg-yellow-500' },
    { stage: 'Qualified', count: leads.filter(l => l.status === 'qualified').length, color: 'bg-purple-500' },
    { stage: 'Converted', count: leads.filter(l => l.status === 'converted').length, color: 'bg-green-500' }
  ];

  const maxCount = Math.max(...funnelData.map(d => d.count)) || 1;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Conversion Funnel</h2>
      
      <div className="space-y-4">
        {funnelData.map((stage, index) => {
          const percentage = (stage.count / maxCount) * 100;
          const conversionRate = index > 0 ? (stage.count / funnelData[index - 1].count) * 100 : 100;
          
          return (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{stage.count}</span>
                  {index > 0 && (
                    <span className="text-sm text-gray-500 ml-2">
                      ({conversionRate.toFixed(1)}%)
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <motion.div
                  className={`h-8 rounded-full ${stage.color} flex items-center justify-center`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <span className="text-white text-sm font-medium">
                    {stage.count > 0 && `${stage.count}`}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ConversionFunnel;