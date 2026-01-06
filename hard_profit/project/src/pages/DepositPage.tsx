// Deposit Page
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { DollarSign, QrCode, Copy, CheckCheck, Headphones } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { transactionService, networkOptions } from '../services/transactionService';

const DepositPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: '',
    network: '',
  });
  
  const [paymentData, setPaymentData] = useState({
    senderAddress: '',
    transactionHash: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState({ success: false, message: '' });
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Mock wallet address for demo purposes
  const walletAddress = "TG7arf5HPu8R4YVWnUWxsVsa9EFwCRe7s5";
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'senderAddress' || name === 'transactionHash') {
      setPaymentData({
        ...paymentData,
        [name]: value
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
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
      }
    }
    
    // Validate network
    if (!formData.network) {
      newErrors.network = 'Please select a network';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePaymentDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentData.senderAddress) {
      newErrors.senderAddress = 'Sender address is required';
    }
    
    if (!paymentData.transactionHash) {
      newErrors.transactionHash = 'Transaction hash is required';
    } else if (paymentData.transactionHash.length < 64) {
      newErrors.transactionHash = 'Please enter a valid transaction hash';
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
      // For demo purposes, we'll just show the wallet information
      setShowWalletInfo(true);
      
      setResult({
        success: true,
        message: 'Please send the exact amount to the wallet address below.'
      });
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Failed to process deposit request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePaymentDetails()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await transactionService.createDeposit(
        parseFloat(formData.amount),
        formData.network,
        paymentData.senderAddress
      );
      
      setResult({
        success: true,
        message: 'Payment details submitted successfully! Your deposit will be processed shortly.'
      });
      
      // Reset forms
      setFormData({ amount: '', network: '' });
      setPaymentData({ senderAddress: '', transactionHash: '' });
      setShowWalletInfo(false);
      setShowPaymentConfirmation(false);
    } catch (error: any) {
      setResult({
        success: false,
        message: error.message || 'Failed to submit payment details. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleProceedToConfirmation = () => {
    setShowPaymentConfirmation(true);
  };
  
  // Convert network options to format needed by Select component
  const networkSelectOptions = networkOptions.map(net => ({
    value: net.code,
    label: `${net.name} (${net.code})`
  }));
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">USDT Deposit</h2>
          </CardHeader>
          <CardBody>
            {result.message && (
              <div className={`mb-6 p-4 rounded-lg ${
                result.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {result.message}
              </div>
            )}
            
            {!showWalletInfo ? (
              <form onSubmit={handleSubmit}>
                <Input
                  label="Enter Amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter deposit amount"
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
                
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  className="flex items-center justify-center mt-4"
                >
                  <DollarSign size={16} className="mr-1" /> Generate Deposit Address
                </Button>
              </form>
            ) : !showPaymentConfirmation ? (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <QrCode size={100} className="text-blue-900 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Send exactly <span className="font-bold">${formData.amount} USDT</span></h3>
                      <p className="text-sm text-gray-600 mb-2">Network: {formData.network}</p>
                      <div className="flex items-center bg-white p-2 rounded border">
                        <input
                          type="text"
                          value={walletAddress}
                          readOnly
                          className="flex-grow bg-transparent border-none focus:outline-none"
                        />
                        <button 
                          onClick={handleCopyAddress}
                          className={`px-2 py-1 rounded-md ml-2 ${
                            copied 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">Important Instructions:</h3>
                  <ul className="list-disc list-inside text-sm space-y-1 text-yellow-700">
                    <li>Send only USDT to this address</li>
                    <li>Ensure you are using the {formData.network} network</li>
                    <li>Send exactly ${formData.amount} to avoid processing issues</li>
                    <li>Your deposit will be credited after network confirmation (typically 10-30 minutes)</li>
                    <li>After sending the payment, click the button below to submit your transaction details</li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setShowWalletInfo(false)}
                  >
                    Back
                  </Button>
                  
                  <div className="flex space-x-3">
                    <Button
                      variant="secondary"
                      className="flex items-center"
                    >
                      <Headphones size={16} className="mr-1" /> Contact Admin
                    </Button>
                    
                    <Button
                      variant="primary"
                      onClick={handleProceedToConfirmation}
                    >
                      Submit Payment Details
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-blue-900 mb-2">Payment Confirmation</h3>
                  <p className="text-sm text-blue-700">
                    Please provide your transaction details for verification
                  </p>
                </div>
                
                <Input
                  label="Your Wallet Address"
                  name="senderAddress"
                  value={paymentData.senderAddress}
                  onChange={handleInputChange}
                  placeholder={`Enter your ${formData.network} wallet address`}
                  error={errors.senderAddress}
                />
                
                <Input
                  label="Transaction Hash"
                  name="transactionHash"
                  value={paymentData.transactionHash}
                  onChange={handleInputChange}
                  placeholder="Enter the transaction hash"
                  error={errors.transactionHash}
                />
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setShowPaymentConfirmation(false)}
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Confirm Payment
                  </Button>
                </div>
              </form>
            )}
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DepositPage;