import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../../context/CRMContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiTarget, FiCalculator } = FiIcons;

const ConversionCalculator = () => {
  const { addCalculatorResult } = useCRM();
  const [inputs, setInputs] = useState({
    visitors: '',
    conversions: '',
    currentRate: '',
    targetRate: '',
    avgOrderValue: ''
  });
  const [result, setResult] = useState(null);

  const calculateConversion = () => {
    const visitors = parseFloat(inputs.visitors) || 0;
    const conversions = parseFloat(inputs.conversions) || 0;
    const currentRate = conversions > 0 ? (conversions / visitors) * 100 : 0;
    const targetRate = parseFloat(inputs.targetRate) || 0;
    const avgOrderValue = parseFloat(inputs.avgOrderValue) || 0;
    
    const improvement = targetRate - currentRate;
    const additionalConversions = (targetRate / 100) * visitors - conversions;
    const additionalRevenue = additionalConversions * avgOrderValue;
    
    const calculatedResult = {
      currentRate: currentRate.toFixed(2),
      improvement: improvement.toFixed(2),
      additionalConversions: Math.max(0, additionalConversions).toFixed(0),
      additionalRevenue: Math.max(0, additionalRevenue).toFixed(2)
    };
    
    setResult(calculatedResult);
    addCalculatorResult('conversion', { ...inputs, ...calculatedResult });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiTarget} className="w-5 h-5 text-appsumo-primary" />
        <h2 className="text-xl font-semibold text-gray-900">Conversion Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Visitors
          </label>
          <input
            type="number"
            name="visitors"
            value={inputs.visitors}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter total visitors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Conversions
          </label>
          <input
            type="number"
            name="conversions"
            value={inputs.conversions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter current conversions"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Conversion Rate (%)
          </label>
          <input
            type="number"
            name="targetRate"
            value={inputs.targetRate}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter target rate"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Average Order Value ($)
          </label>
          <input
            type="number"
            name="avgOrderValue"
            value={inputs.avgOrderValue}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter average order value"
          />
        </div>
        
        <button
          onClick={calculateConversion}
          className="w-full bg-appsumo-primary hover:bg-appsumo-secondary text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiCalculator} className="w-5 h-5" />
          <span>Calculate Impact</span>
        </button>
        
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gray-50 rounded-lg"
          >
            <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Rate:</span>
                <span className="font-medium">{result.currentRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Improvement:</span>
                <span className="font-medium text-green-600">+{result.improvement}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Conversions:</span>
                <span className="font-medium">{result.additionalConversions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Additional Revenue:</span>
                <span className="font-medium text-green-600">${result.additionalRevenue}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ConversionCalculator;