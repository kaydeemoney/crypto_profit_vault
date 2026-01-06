// Investment Service

import { Investment, InvestmentPlan } from '../types';
import { authService } from './authService';

// Mock investment plans
const investmentPlans: InvestmentPlan[] = [
  {
    id: "1",
    name: "Starter Plan",
    minInvestment: 50,
    maxInvestment: 99.99,
    period: 30,
    roiMonthly: 20,
    roiAnnual: 240,
    description: "Perfect for beginners looking to start their investment journey."
  },
  {
    id: "2",
    name: "Novie Plan",
    minInvestment: 100,
    maxInvestment: 499.99,
    period: 30,
    roiMonthly: 100,
    roiAnnual: 1200,
    description: "Ideal for those seeking higher returns with minimal investment."
  },
  {
    id: "3",
    name: "Pro Plan",
    minInvestment: 500,
    maxInvestment: 999.99,
    period: 30,
    roiMonthly: 110,
    roiAnnual: 1320,
    description: "For serious investors looking to maximize their profits."
  },
  {
    id: "4",
    name: "Master Plan",
    minInvestment: 1000,
    maxInvestment: 4999.99,
    period: 30,
    roiMonthly: 120,
    roiAnnual: 1440,
    description: "Superior returns for committed investors."
  },
  {
    id: "5",
    name: "Brooze Plan",
    minInvestment: 5000,
    maxInvestment: 9999.99,
    period: 30,
    roiMonthly: 130,
    roiAnnual: 1560,
    description: "Premium investment option with excellent returns."
  },
  {
    id: "6",
    name: "Silver Plan",
    minInvestment: 10000,
    maxInvestment: 49999.99,
    period: 30,
    roiMonthly: 140,
    roiAnnual: 1680,
    description: "Elite investment plan for serious wealth growth."
  },
  {
    id: "7",
    name: "Diamond Plan",
    minInvestment: 50000,
    maxInvestment: 99999.99,
    period: 30,
    roiMonthly: 150,
    roiAnnual: 1800,
    description: "Prestigious investment option with exceptional returns."
  },
  {
    id: "8",
    name: "Platinum Plan",
    minInvestment: 100000,
    maxInvestment: Infinity,
    period: 30,
    roiMonthly: 200,
    roiAnnual: 2400,
    description: "The ultimate investment plan for unlimited growth potential."
  }
];

// Mock investments
const mockInvestments: Investment[] = [
  {
    id: "1",
    userId: "1",
    planId: "2",
    planName: "Novie Plan",
    amount: 250,
    profit: 250,
    roi: 100,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active"
  },
  {
    id: "2",
    userId: "1",
    planId: "3",
    planName: "Pro Plan",
    amount: 750,
    profit: 825,
    roi: 110,
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active"
  },
  {
    id: "3",
    userId: "1",
    planId: "1",
    planName: "Starter Plan",
    amount: 75,
    profit: 15,
    roi: 20,
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: "closed"
  },
  {
    id: "4",
    userId: "1",
    planId: "2",
    planName: "Novie Plan",
    amount: 200,
    profit: 200,
    roi: 100,
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: "closed"
  }
];

const getInvestmentPlans = (): Promise<InvestmentPlan[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(investmentPlans);
    }, 500);
  });
};

const getInvestmentPlan = (planId: string): Promise<InvestmentPlan | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const plan = investmentPlans.find(p => p.id === planId) || null;
      resolve(plan);
    }, 300);
  });
};

const getUserInvestments = (
  status?: 'active' | 'closed'
): Promise<Investment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        resolve([]);
        return;
      }

      let userInvestments = mockInvestments.filter(
        inv => inv.userId === currentUser.id
      );

      if (status) {
        userInvestments = userInvestments.filter(inv => inv.status === status);
      }

      resolve(userInvestments);
    }, 500);
  });
};

const createInvestment = (
  planId: string,
  amount: number
): Promise<Investment> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        reject(new Error('User not authenticated'));
        return;
      }

      const plan = await getInvestmentPlan(planId);
      if (!plan) {
        reject(new Error('Investment plan not found'));
        return;
      }

      if (amount < plan.minInvestment || amount > plan.maxInvestment) {
        reject(new Error(`Investment amount must be between $${plan.minInvestment} and $${plan.maxInvestment}`));
        return;
      }

      const profit = (amount * plan.roiMonthly) / 100;
      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + plan.period * 24 * 60 * 60 * 1000).toISOString();

      const newInvestment: Investment = {
        id: Date.now().toString(),
        userId: currentUser.id,
        planId: plan.id,
        planName: plan.name,
        amount,
        profit,
        roi: plan.roiMonthly,
        startDate,
        endDate,
        status: 'active'
      };

      mockInvestments.push(newInvestment);
      resolve(newInvestment);
    }, 800);
  });
};

const getInvestmentDetails = (investmentId: string): Promise<Investment | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const investment = mockInvestments.find(inv => inv.id === investmentId) || null;
      resolve(investment);
    }, 300);
  });
};

export const investmentService = {
  getInvestmentPlans,
  getInvestmentPlan,
  getUserInvestments,
  createInvestment,
  getInvestmentDetails
};