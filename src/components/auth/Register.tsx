import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RegisterData, UserType } from '../../services/authService';
import { motion } from 'framer-motion';
import axios from 'axios';

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

interface SchoolsResponse {
  message: string;
  schools: string[];
}

const userTypes: { value: UserType; label: string }[] = [
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'community_member', label: 'Community Member' },
  { value: 'sponsor', label: 'Sponsor' }
];

const gradeOptions = Array.from({ length: 8 }, (_, i) => i + 5);

const Register: React.FC = () => {
  const { register: registerUser, error } = useAuth();
  const navigate = useNavigate();
  const [schools, setSchools] = useState<string[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [schoolsError, setSchoolsError] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, watch, control } = useForm<RegisterFormData>({
    defaultValues: {
      user_type: 'student'
    }
  });
  
  const password = watch('password', '');
  const userType = watch('user_type');

  // Fetch schools when component mounts
  useEffect(() => {
    const fetchSchools = async () => {
      setLoadingSchools(true);
      setSchoolsError(null);
      
      try {
        const response = await axios.get<SchoolsResponse>('https://glt-backend.glt-sandbox.com/api/schools/');
        setSchools(response.data.schools);
      } catch (err: any) {
        console.error('Failed to fetch schools:', err);
        setSchoolsError('Failed to load schools. You can still register by typing your school name.');
        // Fallback to empty array so the form still works
        setSchools([]);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      navigate('/login', { 
        replace: true,
        state: { message: 'Registration successful! Please login to continue.' }
      });
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-4xl relative bg-white rounded-2xl shadow-xl overflow-hidden my-8">
        <div className="flex flex-col lg:flex-row">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  I am a
                </label>
                <Controller
                  name="user_type"
                  control={control}
                  rules={{ required: 'Please select your role' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    >
                      {userTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  )}
                />
                {errors.user_type && (
                  <p className="mt-1 text-sm text-red-600">{errors.user_type.message}</p>
                )}
              </div>

              {(userType === 'student' || userType === 'parent') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Grade
                    </label>
                    <Controller
                      name="student_grade"
                      control={control}
                      rules={{ required: 'Grade is required' }}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                        >
                          <option value="">Select Grade</option>
                          {gradeOptions.map(grade => (
                            <option key={grade} value={grade}>
                              Grade {grade}
                            </option>
                          ))}
                        </select>
                      )}
                    />
                    {errors.student_grade && (
                      <p className="mt-1 text-sm text-red-600">{errors.student_grade.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      School
                    </label>
                    <Controller
                      name="student_school"
                      control={control}
                      rules={{ required: 'School is required' }}
                      render={({ field }) => (
                        <div className="relative">
                          {loadingSchools ? (
                            <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
                              <div className="flex items-center gap-2 text-gray-500">
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-pink-500 rounded-full animate-spin"></div>
                                <span className="text-sm">Loading schools...</span>
                              </div>
                            </div>
                          ) : schools.length > 0 ? (
                            <select
                              {...field}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                            >
                              <option value="">Select School</option>
                              {schools.map(school => (
                                <option key={school} value={school}>
                                  {school}
                                </option>
                              ))}
                              <option value="other">Other (not listed)</option>
                            </select>
                          ) : (
                            <input
                              type="text"
                              {...field}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                              placeholder="Enter school name"
                            />
                          )}
                          {schoolsError && (
                            <p className="mt-1 text-xs text-amber-600">{schoolsError}</p>
                          )}
                        </div>
                      )}
                    />
                    {errors.student_school && (
                      <p className="mt-1 text-sm text-red-600">{errors.student_school.message}</p>
                    )}
                  </div>
                </div>
              )}

              {userType === 'parent' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Student's Name
                  </label>
                  <input
                    type="text"
                    {...register('student_name', { required: "Student's name is required" })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    placeholder="Enter student's name"
                  />
                  {errors.student_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.student_name.message}</p>
                  )}
                </div>
              )}

              {(userType === 'teacher' || userType === 'community_member' || userType === 'sponsor') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    {...register('organization_name')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"
                    placeholder="Enter organization name (optional)"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' }
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