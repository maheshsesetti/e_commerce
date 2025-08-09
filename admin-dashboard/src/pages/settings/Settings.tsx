import React from 'react';
import { Settings as SettingsIcon, User, Lock, Globe } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your admin profile and application settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-primary-600 mb-4">
            <User className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Profile Settings</h3>
          <p className="text-gray-600">Update your personal information and profile details.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-primary-600 mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Security</h3>
          <p className="text-gray-600">Change your password and manage security settings.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-primary-600 mb-4">
            <Globe className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Site Configuration</h3>
          <p className="text-gray-600">Configure currency, tax rates, and other site settings.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;