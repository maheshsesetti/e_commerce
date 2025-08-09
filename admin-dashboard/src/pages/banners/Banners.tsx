import React from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const Banners: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banners & Promotions</h1>
          <p className="text-gray-600">Manage promotional banners and marketing campaigns</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <Eye className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Banner Management</h3>
        <p className="text-gray-600">Upload and manage promotional banners, set flash sales, and create coupon codes.</p>
      </div>
    </div>
  );
};

export default Banners;