// User Profile Page
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { User, PencilLine, Key, Shield, Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    mobileNumber: currentUser?.mobileNumber || '',
    gender: currentUser?.gender || '',
    country: currentUser?.country || '',
    state: currentUser?.state || '',
    email: currentUser?.email || '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: '', text: '' });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleSelectChange = (name: string) => (value: string) => {
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setUpdateMessage({ type: '', text: '' });
  };
  
  const handleCancel = () => {
    // Reset form to original user data
    if (currentUser) {
      setProfileData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        mobileNumber: currentUser.mobileNumber,
        gender: currentUser.gender,
        country: currentUser.country,
        state: currentUser.state,
        email: currentUser.email,
      });
    }
    setIsEditing(false);
    setUpdateMessage({ type: '', text: '' });
  };
  
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, you'd validate and send this data to your backend
      if (currentUser) {
        await updateUserProfile(profileData);
        setUpdateMessage({ 
          type: 'success', 
          text: 'Profile updated successfully!' 
        });
        setIsEditing(false);
      }
    } catch (error) {
      setUpdateMessage({ 
        type: 'error', 
        text: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Options for select inputs
  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];
  
  const countryOptions = [
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'australia', label: 'Australia' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'other', label: 'Other' },
  ];
  
  const stateOptions = [
    { value: 'ny', label: 'New York' },
    { value: 'ca', label: 'California' },
    { value: 'tx', label: 'Texas' },
    { value: 'fl', label: 'Florida' },
    { value: 'il', label: 'Illinois' },
    { value: 'other', label: 'Other' },
  ];
  
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
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                {!isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleEdit}
                    className="flex items-center"
                  >
                    <PencilLine size={16} className="mr-1" /> Edit
                  </Button>
                )}
              </CardHeader>
              <CardBody>
                {updateMessage.text && (
                  <div className={`mb-4 p-3 rounded-lg text-sm ${
                    updateMessage.type === 'success' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {updateMessage.text}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Mobile Number"
                    name="mobileNumber"
                    value={profileData.mobileNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                  
                  <Select
                    label="Gender"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleSelectChange('gender')}
                    options={genderOptions}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Select
                    label="Country"
                    name="country"
                    value={profileData.country}
                    onChange={handleSelectChange('country')}
                    options={countryOptions}
                    disabled={!isEditing}
                  />
                  
                  <Select
                    label="State"
                    name="state"
                    value={profileData.state}
                    onChange={handleSelectChange('state')}
                    options={stateOptions}
                    disabled={!isEditing}
                  />
                </div>
                
                <Input
                  label="Email Address"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={true} // Email should typically not be editable
                  className="mt-4"
                />
                
                {isEditing && (
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={handleSave}
                      isLoading={isSaving}
                      disabled={isSaving}
                    >
                      Save Changes
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
          
          {/* Sidebar with Profile Picture and Account Options */}
          <div>
            <Card className="mb-6">
              <CardBody>
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-blue-900 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {currentUser.profileImage ? (
                      <img
                        src={currentUser.profileImage}
                        alt="Profile"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : (
                      <span>{currentUser.firstName[0]}{currentUser.lastName[0]}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-1">
                    {currentUser.firstName} {currentUser.lastName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{currentUser.email}</p>
                  
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="flex items-center justify-center"
                  >
                    <Upload size={16} className="mr-2" /> Upload Photo
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Account Security</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="flex items-center justify-center"
                  >
                    <Key size={16} className="mr-2" /> Change Password
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    fullWidth 
                    className="flex items-center justify-center"
                  >
                    <Shield size={16} className="mr-2" /> Change Transaction PIN
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UserProfilePage;