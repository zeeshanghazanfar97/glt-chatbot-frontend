import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RegisterData } from '../../services/authService';
import { motion } from 'framer-motion';

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

interface RegisterFormData extends RegisterData {
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const { register: registerUser, error } = useAuth();
  const navigate = useNavigate();
  const password = watch('password', '');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      navigate('/login', { replace: true });
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
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="text-lg mb-8">Already have an account? Sign in to continue your journey!</p>
              <Link 
                to="/login"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-pink-500 transition-colors duration-200"
              >
                Sign In
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
                className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-full mb-4"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Heart className="text-pink-500" size={32} />
              </motion.div>
              <motion.h1 
                className="text-2xl font-bold text-gray-800"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Create Account
              </motion.h1>
            </div>

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
                  Full Name
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grade
                  </label>
                  <input
                    type="number"
                    {...register('grade', { 
                      required: 'Grade is required',
                      min: { value: 5, message: 'Grade must be between 5 and 12' },
                      max: { value: 12, message: 'Grade must be between 5 and 12' }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    placeholder="5-12"
                  />
                  {errors.grade && (
                    <p className="mt-1 text-sm text-red-600">{errors.grade.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    School
                  </label>
                  <input
                    type="text"
                    {...register('school', { required: 'School is required' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    placeholder="School name"
                  />
                  {errors.school && (
                    <p className="mt-1 text-sm text-red-600">{errors.school.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Create a password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                )}
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
                Sign Up
              </button>

              {/* Mobile-only sign in link */}
              <div className="block md:hidden text-center">
                <p className="text-sm text-gray-600 mb-4">Already have an account?</p>
                <Link 
                  to="/login"
                  className="inline-block w-full bg-white border-2 border-pink-500 text-pink-500 py-2 px-4 rounded-lg hover:bg-pink-50 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </div>

              {/* Desktop sign in link */}
              <p className="hidden md:block text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-pink-500 hover:text-pink-600 font-medium">
                  Sign in
                </Link>
              </p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;