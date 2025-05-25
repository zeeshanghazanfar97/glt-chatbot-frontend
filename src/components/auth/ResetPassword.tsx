import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import authService from '../../services/authService';

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<ResetPasswordFormData>();
  const password = watch('password', '');

  useEffect(() => {
    if (!token) {
      navigate('/request-reset', { 
        replace: true,
        state: { error: 'Invalid or expired reset token. Please request a new password reset.' }
      });
    }
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setError('password', {
        type: 'manual',
        message: 'Invalid reset token. Please request a new password reset.'
      });
      return;
    }

    try {
      await authService.confirmPasswordReset(token, data.password);
      navigate('/login', { 
        replace: true,
        state: { message: 'Password has been reset successfully. Please login with your new password.' }
      });
    } catch (err: any) {
      // Handle API validation errors
      if (err.password) {
        setError('password', {
          type: 'manual',
          message: Array.isArray(err.password) ? err.password[0] : err.password
        });
      } else {
        setError('password', {
          type: 'manual',
          message: err.detail || 'Failed to reset password. Please try again.'
        });
      }
    }
  };

  if (!token) {
    return null;
  }

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
            Create New Password
          </motion.h1>
          <p className="text-gray-600 text-sm">
            Please enter your new password below.
          </p>
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
              New Password
            </label>
            <input
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              placeholder="Enter new password"
            />
            {errors.password && (
              <motion.p 
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.password.message}
              </motion.p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <motion.p 
                className="mt-1 text-sm text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.confirmPassword.message}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors duration-200"
          >
            Reset Password
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;