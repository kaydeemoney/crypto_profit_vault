// Investment Card Component
import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { CreditCard } from 'lucide-react';
import { Investment } from '../../types';

interface InvestmentCardProps {
  investment: Investment;
  className?: string;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  className = '',
}) => {
  const startDate = new Date(investment.startDate);
  const endDate = new Date(investment.endDate);
  const today = new Date();
  
  // Calculate progress percentage
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysElapsed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  const progress = Math.min(Math.max(Math.round((daysElapsed / totalDays) * 100), 0), 100);
  
  const isActive = investment.status === 'active';
  const isMature = isActive && today >= endDate;
  
  return (
    <Card className={`${className}`}>
      <CardBody>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-900">
              <CreditCard size={20} />
            </div>
            <h3 className="ml-2 font-semibold text-lg">{investment.planName}</h3>
          </div>
          <span className={`px-2 py-1 text-xs rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? (isMature ? 'Matured' : 'Active') : 'Closed'}
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">Invested Amount</p>
              <p className="font-semibold">${investment.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expected Profit</p>
              <p className="font-semibold text-green-600">${investment.profit.toFixed(2)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm text-gray-500">ROI</p>
              <p className="font-semibold">{investment.roi}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-semibold">{endDate.toLocaleDateString()}</p>
            </div>
          </div>
          
          {isActive && (
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
      
      <CardFooter className="flex justify-end bg-white">
        <Link to={`/investments/${investment.id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InvestmentCard;