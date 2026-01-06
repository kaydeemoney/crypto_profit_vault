import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, ChevronRight, Shield, TrendingUp, Users, DollarSign, BarChart, Check, Globe } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-amber-400" />
            <span className="ml-2 text-2xl font-bold text-white">Profit Vault</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-blue-100 hover:text-white transition-colors">
              About Us
            </Link>
            <a href="#features" className="text-blue-100 hover:text-white transition-colors">
              Features
            </a>
            <a href="#investments" className="text-blue-100 hover:text-white transition-colors">
              Investments
            </a>
            <a href="#testimonials" className="text-blue-100 hover:text-white transition-colors">
              Testimonials
            </a>
          </div>
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
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
              Invest Smarter,<br />Grow Faster
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust Profit Vault for their investment needs.
              Start your journey to financial freedom today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register">
                <Button variant="primary" size="lg" className="bg-amber-500 hover:bg-amber-600 text-blue-900 w-full sm:w-auto">
                  Start Investing Now <ChevronRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-900 w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <Globe className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-blue-100">Global Platform</div>
            </div>
            <div>
              <Shield className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-blue-100">Secure & Licensed</div>
            </div>
            <div>
              <Users className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-blue-100">24/7 Support</div>
            </div>
            <div>
              <TrendingUp className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <div className="text-sm text-blue-100">Real-time Trading</div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Plans */}
      <div id="investments" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Investment Plans</h2>
          <p className="text-xl text-blue-100">Choose the perfect investment plan for your goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Starter Plan",
              price: "$50",
              roi: "20%",
              period: "30 days",
              features: ["Minimum deposit: $50", "Maximum deposit: $99", "ROI: 20% monthly", "24/7 Support"]
            },
            {
              name: "Pro Plan",
              price: "$500",
              roi: "110%",
              period: "30 days",
              features: ["Minimum deposit: $500", "Maximum deposit: $999", "ROI: 110% monthly", "Priority Support"]
            },
            {
              name: "Elite Plan",
              price: "$1000",
              roi: "120%",
              period: "30 days",
              features: ["Minimum deposit: $1000", "Maximum deposit: $4999", "ROI: 120% monthly", "VIP Support"]
            }
          ].map((plan, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:transform hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold text-amber-400 mb-2">{plan.roi}</div>
              <div className="text-blue-100 mb-6">Monthly ROI</div>
              <div className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-blue-100">
                    <Check size={16} className="text-amber-400 mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/register">
                <Button variant="outline" fullWidth className="text-white border-white hover:bg-white hover:text-blue-900">
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Image */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7567596/pexels-photo-7567596.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <DollarSign className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">$10M+</div>
              <div className="text-blue-100">Total Investments</div>
            </div>
            <div>
              <Users className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">5000+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <BarChart className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">200%</div>
              <div className="text-blue-100">Average ROI</div>
            </div>
            <div>
              <Shield className="h-10 w-10 text-amber-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">Secure Platform</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Investors Say</h2>
          <p className="text-xl text-blue-100">Join thousands of satisfied investors worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Professional Investor",
              image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
              quote: "Profit Vault has transformed my investment strategy. The returns are incredible!"
            },
            {
              name: "Michael Chen",
              role: "Business Owner",
              image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
              quote: "The platform is intuitive and the support team is always there when you need them."
            },
            {
              name: "Emma Davis",
              role: "Retail Investor",
              image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg",
              quote: "I've tried many platforms, but Profit Vault offers the best ROI and security."
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-blue-100">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-blue-100">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Profit Vault today and take control of your financial future.
            Start with as little as $50.
          </p>
          <Link to="/register">
            <Button variant="primary" size="lg" className="bg-amber-500 hover:bg-amber-600 text-blue-900">
              Create Your Account <ChevronRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-blue-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center mb-4">
              <Home className="h-6 w-6 text-amber-400" />
              <span className="ml-2 text-xl font-bold text-white">Profit Vault</span>
            </div>
            <p className="text-blue-100">
              Your trusted partner in building wealth through smart investments.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-blue-100 hover:text-white transition-colors">
                About Us
              </Link>
              <Link to="/register" className="block text-blue-100 hover:text-white transition-colors">
                Get Started
              </Link>
              <Link to="/login" className="block text-blue-100 hover:text-white transition-colors">
                Login
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-blue-100 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-blue-100 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-blue-100 hover:text-white transition-colors">
                Risk Disclosure
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-blue-100">
              <p>Email: support@profitvault.com</p>
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>
        <div className="text-center text-blue-100 pt-8 border-t border-blue-800">
          © {new Date().getFullYear()} Profit Vault. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;