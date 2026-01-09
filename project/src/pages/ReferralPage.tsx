// Referral Page
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Users, Copy, CheckCheck, Share2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { referralService } from '../services/referralService';
import { Referral } from '../types';
import Spinner from '../components/ui/Spinner';

const ReferralPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  const referralLink = currentUser 
    ? `https://profitvault.com/register?ref=${currentUser.referralCode}` 
    : '';
  
  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const [referralsList, earnings, count] = await Promise.all([
          referralService.getUserReferrals(),
          referralService.getTotalReferralEarnings(),
          referralService.getReferralCount()
        ]);
        
        setReferrals(referralsList);
        setTotalEarnings(earnings);
        setReferralCount(count);
      } catch (error) {
        console.error('Failed to fetch referral data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReferralData();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Profit Vault',
          text: 'Join Profit Vault investment platform and start earning today!',
          url: referralLink
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink();
    }
  };

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Partnership Program</h1>
        
        {/* Referral Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-blue-900 text-white">
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Total People Invited</h3>
                <Users size={24} className="text-blue-200" />
              </div>
              {isLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner color="white" size="sm" />
                </div>
              ) : (
                <p className="text-3xl font-bold">{referralCount}</p>
              )}
            </CardBody>
          </Card>
          
          <Card className="md:col-span-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
            <CardBody>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Total Earnings</h3>
                <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                  <Share2 size={20} />
                </div>
              </div>
              {isLoading ? (
                <div className="flex justify-center py-2">
                  <Spinner color="white" size="sm" />
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold mb-1">${totalEarnings.toFixed(2)}</p>
                  <p className="text-sm text-amber-100">
                    Earn 5% of referrals' withdrawal amounts
                  </p>
                </>
              )}
            </CardBody>
          </Card>
        </div>
        
        {/* Referral Info */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">Invite Friends & Earn</h2>
          </CardHeader>
          <CardBody>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <p className="text-gray-800">
                Earn by inviting your friends to invest and receive 5% of their withdrawal amount as a reward. 
                Grow your earnings effortlessly through our partnership program!
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Referral Link
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                />
                <button 
                  onClick={handleCopyLink}
                  className={`px-4 py-2 flex items-center justify-center rounded-r-lg transition-colors ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-blue-900 text-white hover:bg-blue-800'
                  }`}
                >
                  {copied ? <CheckCheck size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                variant="primary"
                onClick={handleShare}
                className="flex items-center justify-center mx-auto"
              >
                <Share2 size={18} className="mr-2" /> Share Your Link
              </Button>
            </div>
          </CardBody>
        </Card>
        
        {/* Referral History */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Referral History</h2>
          </CardHeader>
          <CardBody>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner size="lg" />
              </div>
            ) : referrals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Earnings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {referrals.map((referral) => (
                      <tr key={referral.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                              <Users size={16} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {referral.referredName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(referral.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          ${referral.earnings.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users size={40} className="mx-auto text-gray-300 mb-2" />
                <p>You haven't referred anyone yet. Share your link to start earning!</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ReferralPage;