// Stat Card Component
import React from 'react';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="p-2 bg-blue-100 rounded-lg text-blue-900">
            {icon}
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1">
              <span
                className={`text-sm ${
                  trend.isPositive ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;