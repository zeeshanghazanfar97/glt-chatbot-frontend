import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

const overlayVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate('/', { replace: true });
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-4xl relative bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Overlay Section - Hidden on mobile, shown at top on tablet */}
          <motion.div 
            className="hidden md:flex lg:w-1/2 bg-gradient-to-br from-pink-400 to-pink-500 p-8 text-white items-center justify-center"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">New Here?</h2>
              <p className="text-lg mb-8">Sign up and discover a great amount of new opportunities!</p>
              <Link 
                to="/register"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-pink-500 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </motion.div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            className="w-full lg:w-1/2 p-6 md:p-8"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="text-center mb-8">
              <motion.div 
                className="inline-flex items-center justify-center mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src="/logo.png" alt="GLT Logo" className="h-16 w-auto" />
              </motion.div>
              <motion.h1 
                className="text-2xl font-bold text-gray-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Welcome Back!
              </motion.h1>
            </div>

            {message && (
              <motion.div 
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-green-600">{message}</p>
              </motion.div>
            )}

            <motion.form 
              onSubmit={handleSubmit(onSubmit)} 
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-end">
                <Link 
                  to="/request-reset"
                  className="text-sm text-pink-500 hover:text-pink-600"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <motion.div 
                  className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200"
              >
                Sign In
              </button>

              {/* Mobile-only sign up link */}
              <div className="block md:hidden text-center">
                <p className="text-sm text-gray-600 mb-4">New here?</p>
                <Link 
                  to="/register"
                  className="inline-block w-full bg-white border-2 border-pink-500 text-pink-500 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors duration-200"
                >
                  Create Account
                </Link>
              </div>

              {/* Desktop sign up link */}
              <p className="hidden md:block text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-pink-500 hover:text-pink-600 font-medium">
                  Sign up
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;