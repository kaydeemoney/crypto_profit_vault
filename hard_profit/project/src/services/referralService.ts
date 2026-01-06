// Referral Service

import { Referral } from '../types';
import { authService } from './authService';

// Mock referrals
const mockReferrals: Referral[] = [
  {
    id: "1",
    referrerId: "1",
    referredId: "2",
    referredName: "Jane Smith",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    earnings: 50
  },
  {
    id: "2",
    referrerId: "1",
    referredId: "3",
    referredName: "Mike Johnson",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    earnings: 30
  }
];

const getUserReferrals = (): Promise<Referral[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        resolve([]);
        return;
      }

      const userReferrals = mockReferrals.filter(
        ref => ref.referrerId === currentUser.id
      );

      resolve(userReferrals);
    }, 500);
  });
};

const getTotalReferralEarnings = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        resolve(0);
        return;
      }

      const userReferrals = mockReferrals.filter(
        ref => ref.referrerId === currentUser.id
      );

      const totalEarnings = userReferrals.reduce(
        (sum, referral) => sum + referral.earnings, 
        0
      );

      resolve(totalEarnings);
    }, 300);
  });
};

const getReferralCount = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        resolve(0);
        return;
      }

      const userReferrals = mockReferrals.filter(
        ref => ref.referrerId === currentUser.id
      );

      resolve(userReferrals.length);
    }, 300);
  });
};

export const referralService = {
  getUserReferrals,
  getTotalReferralEarnings,
  getReferralCount
};