// Investment Plans Page
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import InvestmentPlanCard from '../components/investments/InvestmentPlanCard';
import InvestmentModal from '../components/investments/InvestmentModal';
import Spinner from '../components/ui/Spinner';
import { investmentService } from '../services/investmentService';
import { InvestmentPlan } from '../types';

const InvestmentPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<InvestmentPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await investmentService.getInvestmentPlans();
        setPlans(plans);
      } catch (error) {
        setError('Failed to load investment plans');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, []);

  const handleInvestClick = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  const handleInvestmentSubmit = async (planId: string, amount: number) => {
    try {
      await investmentService.createInvestment(planId, amount);
      // Here you might want to update the user's balance or show a success notification
    } catch (error) {
      throw error;
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="bg-red-100 p-4 rounded-lg text-red-700">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Investment Plans</h1>
          <p className="text-gray-600">
            Choose from our range of investment plans designed to maximize your returns.
            Our plans offer competitive ROI rates and flexible investment periods.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <InvestmentPlanCard
            key={plan.id}
            plan={plan}
            onInvest={handleInvestClick}
          />
        ))}
      </div>
      
      <InvestmentModal
        plan={selectedPlan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleInvestmentSubmit}
      />
    </MainLayout>
  );
};

export default InvestmentPlansPage;