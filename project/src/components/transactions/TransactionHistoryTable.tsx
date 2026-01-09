// Transaction History Table Component
import React from 'react';
import { Transaction } from '../../types';
import { formatDate } from '../../utils/formatters';
import { ArrowDownCircle, ArrowUpCircle, TrendingUp, Users } from 'lucide-react';

interface TransactionHistoryTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

const TransactionHistoryTable: React.FC<TransactionHistoryTableProps> = ({
  transactions,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownCircle size={20} className="text-green-500" />;
      case 'withdrawal':
        return <ArrowUpCircle size={20} className="text-red-500" />;
      case 'investment':
        return <TrendingUp size={20} className="text-blue-600" />;
      case 'referral':
        return <Users size={20} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    let colorClass = '';
    switch (status) {
      case 'pending':
        colorClass = 'bg-yellow-100 text-yellow-800';
        break;
      case 'completed':
        colorClass = 'bg-green-100 text-green-800';
        break;
      case 'failed':
        colorClass = 'bg-red-100 text-red-800';
        break;
      default:
        colorClass = 'bg-gray-100 text-gray-800';
    }

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getTransactionIcon(transaction.type)}
                  <span className="ml-2 text-sm font-medium text-gray-900 capitalize">
                    {transaction.type}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`text-sm font-medium ${
                  transaction.type === 'deposit' || transaction.type === 'referral'
                    ? 'text-green-600'
                    : transaction.type === 'withdrawal'
                    ? 'text-red-600'
                    : 'text-gray-900'
                }`}>
                  {transaction.type === 'deposit' || transaction.type === 'referral'
                    ? '+'
                    : transaction.type === 'withdrawal'
                    ? '-'
                    : ''}
                  ${transaction.amount.toFixed(2)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(transaction.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.description || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistoryTable;