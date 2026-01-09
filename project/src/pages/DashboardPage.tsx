// Dashboard Page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  CreditCard
} from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import StatCard from '../components/dashboard/StatCard';
import InvestmentCard from '../components/dashboard/InvestmentCard';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { investmentService } from '../services/investmentService';
import { Investment } from '../types';
import Spinner from '../components/ui/Spinner';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [activeInvestments, setActiveInvestments] = useState<Investment[]>([]);
  const [closedInvestments, setClosedInvestments] = useState<Investment[]>([]);
  const [loadingInvestments, setLoadingInvestments] = useState(true);
  
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const active = await investmentService.getUserInvestments('active');
        const closed = await investmentService.getUserInvestments('closed');
        
        setActiveInvestments(active);
        setClosedInvestments(closed);
      } catch (error) {
        console.error('Failed to fetch investments:', error);
      } finally {
        setLoadingInvestments(false);
      }
    };
    
    fetchInvestments();
  }, []);

  if (!currentUser) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <p>Loading user data...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* User Card */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="h-16 w-16 rounded-full bg-white text-blue-900 flex items-center justify-center text-xl font-bold">
              {currentUser.profileImage ? (
                <img
                  src={currentUser.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span>{currentUser.firstName[0]}{currentUser.lastName[0]}</span>
              )}
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">
                {currentUser.firstName} {currentUser.lastName}
              </h2>
              <p className="text-blue-200">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end">
            <p className="text-blue-200 mb-1">Available Balance</p>
            <h3 className="text-2xl font-bold mb-2">${currentUser.balance.toFixed(2)}</h3>
            <div className="flex space-x-2">
              <Link to="/deposit">
                <Button variant="primary" size="sm" className="bg-green-600 hover:bg-green-700">
                  Deposit
                </Button>
              </Link>
              <Link to="/withdraw">
                <Button variant="primary" size="sm" className="bg-amber-500 hover:bg-amber-600">
                  Withdraw
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total Balance"
          value={`$${currentUser.balance.toFixed(2)}`}
          icon={<Wallet size={20} />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatCard
          title="Total Earnings"
          value={`$${currentUser.totalEarnings.toFixed(2)}`}
          icon={<DollarSign size={20} />}
          trend={{ value: 8, isPositive: true }}
        />
        
        <StatCard
          title="Total Invested"
          value={`$${currentUser.totalInvested.toFixed(2)}`}
          icon={<TrendingUp size={20} />}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      {/* Active Investments */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Active Investments</h2>
          <Link to="/investment-plans">
            <Button variant="outline" size="sm" className="flex items-center">
              Invest More <ArrowUpRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        
        {loadingInvestments ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : activeInvestments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeInvestments.slice(0, 2).map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-dashed border-gray-300">
            <CreditCard size={40} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Investments</h3>
            <p className="text-gray-500 mb-4">Start growing your wealth by investing in one of our plans.</p>
            <Link to="/investment-plans">
              <Button variant="primary">View Investment Plans</Button>
            </Link>
          </div>
        )}
        
        {activeInvestments.length > 2 && (
          <div className="text-center mt-4">
            <Link to="/investments">
              <Button variant="outline" size="sm">
                View All Active Investments
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {/* Closed Investments */}
      {closedInvestments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Completed Investments</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {closedInvestments.slice(0, 2).map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
          
          {closedInvestments.length > 2 && (
            <div className="text-center mt-4">
              <Link to="/investments?status=closed">
                <Button variant="outline" size="sm">
                  View All Completed Investments
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </MainLayout>
  );
};

export default DashboardPage;