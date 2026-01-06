import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ErrorPage from './pages/ErrorPage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import InvestmentPlansPage from './pages/InvestmentPlansPage';
import UserProfilePage from './pages/UserProfilePage';
import ReferralPage from './pages/ReferralPage';
import WithdrawalPage from './pages/WithdrawalPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import DepositPage from './pages/DepositPage';
import InvestmentDetailsPage from './pages/InvestmentDetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/investment-plans" element={<InvestmentPlansPage />} />
            <Route path="/investments/:id" element={<InvestmentDetailsPage />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/withdraw" element={<WithdrawalPage />} />
            <Route path="/transactions" element={<TransactionHistoryPage />} />
            <Route path="/deposit" element={<DepositPage />} />
          </Route>
          
          {/* Error Routes */}
          <Route path="/404" element={<ErrorPage type="404" />} />
          <Route path="/error" element={<ErrorPage type="501" />} />
          <Route path="*" element={<ErrorPage type="404" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;