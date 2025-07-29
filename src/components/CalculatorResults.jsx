import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTrendingUp, FiDollarSign, FiTarget, FiTrash2 } = FiIcons;

const CalculatorResults = () => {
  const { calculatorData } = useCRM();

  const getIcon = (type) => {
    const icons = {
      roi: FiTrendingUp,
      ltv: FiDollarSign,
      conversion: FiTarget
    };
    return icons[type] || FiTrendingUp;
  };

  const getTypeLabel = (type) => {
    const labels = {
      roi: 'ROI Calculator',
      ltv: 'LTV Calculator',
      conversion: 'Conversion Calculator'
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Calculations</h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {calculatorData.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No calculations yet. Use the calculators to get started!</p>
        ) : (
          calculatorData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={getIcon(item.type)} className="w-5 h-5 text-appsumo-primary" />
                  <span className="font-medium text-gray-900">{getTypeLabel(item.type)}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {format(new Date(item.createdAt), 'MMM dd, HH:mm')}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                {item.type === 'roi' && (
                  <>
                    <div className="flex justify-between">
                      <span>Investment:</span>
                      <span>${item.data.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI:</span>
                      <span className={parseFloat(item.data.roi) >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {item.data.roi}%
                      </span>
                    </div>
                  </>
                )}
                
                {item.type === 'ltv' && (
                  <>
                    <div className="flex justify-between">
                      <span>Customer LTV:</span>
                      <span>${item.data.ltv}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>LTV to CAC:</span>
                      <span>{item.data.ltvToCAC}:1</span>
                    </div>
                  </>
                )}
                
                {item.type === 'conversion' && (
                  <>
                    <div className="flex justify-between">
                      <span>Current Rate:</span>
                      <span>{item.data.currentRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Revenue:</span>
                      <span className="text-green-600">${item.data.additionalRevenue}</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalculatorResults;