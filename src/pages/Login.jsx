import { useState, useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import AuthHeader from '../components/auth/AuthHeader';
import AuthFooter from '../components/auth/AuthFooter';
import AuthSkeleton from '../components/auth/AuthSkeleton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { isAuthenticated } from '../utility';

function Login() {
  const navigate = useNavigate()
  if(isAuthenticated){
    navigate('/profile/')
  }

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const url = 'http://127.0.0.1:8000/api/accounts/auth/jwt/create/';
    
    try {
      // Send the form data as a POST request
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify JSON data format
        },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });
  
      if (response.status === 401) {
        toast.error("Login credentials are invalid!");
        return;
      }
  
      if (!response.ok) {
        toast.warning("Something went wrong! Try again.");
        return;
      }
      
      if(response.ok){
        const data = await response.json(); // Parse the JSON response
        localStorage.setItem('auth-token', data.access)
        toast.success('Login successful. Redirecting...');
        navigate('/profile/')
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };
  

  return (
    
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <AuthHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <AuthSkeleton />
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back!
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                New to CodeShare?{' '}
                <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Create an account
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
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                    Remember me
                  </label>
                </div>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in
              </button>
            </form>
          </div>
        )}
      </main>

      <AuthFooter />
    </div>
  );
}

export default Login;