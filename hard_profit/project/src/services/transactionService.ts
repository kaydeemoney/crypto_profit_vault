// Transaction Service

import { Transaction, NetworkOption } from '../types';
import { authService } from './authService';

// Available networks for crypto transactions
export const networkOptions: NetworkOption[] = [
  { id: "1", name: "Ethereum", code: "ERC20", fee: 10 },
  { id: "2", name: "TRON", code: "TRC20", fee: 10 },
  { id: "3", name: "Solana", code: "SOL", fee: 10 },
  { id: "4", name: "BNB Smart Chain", code: "BEP20", fee: 10 },
  { id: "5", name: "Polygon", code: "Polygon POS", fee: 10 },
  { id: "6", name: "TON", code: "TON", fee: 10 },
  { id: "7", name: "Arbitrum", code: "Arbitrum One", fee: 10 },
];

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: "1",
    userId: "1",
    type: "deposit",
    amount: 1000,
    network: "TRC20",
    walletAddress: "TG7arf5HPu8R4YVWnUWxsVsa9EFwCRe7s5",
    status: "completed",
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Initial deposit"
  },
  {
    id: "2",
    userId: "1",
    type: "investment",
    amount: 750,
    status: "completed",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Pro Plan investment"
  },
  {
    id: "3",
    userId: "1",
    type: "withdrawal",
    amount: 150,
    network: "BEP20",
    walletAddress: "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",
    status: "completed",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Withdrawal to external wallet"
  },
  {
    id: "4",
    userId: "1",
    type: "referral",
    amount: 50,
    status: "completed",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Referral bonus from Jane Smith"
  }
];

const getUserTransactions = (
  type?: 'deposit' | 'withdrawal' | 'investment' | 'referral',
  startDate?: string,
  endDate?: string
): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        resolve([]);
        return;
      }

      let userTransactions = mockTransactions.filter(
        trx => trx.userId === currentUser.id
      );

      if (type) {
        userTransactions = userTransactions.filter(trx => trx.type === type);
      }

      if (startDate) {
        userTransactions = userTransactions.filter(
          trx => new Date(trx.date) >= new Date(startDate)
        );
      }

      if (endDate) {
        userTransactions = userTransactions.filter(
          trx => new Date(trx.date) <= new Date(endDate)
        );
      }

      userTransactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      resolve(userTransactions);
    }, 500);
  });
};

const createDeposit = (
  amount: number,
  network: string,
  walletAddress: string
): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: currentUser.id,
        type: 'deposit',
        amount,
        network,
        walletAddress,
        status: 'pending', // Deposits start as pending
        date: new Date().toISOString(),
        description: `Deposit via ${network}`
      };

      mockTransactions.push(newTransaction);
      resolve(newTransaction);
    }, 800);
  });
};

const createWithdrawal = (
  amount: number,
  network: string,
  walletAddress: string
): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        reject(new Error('User not authenticated'));
        return;
      }

      if (currentUser.balance < amount) {
        reject(new Error('Insufficient balance'));
        return;
      }

      const selectedNetwork = networkOptions.find(n => n.code === network);
      if (!selectedNetwork) {
        reject(new Error('Invalid network selected'));
        return;
      }

      const fee = (amount * selectedNetwork.fee) / 100;
      const finalAmount = amount - fee;

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        userId: currentUser.id,
        type: 'withdrawal',
        amount: finalAmount,
        network,
        walletAddress,
        status: 'pending', // Withdrawals start as pending
        date: new Date().toISOString(),
        description: `Withdrawal via ${network} (Fee: $${fee})`
      };

      mockTransactions.push(newTransaction);
      resolve(newTransaction);
    }, 800);
  });
};

export const transactionService = {
  getUserTransactions,
  createDeposit,
  createWithdrawal,
  networkOptions
};