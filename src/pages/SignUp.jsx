import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import zxcvbn from 'zxcvbn';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import AuthSkeleton from '../components/auth/AuthSkeleton';

function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    newsletter: false
  });

  const [passwordScore, setPasswordScore] = useState(0);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      setPasswordScore(zxcvbn(value).score);
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ff4e42', '#ffa724', '#ffd000', '#9ae66e', '#66c649'];
    return colors[passwordScore];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <AuthHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <AuthSkeleton />
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FcGoogle className="h-5 w-5 mr-3" />
                Continue with Google
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiGithub className="h-5 w-5 mr-3" />
                Continue with GitHub
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <FiLinkedin className="h-5 w-5 mr-3" />
                Continue with LinkedIn
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-50 dark:bg-gray-900 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Create a strong password"
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${(passwordScore + 1) * 20}%`,
                          backgroundColor: getPasswordStrengthColor()
                        }}
                      ></div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Password strength: {['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][passwordScore]}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
                      Terms and Conditions
                    </Link>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="newsletter"
                    name="newsletter"
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newsletter" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Subscribe to our newsletter for updates and featured snippets
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>
        )}
      </main>

      <AuthFooter />
    </div>
  );
}

export default SignUp;