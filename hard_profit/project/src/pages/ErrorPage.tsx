import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Home, AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

interface ErrorPageProps {
  type?: '404' | '501';
}

const ErrorPage: React.FC<ErrorPageProps> = ({ type }) => {
  const error = useRouteError() as any;
  const is404 = type === '404' || error?.status === 404;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 flex flex-col">
      <nav className="container mx-auto px-4 py-6">
        <Link to="/" className="flex items-center">
          <Home className="h-8 w-8 text-amber-400" />
          <span className="ml-2 text-2xl font-bold text-white">Profit Vault</span>
        </Link>
      </nav>

      <div className="flex-grow container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 bg-white/10 backdrop-blur-lg rounded-full mb-8">
            <AlertCircle className="h-16 w-16 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {is404 ? "Page Not Found" : "Something Went Wrong"}
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-lg mx-auto">
            {is404 
              ? "Oops! The page you're looking for doesn't exist or has been moved."
              : "Oops! Something went wrong on our end. We're working to fix it."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <Button variant="primary" size="lg" className="bg-amber-500 hover:bg-amber-600 text-blue-900">
                <Home className="mr-2" size={20} /> Go Home
              </Button>
            </Link>
            <button onClick={() => window.history.back()} className="text-blue-100 hover:text-white transition-colors flex items-center">
              <ArrowLeft className="mr-2" size={20} /> Go Back
            </button>
          </div>
        </div>
      </div>

      <footer className="container mx-auto px-4 py-8">
        <div className="text-center text-blue-100">
          © {new Date().getFullYear()} Profit Vault. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default ErrorPage;