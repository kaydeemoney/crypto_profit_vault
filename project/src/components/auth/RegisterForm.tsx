// Register Form Component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    gender: '',
    country: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
    transactionPin: '',
    verificationCode: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (registrationError) {
      setRegistrationError('');
    }
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.mobileNumber) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.transactionPin) {
      newErrors.transactionPin = 'Transaction PIN is required';
    } else if (formData.transactionPin.length !== 4 || !/^\d+$/.test(formData.transactionPin)) {
      newErrors.transactionPin = 'Transaction PIN must be 4 digits';
    }
    
    if (!formData.verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsLoading(true);
    setRegistrationError('');
    
    try {
      // For demo: verification code is always "123456"
      if (formData.verificationCode !== '123456') {
        throw new Error('Invalid verification code');
      }
      
      // Exclude confirmPassword and acceptTerms from registration data
      const { confirmPassword, acceptTerms, ...registrationData } = formData;
      
      await register(registrationData);
      navigate('/dashboard');
    } catch (error: any) {
      setRegistrationError(error.message || 'Failed to register');
    } finally {
      setIsLoading(false);
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {registrationError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {registrationError}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          error={errors.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          error={errors.lastName}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Mobile Number"
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Enter your mobile number"
          error={errors.mobileNumber}
          required
        />
        
        <Select
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleSelectChange('gender')}
          options={genderOptions}
          error={errors.gender}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleSelectChange('country')}
          options={countryOptions}
          error={errors.country}
          required
        />
        
        <Select
          label="State"
          name="state"
          value={formData.state}
          onChange={handleSelectChange('state')}
          options={stateOptions}
          error={errors.state}
          required
        />
      </div>
      
      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        error={errors.email}
        required
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          required
        />
        
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Transaction PIN (4 digits)"
          type="password"
          name="transactionPin"
          value={formData.transactionPin}
          onChange={handleChange}
          placeholder="Create a 4-digit PIN"
          maxLength={4}
          error={errors.transactionPin}
          required
        />
        
        <Input
          label="Verification Code"
          type="text"
          name="verificationCode"
          value={formData.verificationCode}
          onChange={handleChange}
          placeholder="Enter verification code"
          error={errors.verificationCode}
          required
        />
      </div>
      
      <div className="flex items-center">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900">
          I accept the <a href="#" className="text-blue-700 hover:text-blue-500">Terms and Conditions</a>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="mt-1 text-sm text-red-600">{errors.acceptTerms}</p>
      )}
      
      <div>
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Create Account
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;