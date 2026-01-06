import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Shield, Target, Award, ChevronRight, TrendingUp, DollarSign, LineChart } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Home className="h-8 w-8 text-amber-400" />
            <span className="ml-2 text-2xl font-bold text-white">Profit Vault</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" className="bg-amber-500 hover:bg-amber-600 text-blue-900">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to Profit Vault
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Your Gateway to Smarter Investing. We are a team of passionate, highly experienced professional traders with a mission to help individuals like you grow wealth steadily and securely through the power of the financial markets.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Our Story: From Traders to Partners</h2>
          <p className="text-blue-100 mb-6">
            Our journey started years ago, deep in the world of Forex, Stocks, and Cryptocurrencies. 
            We've seen the highs, weathered the lows, and learned the secrets that separate amateurs from real professionals.
          </p>
          <p className="text-blue-100 mb-6">
            Over time, our team realized a simple but painful truth: "Many hardworking people want to invest, 
            but they either lack the time, experience, or trusted partners to make it happen safely."
          </p>
          <p className="text-blue-100">
            That's why we built Profit Vault — a platform designed to bridge the gap between dreams and achievements.
          </p>
        </div>
      </div>

      {/* Expertise Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Multi-Market Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
            <TrendingUp className="h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">Stock Markets</h3>
            <p className="text-blue-100">
              Expert trading in blue-chip and growth stocks, maximizing returns through strategic market positioning.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
            <DollarSign className="h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">Foreign Exchange</h3>
            <p className="text-blue-100">
              Professional Forex trading covering currencies and commodities with proven strategies.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
            <LineChart className="h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-4">Cryptocurrencies</h3>
            <p className="text-blue-100">
              Strategic investments in BTC, ETH, and emerging tokens, capitalizing on market opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Our Core Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Protect Capital First</h3>
              <p className="text-blue-100">Your security and capital preservation are our top priorities</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Grow Steadily</h3>
              <p className="text-blue-100">Consistent, sustainable growth through proven strategies</p>
            </div>
            <div className="text-center">
              <Award className="h-16 w-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Celebrate Every Win</h3>
              <p className="text-blue-100">Recognizing achievements, big and small, in your investment journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
            <Target className="h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
            <p className="text-blue-100">
              To become a global leader in digital wealth creation, giving ordinary people the extraordinary 
              ability to grow their money confidently through expert-led investments.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-lg p-8">
            <Award className="h-12 w-12 text-amber-400 mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <ul className="text-blue-100 space-y-2">
              <li>• To deliver consistent, secure, and superior returns to our investors</li>
              <li>• To provide complete transparency and real-time reporting</li>
              <li>• To offer professional investment strategies previously available only to elite investors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            When you invest with Profit Vault, you're not just putting your money to work — you're joining 
            a community of ambitious individuals who believe in smart, responsible wealth creation.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" className="bg-amber-500 hover:bg-amber-600 text-blue-900">
              Start Your Journey <ChevronRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-blue-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Home className="h-6 w-6 text-amber-400" />
            <span className="ml-2 text-xl font-bold text-white">Profit Vault</span>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors">
              Home
            </Link>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-center mt-8 text-blue-100">
          © {new Date().getFullYear()} Profit Vault. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;