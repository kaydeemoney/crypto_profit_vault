// Withdrawal Page
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { ArrowUpRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { transactionService, networkOptions } from '../services/transactionService';

const WithdrawalPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    network: '',
    walletAddress: '',
    pin: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState({ success: false, message: '' });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear any existing error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    
    // Reset result message when user changes input
    if (result.message) {
      setResult({ success: false, message: '' });
    }
  };
  
  const handleNetworkChange = (value: string) => {
    setFormData({
      ...formData,
      network: value
    });
    
    if (errors.network) {
      setErrors({
        ...errors,
        network: ''
      });
    }
    
    if (result.message) {
      setResult({ success: false, message: '' });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate amount
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = 'Please enter a valid amount';
      } else if (currentUser && amount > currentUser.balance) {
        newErrors.amount = 'Amount exceeds available balance';
      }
    }
    
    // Validate network
    if (!formData.network) {
      newErrors.network = 'Please select a network';
    }
    
    // Validate wallet address
    if (!formData.walletAddress) {
      newErrors.walletAddress = 'Wallet address is required';
    } else if (formData.walletAddress.length < 8) {
      newErrors.walletAddress = 'Please enter a valid wallet address';
    }

    // Validate PIN
    if (!formData.pin) {
      newErrors.pin = 'Transaction PIN is required';
    } else if (formData.pin !== '123456') { // Demo PIN validation
      newErrors.pin = 'Invalid transaction PIN';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await transactionService.createWithdrawal(
        parseFloat(formData.amount),
        formData.network,
        formData.walletAddress
      );
      
      setResult({
        success: true,
        message: 'Withdrawal request submitted successfully! It will be processed within 24 hours.'
      });
      
      // Reset form
      setFormData({
        amount: '',
        network: '',
        walletAddress: '',
        pin: ''
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Failed to process withdrawal. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Calculate fee based on selected network
  const calculateFee = () => {
    if (!formData.network || !formData.amount) {
      return 0;
    }
    
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      return 0;
    }
    
    const selectedNetwork = networkOptions.find(net => net.code === formData.network);
    if (!selectedNetwork) {
      return 0;
    }
    
    return (amount * selectedNetwork.fee) / 100;
  };
  
  const calculateFinalAmount = () => {
    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      return 0;
    }
    
    const fee = calculateFee();
    return Math.max(0, amount - fee);
  };
  
  // Convert network options to format needed by Select component
  const networkSelectOptions = networkOptions.map(net => ({
    value: net.code,
    label: `${net.name} (${net.code})`
  }));
  
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Withdraw Funds</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Available Balance</h2>
              <span className="text-2xl font-bold">${currentUser.balance.toFixed(2)}</span>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Withdrawal Form</h2>
          </CardHeader>
          <CardBody>
            {result.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {result.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <Input
                label="Enter Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter withdrawal amount"
                error={errors.amount}
                min="1"
                step="0.01"
              />
              
              <Select
                label="Select USDT Network"
                name="network"
                value={formData.network}
                onChange={handleNetworkChange}
                options={networkSelectOptions}
                error={errors.network}
              />
              
              {formData.network && (
                <div className="mb-4 p-4 bg-yellow-50 rounded-lg flex items-start">
                  <AlertCircle size={20} className="text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-800 font-medium mb-1">Important</p>
                    <p className="text-sm text-yellow-700">
                      A 10% withdrawal fee applies to all withdrawals. Make sure you're sending to a {formData.network} wallet address.
                    </p>
                  </div>
                </div>
              )}
              
              <Input
                label="Enter Wallet Address"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleInputChange}
                placeholder={`Enter your ${formData.network || 'USDT'} wallet address`}
                error={errors.walletAddress}
              />

              <Input
                label="Transaction PIN"
                name="pin"
                type="password"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="Enter your 6-digit transaction PIN"
                maxLength={6}
                error={errors.pin}
              />
              
              {formData.amount && !isNaN(parseFloat(formData.amount)) && formData.network && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-medium">${parseFloat(formData.amount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Fee (10%):</span>
                    <span className="font-medium text-red-600">-${calculateFee().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between">
                    <span className="text-gray-700 font-medium">You will receive:</span>
                    <span className="font-bold">${calculateFinalAmount().toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className="flex items-center justify-center"
              >
                Submit Withdrawal Request <ArrowUpRight size={16} className="ml-1" />
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default WithdrawalPage;