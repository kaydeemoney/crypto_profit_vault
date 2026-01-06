// Investment Details Page
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { CreditCard, ArrowLeft, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { investmentService } from '../services/investmentService';
import { Investment } from '../types';

const InvestmentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchInvestmentDetails = async () => {
      if (!id) return;
      
      try {
        const data = await investmentService.getInvestmentDetails(id);
        setInvestment(data);
      } catch (error) {
        setError('Failed to load investment details');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchInvestmentDetails();
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error || !investment) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 p-4 rounded-lg text-red-700">
            {error || 'Investment not found'}
          </div>
          <div className="mt-4">
            <Link to="/dashboard">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

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
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/dashboard">
              <Button variant="outline" size="sm" className="mr-3">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Investment Details</h1>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {isActive ? (isMature ? 'Matured' : 'Active') : 'Closed'}
          </span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-blue-200">Investment Plan</p>
              <h2 className="text-2xl font-bold">{investment.planName}</h2>
            </div>
            
            <div className="text-right">
              <p className="text-blue-200">Invested Amount</p>
              <h3 className="text-2xl font-bold">${investment.amount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold">
                <Calendar size={20} className="mr-2 text-blue-700" /> Duration
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">{endDate.toLocaleDateString()}</p>
                </div>
              </div>
              
              {isActive && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {isMature 
                      ? 'Investment has matured' 
                      : `${Math.max(0, Math.ceil(totalDays - daysElapsed))} days remaining`}
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="flex items-center text-lg font-semibold">
                <DollarSign size={20} className="mr-2 text-green-600" /> Returns
              </h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ROI</p>
                  <p className="font-medium">{investment.roi}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Profit</p>
                  <p className="font-medium text-green-600">${investment.profit.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">Total Return</p>
                <p className="text-xl font-bold">${(investment.amount + investment.profit).toFixed(2)}</p>
              </div>
            </CardBody>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <h2 className="flex items-center text-lg font-semibold">
              <TrendingUp size={20} className="mr-2 text-blue-700" /> Investment Summary
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{investment.planName}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Investment ID</span>
                <span className="font-medium">{investment.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Principal Amount</span>
                <span className="font-medium">${investment.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">ROI</span>
                <span className="font-medium">{investment.roi}%</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Expected Profit</span>
                <span className="font-medium text-green-600">${investment.profit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Total Return</span>
                <span className="font-bold">${(investment.amount + investment.profit).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">{startDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">End Date</span>
                <span className="font-medium">{endDate.toLocaleDateString()}</span>
              </div>
            </div>
          </CardBody>
        </Card>
        
        {isMature && (
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <div className="flex items-start">
              <div className="p-2 bg-green-100 rounded-lg text-green-700 mr-4">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-green-800 mb-2">
                  Your investment has matured!
                </h3>
                <p className="text-green-700 mb-4">
                  You can now withdraw your principal amount plus profit to your wallet.
                </p>
                <Link to="/withdraw">
                  <Button variant="success">Withdraw Funds</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default InvestmentDetailsPage;