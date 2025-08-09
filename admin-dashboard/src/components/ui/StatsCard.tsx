import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const colorClasses = {
  blue: 'bg-blue-500 text-blue-50',
  green: 'bg-green-500 text-green-50',
  yellow: 'bg-yellow-500 text-yellow-50',
  red: 'bg-red-500 text-red-50',
  purple: 'bg-purple-500 text-purple-50',
};

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'blue' 
}) => {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-2">
              {isPositive && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
              {isNegative && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;