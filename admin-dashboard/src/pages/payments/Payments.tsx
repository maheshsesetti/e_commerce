import React from 'react';
import { CreditCard } from 'lucide-react';

const Payments: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-600">View transactions, refunds, and settlement reports</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <CreditCard className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Management</h3>
        <p className="text-gray-600">Monitor payment transactions, process refunds, and view settlement details.</p>
      </div>
    </div>
  );
};

export default Payments;