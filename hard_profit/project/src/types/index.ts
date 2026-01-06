// Common Types

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  state: string;
  profileImage?: string;
  balance: number;
  totalEarnings: number;
  totalInvested: number;
  referralCode: string;
};

export type InvestmentPlan = {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  period: number;
  roiMonthly: number;
  roiAnnual: number;
  description?: string;
};

export type Investment = {
  id: string;
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  profit: number;
  roi: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'closed';
};

export type Transaction = {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'investment' | 'referral';
  amount: number;
  network?: string;
  walletAddress?: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description?: string;
};

export type Referral = {
  id: string;
  referrerId: string;
  referredId: string;
  referredName: string;
  date: string;
  earnings: number;
};

export type NetworkOption = {
  id: string;
  name: string;
  code: string;
  fee: number;
};