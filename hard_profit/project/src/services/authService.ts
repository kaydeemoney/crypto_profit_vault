// Authentication Service

import { User } from '../types';

// Mock user data for simulation
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    mobileNumber: "+1234567890",
    gender: "male",
    country: "United States",
    state: "New York",
    profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    balance: 5000,
    totalEarnings: 1200,
    totalInvested: 2500,
    referralCode: "JOHN123"
  },
];

// Check if user exists in localStorage
const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  return userJson ? JSON.parse(userJson) : null;
};

const setCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') { // Simple password check for demo
        setCurrentUser(user);
        resolve(user);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 1000);
  });
};

const register = (userData: Omit<User, 'id' | 'balance' | 'totalEarnings' | 'totalInvested' | 'referralCode'>): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === userData.email);
      
      if (existingUser) {
        reject(new Error('User with this email already exists'));
      } else {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          balance: 0,
          totalEarnings: 0,
          totalInvested: 0,
          referralCode: `${userData.firstName.toUpperCase()}${Math.floor(Math.random() * 1000)}`
        };
        
        mockUsers.push(newUser);
        setCurrentUser(newUser);
        resolve(newUser);
      }
    }, 1000);
  });
};

const logout = (): void => {
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
};

export const authService = {
  getCurrentUser,
  login,
  register,
  logout
};