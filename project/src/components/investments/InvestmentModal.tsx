// Investment Modal Component
import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { InvestmentPlan } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface InvestmentModalProps {
  plan: InvestmentPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (planId: string, amount: number) => Promise<void>;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  plan,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { currentUser } = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  if (!isOpen || !plan) return null;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const investmentAmount = parseFloat(amount);
    
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (investmentAmount < plan.minInvestment) {
      setError(`Minimum investment amount is $${plan.minInvestment}`);
      return;
    }
    
    if (plan.maxInvestment !== Infinity && investmentAmount > plan.maxInvestment) {
      setError(`Maximum investment amount is $${plan.maxInvestment}`);
      return;
    }
    
    if (!currentUser || currentUser.balance < investmentAmount) {
      setError('Insufficient balance. Please deposit funds first.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSubmit(plan.id, investmentAmount);
      setAmount('');
      onClose();
    } catch (error: any) {
      setError(error.message || 'Failed to create investment');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProfit = () => {
    const investmentAmount = parseFloat(amount);
    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      return 0;
    }
    return (investmentAmount * plan.roiMonthly) / 100;
  };

  // Calculate available balance if user exists
  const availableBalance = currentUser ? currentUser.balance : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="absolute top-3 right-3">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Invest in {plan.name}
          </h3>
          
          <div className="mb-4 bg-blue-50 p-3 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Monthly ROI:</span>
              <span className="font-medium">{plan.roiMonthly}%</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Duration:</span>
              <span className="font-medium">{plan.period} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Investment Range:</span>
              <span className="font-medium">
                ${plan.minInvestment} - {plan.maxInvestment === Infinity ? 'Unlimited' : `$${plan.maxInvestment}`}
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">
                Available Balance: <span className="font-medium">${availableBalance.toFixed(2)}</span>
              </p>
              <Input
                label="Investment Amount ($)"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount to invest"
                min={plan.minInvestment}
                max={plan.maxInvestment !== Infinity ? plan.maxInvestment : undefined}
                step="0.01"
                required
              />
            </div>
            
            {amount && !isNaN(parseFloat(amount)) && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  Expected Profit: <span className="font-medium text-green-600">${calculateProfit().toFixed(2)}</span>
                </p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                disabled={isLoading}
                fullWidth
              >
                Confirm Investment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvestmentModal;