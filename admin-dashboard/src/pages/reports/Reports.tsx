import React from 'react';
import { BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate sales reports, analyze product performance, and track inventory</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <BarChart3 className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
        <p className="text-gray-600">View detailed reports on sales performance, product analytics, and inventory status.</p>
      </div>
    </div>
  );
};

export default Reports;