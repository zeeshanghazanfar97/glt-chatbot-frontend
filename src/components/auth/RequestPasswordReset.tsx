import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import authService from '../../services/authService';

interface RequestPasswordResetFormData {
  email: string;
}

const RequestPasswordReset: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm<RequestPasswordResetFormData>();
  const navigate = useNavigate();
  const location = useLocation();
  const error = location.state?.error;

  const onSubmit = async (data: RequestPasswordResetFormData) => {
    try {
      await authService.requestPasswordReset(data.email);
      navigate('/login', { 
        replace: true,
        state: { message: 'Password reset instructions have been sent to your email.' }
      });
    } catch (err: any) {
      setError('email', {
        type: 'manual',
        message: err.detail || 'Failed to send reset instructions. Please try again.'
      });
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
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
            className="text-2xl font-bold text-gray-800 mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Reset Password
          </motion.h1>
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {error && (
          <motion.div 
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-red-600">{error}</p>
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
              Email Address
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

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200"
          >
            Send Reset Instructions
          </button>

          <Link 
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-pink-500 transition-colors mt-4"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default RequestPasswordReset;