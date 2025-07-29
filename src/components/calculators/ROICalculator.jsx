import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../../context/CRMContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiDollarSign, FiCalculator } = FiIcons;

const ROICalculator = () => {
  const { addCalculatorResult } = useCRM();
  const [inputs, setInputs] = useState({
    investment: '',
    revenue: '',
    costs: '',
    timeframe: '12'
  });
  const [result, setResult] = useState(null);

  const calculateROI = () => {
    const investment = parseFloat(inputs.investment) || 0;
    const revenue = parseFloat(inputs.revenue) || 0;
    const costs = parseFloat(inputs.costs) || 0;
    
    const profit = revenue - costs;
    const roi = investment > 0 ? ((profit - investment) / investment) * 100 : 0;
    const paybackPeriod = investment > 0 ? investment / (profit / 12) : 0;
    
    const calculatedResult = {
      roi: roi.toFixed(2),
      profit: profit.toFixed(2),
      paybackPeriod: paybackPeriod.toFixed(1)
    };
    
    setResult(calculatedResult);
    addCalculatorResult('roi', { ...inputs, ...calculatedResult });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiDollarSign} className="w-5 h-5 text-appsumo-primary" />
        <h2 className="text-xl font-semibold text-gray-900">ROI Calculator</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment ($)
          </label>
          <input
            type="number"
            name="investment"
            value={inputs.investment}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter investment amount"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Revenue ($)
          </label>
          <input
            type="number"
            name="revenue"
            value={inputs.revenue}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter total revenue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Operating Costs ($)
          </label>
          <input
            type="number"
            name="costs"
            value={inputs.costs}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter operating costs"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeframe (months)
          </label>
          <select
            name="timeframe"
            value={inputs.timeframe}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
          >
            <option value="6">6 months</option>
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
          </select>
        </div>
        
        <button
          onClick={calculateROI}
          className="w-full bg-appsumo-primary hover:bg-appsumo-secondary text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiCalculator} className="w-5 h-5" />
          <span>Calculate ROI</span>
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
                <span className="text-gray-600">ROI:</span>
                <span className={`font-medium ${parseFloat(result.roi) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.roi}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Profit:</span>
                <span className="font-medium">${result.profit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payback Period:</span>
                <span className="font-medium">{result.paybackPeriod} months</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;