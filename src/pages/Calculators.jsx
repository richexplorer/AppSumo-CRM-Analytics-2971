import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import ROICalculator from '../components/calculators/ROICalculator';
import LTVCalculator from '../components/calculators/LTVCalculator';
import ConversionCalculator from '../components/calculators/ConversionCalculator';
import CalculatorResults from '../components/CalculatorResults';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCalculator, FiTrendingUp, FiDollarSign, FiTarget } = FiIcons;

const Calculators = () => {
  const { calculatorData } = useCRM();
  const [activeCalculator, setActiveCalculator] = useState('roi');

  const calculators = [
    {
      id: 'roi',
      name: 'ROI Calculator',
      icon: FiTrendingUp,
      description: 'Calculate return on investment for campaigns',
      component: ROICalculator
    },
    {
      id: 'ltv',
      name: 'LTV Calculator',
      icon: FiDollarSign,
      description: 'Calculate customer lifetime value',
      component: LTVCalculator
    },
    {
      id: 'conversion',
      name: 'Conversion Calculator',
      icon: FiTarget,
      description: 'Analyze conversion rates and optimization',
      component: ConversionCalculator
    }
  ];

  const ActiveComponent = calculators.find(calc => calc.id === activeCalculator)?.component;

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Calculators</h1>
        <p className="text-gray-600 mt-1">Business calculators to help with decision making</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {calculators.map((calc, index) => (
          <motion.button
            key={calc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setActiveCalculator(calc.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              activeCalculator === calc.id
                ? 'border-appsumo-primary bg-appsumo-primary text-white'
                : 'border-gray-200 hover:border-appsumo-primary'
            }`}
          >
            <div className="flex items-center space-x-3">
              <SafeIcon icon={calc.icon} className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">{calc.name}</h3>
                <p className={`text-sm ${activeCalculator === calc.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {calc.description}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {ActiveComponent && <ActiveComponent />}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CalculatorResults />
        </motion.div>
      </div>
    </div>
  );
};

export default Calculators;