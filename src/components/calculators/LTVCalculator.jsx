import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../../context/CRMContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiCalculator } = FiIcons;

const LTVCalculator = () => {
  const { addCalculatorResult } = useCRM();
  const [inputs, setInputs] = useState({
    avgOrderValue: '',
    purchaseFrequency: '',
    customerLifespan: '',
    acquisitionCost: ''
  });
  const [result, setResult] = useState(null);

  const calculateLTV = () => {
    const avgOrderValue = parseFloat(inputs.avgOrderValue) || 0;
    const purchaseFrequency = parseFloat(inputs.purchaseFrequency) || 0;
    const customerLifespan = parseFloat(inputs.customerLifespan) || 0;
    const acquisitionCost = parseFloat(inputs.acquisitionCost) || 0;
    
    const ltv = avgOrderValue * purchaseFrequency * customerLifespan;
    const ltvToCAC = acquisitionCost > 0 ? ltv / acquisitionCost : 0;
    const netLTV = ltv - acquisitionCost;
    
    const calculatedResult = {
      ltv: ltv.toFixed(2),
      ltvToCAC: ltvToCAC.toFixed(2),
      netLTV: netLTV.toFixed(2)
    };
    
    setResult(calculatedResult);
    addCalculatorResult('ltv', { ...inputs, ...calculatedResult });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <SafeIcon icon={FiUsers} className="w-5 h-5 text-appsumo-primary" />
        <h2 className="text-xl font-semibold text-gray-900">LTV Calculator</h2>
      </div>
      
      <div className="space-y-4">
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
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Frequency (per year)
          </label>
          <input
            type="number"
            name="purchaseFrequency"
            value={inputs.purchaseFrequency}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter purchase frequency"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Lifespan (years)
          </label>
          <input
            type="number"
            name="customerLifespan"
            value={inputs.customerLifespan}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter customer lifespan"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Acquisition Cost ($)
          </label>
          <input
            type="number"
            name="acquisitionCost"
            value={inputs.acquisitionCost}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-appsumo-primary focus:border-transparent"
            placeholder="Enter acquisition cost"
          />
        </div>
        
        <button
          onClick={calculateLTV}
          className="w-full bg-appsumo-primary hover:bg-appsumo-secondary text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <SafeIcon icon={FiCalculator} className="w-5 h-5" />
          <span>Calculate LTV</span>
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
                <span className="text-gray-600">Customer LTV:</span>
                <span className="font-medium text-green-600">${result.ltv}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">LTV to CAC Ratio:</span>
                <span className="font-medium">{result.ltvToCAC}:1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Net LTV:</span>
                <span className="font-medium">${result.netLTV}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LTVCalculator;