// Transaction History Page
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import TransactionHistoryTable from '../components/transactions/TransactionHistoryTable';
import { Search, Download as FileDownload } from 'lucide-react';
import { Transaction } from '../types';
import { transactionService } from '../services/transactionService';

const TransactionHistoryPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    dateRange: '',
  });
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let startDate = '';
        let endDate = '';
        
        // Convert date range selection to actual dates
        if (filters.dateRange === 'last-7-days') {
          startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        } else if (filters.dateRange === 'last-30-days') {
          startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        } else if (filters.dateRange === 'last-90-days') {
          startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
        }
        
        // Get transaction type from filters
        const type = filters.type ? filters.type as 'deposit' | 'withdrawal' | 'investment' | 'referral' : undefined;
        
        const transactionData = await transactionService.getUserTransactions(type, startDate, endDate);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (name: string) => (value: string) => {
    setFilters({
      ...filters,
      [name]: value
    });
    setLoading(true);
  };

  const resetFilters = () => {
    setFilters({
      type: '',
      dateRange: '',
    });
    setLoading(true);
  };

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'deposit', label: 'Deposits' },
    { value: 'withdrawal', label: 'Withdrawals' },
    { value: 'investment', label: 'Investments' },
    { value: 'referral', label: 'Referral Earnings' },
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">Filters</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select
                label="Transaction Type"
                name="type"
                value={filters.type}
                onChange={handleFilterChange('type')}
                options={typeOptions}
              />
              
              <Select
                label="Date Range"
                name="dateRange"
                value={filters.dateRange}
                onChange={handleFilterChange('dateRange')}
                options={dateRangeOptions}
              />
              
              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="h-[42px]"
                >
                  Reset Filters
                </Button>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="secondary" 
                  className="h-[42px] flex items-center"
                >
                  <FileDownload size={16} className="mr-1" /> Export
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Transactions</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <TransactionHistoryTable 
              transactions={transactions} 
              loading={loading}
            />
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default TransactionHistoryPage;