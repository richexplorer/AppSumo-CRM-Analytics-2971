import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

const CRMContext = createContext();

export const useCRM = () => {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};

export const CRMProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [calculatorData, setCalculatorData] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    conversionRate: 0,
    avgDealSize: 0,
    monthlyGrowth: 0
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('appsumo-leads');
    const savedCalculators = localStorage.getItem('appsumo-calculators');
    
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    }
    if (savedCalculators) {
      setCalculatorData(JSON.parse(savedCalculators));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('appsumo-leads', JSON.stringify(leads));
    updateAnalytics();
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('appsumo-calculators', JSON.stringify(calculatorData));
  }, [calculatorData]);

  const updateAnalytics = () => {
    const totalLeads = leads.length;
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    const avgDealSize = leads.reduce((sum, lead) => sum + (lead.dealSize || 0), 0) / totalLeads || 0;
    
    setAnalytics({
      totalLeads,
      conversionRate,
      avgDealSize,
      monthlyGrowth: 12.5 // Mock data
    });
  };

  const addLead = (leadData) => {
    const newLead = {
      id: Date.now(),
      ...leadData,
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLead = (id, updates) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const addCalculatorResult = (calculatorType, data) => {
    const newResult = {
      id: Date.now(),
      type: calculatorType,
      data,
      createdAt: new Date().toISOString()
    };
    setCalculatorData(prev => [newResult, ...prev]);
  };

  const value = {
    leads,
    calculatorData,
    analytics,
    addLead,
    updateLead,
    deleteLead,
    addCalculatorResult
  };

  return (
    <CRMContext.Provider value={value}>
      {children}
    </CRMContext.Provider>
  );
};