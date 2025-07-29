import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCRM } from '../context/CRMContext';

const ConversionChart = () => {
  const { leads } = useCRM();

  // Generate mock data for the chart
  const data = [
    { month: 'Jan', conversions: 12, leads: 45 },
    { month: 'Feb', conversions: 19, leads: 52 },
    { month: 'Mar', conversions: 15, leads: 48 },
    { month: 'Apr', conversions: 25, leads: 61 },
    { month: 'May', conversions: 22, leads: 58 },
    { month: 'Jun', conversions: 30, leads: 72 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Conversion Trend</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Line
            type="monotone"
            dataKey="leads"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionChart;