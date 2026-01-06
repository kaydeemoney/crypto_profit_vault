// Investment Plan Card Component
import React from 'react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { TrendingUp } from 'lucide-react';
import { InvestmentPlan } from '../../types';

interface InvestmentPlanCardProps {
  plan: InvestmentPlan;
  onInvest: (plan: InvestmentPlan) => void;
  className?: string;
}

const InvestmentPlanCard: React.FC<InvestmentPlanCardProps> = ({
  plan,
  onInvest,
  className = '',
}) => {
  const handleInvestClick = () => {
    onInvest(plan);
  };

  return (
    <Card className={`h-full ${className}`} hoverable>
      <CardBody>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-bold">{plan.name}</h3>
          <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
            <TrendingUp size={20} />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-500">Monthly ROI</p>
              <p className="text-3xl font-bold text-blue-900">{plan.roiMonthly}%</p>
            </div>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <p className="text-xs text-gray-500">Annual ROI</p>
                <p className="font-semibold text-blue-700">{plan.roiAnnual}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Period</p>
                <p className="font-semibold">{plan.period} days</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Minimum Investment</p>
              <p className="font-medium">${plan.minInvestment.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-gray-600">Maximum Investment</p>
              <p className="font-medium">
                {plan.maxInvestment === Infinity 
                  ? 'Unlimited' 
                  : `$${plan.maxInvestment.toFixed(2)}`}
              </p>
            </div>
          </div>
          
          {plan.description && (
            <p className="text-sm text-gray-500">{plan.description}</p>
          )}
        </div>
      </CardBody>
      
      <CardFooter className="bg-white">
        <Button 
          variant="primary" 
          fullWidth 
          onClick={handleInvestClick}
        >
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InvestmentPlanCard;