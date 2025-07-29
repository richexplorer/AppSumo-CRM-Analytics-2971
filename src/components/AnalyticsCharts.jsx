import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCRM } from '../context/CRMContext';

const AnalyticsCharts = () => {
  const { leads } = useCRM();

  // Generate analytics data
  const monthlyData = [
    { month: 'Jan', leads: 45, converted: 12 },
    { month: 'Feb', leads: 52, converted: 19 },
    { month: 'Mar', leads: 48, converted: 15 },
    { month: 'Apr', leads: 61, converted: 25 },
    { month: 'May', leads: 58, converted: 22 },
    { month: 'Jun', leads: 72, converted: 30 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Performance</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
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
          <Bar dataKey="leads" fill="#3b82f6" name="Total Leads" />
          <Bar dataKey="converted" fill="#10b981" name="Converted" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsCharts;