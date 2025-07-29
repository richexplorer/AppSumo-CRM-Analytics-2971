import React from 'react';
import { motion } from 'framer-motion';
import { useCRM } from '../context/CRMContext';
import { format } from 'date-fns';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMail, FiBuilding } = FiIcons;

const RecentLeads = () => {
  const { leads } = useCRM();
  const recentLeads = leads.slice(0, 5);

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      qualified: 'bg-purple-100 text-purple-800',
      converted: 'bg-green-100 text-green-800',
      lost: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Leads</h2>
      
      <div className="space-y-4">
        {recentLeads.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No leads yet. Add your first lead!</p>
        ) : (
          recentLeads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-appsumo-primary rounded-full flex items-center justify-center">
                  <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{lead.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <SafeIcon icon={FiMail} className="w-4 h-4" />
                      <span>{lead.email}</span>
                    </div>
                    {lead.company && (
                      <div className="flex items-center space-x-1">
                        <SafeIcon icon={FiBuilding} className="w-4 h-4" />
                        <span>{lead.company}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {format(new Date(lead.createdAt), 'MMM dd')}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentLeads;