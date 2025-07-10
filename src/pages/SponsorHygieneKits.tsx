import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  School, 
  Gift, 
  CreditCard, 
  Heart, 
  Users, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  Package,
  Star,
  MessageSquare,
  Loader,
  Info,
  Target,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface SchoolsResponse {
  message: string;
  schools: string[];
}

interface SchoolData {
  name: string;
  eligibleStudents: number;
  currentNeed: number;
  description: string;
}

// Mock school data with needs
const mockSchoolData: Record<string, SchoolData> = {
  "Greenwood High School": {
    name: "Greenwood High School",
    eligibleStudents: 127,
    currentNeed: 89,
    description: "A diverse urban school with students from various socioeconomic backgrounds"
  },
  "Riverdale High School": {
    name: "Riverdale High School",
    eligibleStudents: 203,
    currentNeed: 156,
    description: "Large suburban school with growing need for hygiene support programs"
  },
  "NYU School of Education": {
    name: "NYU School of Education",
    eligibleStudents: 45,
    currentNeed: 23,
    description: "University program supporting student teachers and education majors"
  },
  "Springfield High School": {
    name: "Springfield High School",
    eligibleStudents: 178,
    currentNeed: 134,
    description: "Rural school district serving farming communities with limited resources"
  },
  "Lincoln High School": {
    name: "Lincoln High School",
    eligibleStudents: 95,
    currentNeed: 67,
    description: "Inner-city school focused on supporting underserved student populations"
  },
  "Sunnydale High School": {
    name: "Sunnydale High School",
    eligibleStudents: 156,
    currentNeed: 98,
    description: "Coastal community school with mixed demographics and varying needs"
  }
};

const kitTypes = [
  {
    id: 'basic',
    name: 'Basic Hygiene Kit',
    price: 15,
    description: 'Essential hygiene items for one month',
    items: ['Sanitary pads', 'Soap', 'Toothbrush & toothpaste', 'Deodorant', 'Hair ties'],
    color: 'from-pink-400 to-rose-500'
  },
  {
    id: 'premium',
    name: 'Premium Care Kit',
    price: 25,
    description: 'Comprehensive hygiene and wellness package',
    items: ['All basic items', 'Shampoo & conditioner', 'Body lotion', 'Face wash', 'Wellness guide'],
    color: 'from-purple-400 to-indigo-500'
  },
  {
    id: 'deluxe',
    name: 'Deluxe Support Kit',
    price: 40,
    description: 'Complete care package with educational materials',
    items: ['All premium items', 'Educational booklet', 'Comfort items', 'Emergency supplies', 'Personalized note'],
    color: 'from-blue-400 to-cyan-500'
  }
];

type Step = 'school' | 'donation' | 'payment' | 'confirmation';

const SponsorHygieneKits: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('school');
  const [schools, setSchools] = useState<string[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedKit, setSelectedKit] = useState<string>('basic');
  const [kitQuantity, setKitQuantity] = useState<number>(1);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [personalMessage, setPersonalMessage] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get<SchoolsResponse>('https://glt-backend.glt-sandbox.com/api/schools/');
        setSchools(['General Fund (All Schools)', ...response.data.schools]);
      } catch (err) {
        console.error('Failed to fetch schools:', err);
        setSchools(['General Fund (All Schools)', ...Object.keys(mockSchoolData)]);
      } finally {
        setLoadingSchools(false);
      }
    };

    fetchSchools();
  }, []);

  // Calculate total amount
  const selectedKitData = kitTypes.find(kit => kit.id === selectedKit);
  const totalAmount = selectedKitData ? (selectedKitData.price * kitQuantity) + donationAmount : donationAmount;

  const getSchoolData = (schoolName: string): SchoolData => {
    if (schoolName === 'General Fund (All Schools)') {
      const totalEligible = Object.values(mockSchoolData).reduce((sum, school) => sum + school.eligibleStudents, 0);
      const totalNeed = Object.values(mockSchoolData).reduce((sum, school) => sum + school.currentNeed, 0);
      return {
        name: 'General Fund (All Schools)',
        eligibleStudents: totalEligible,
        currentNeed: totalNeed,
        description: 'Support students across all partner schools in our network'
      };
    }
    return mockSchoolData[schoolName] || {
      name: schoolName,
      eligibleStudents: 0,
      currentNeed: 0,
      description: 'School information not available'
    };
  };

  const handleNext = () => {
    if (currentStep === 'school' && selectedSchool) {
      setCurrentStep('donation');
    } else if (currentStep === 'donation') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      handleSubmitDonation();
    }
  };

  const handleSubmitDonation = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCurrentStep('confirmation');
    setIsProcessing(false);
  };

  const stepIndicator = (step: Step, index: number, title: string) => {
    const isActive = currentStep === step;
    const isCompleted = ['school', 'donation', 'payment', 'confirmation'].indexOf(currentStep) > index;
    
    return (
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
          isCompleted 
            ? 'bg-green-500 text-white' 
            : isActive 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-500'
        }`}>
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
        </div>
        <span className={`ml-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
          {title}
        </span>
      </div>
    );
  };

  if (loadingSchools) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Schools</h2>
          <p className="text-gray-600">Please wait while we fetch available schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/sponsor')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-blue-600 hover:text-blue-700"
            aria-label="Back to sponsor dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sponsor Hygiene Kits</h1>
            <p className="text-gray-600">Help provide essential hygiene supplies to students in need</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-white/20">
          <div className="flex justify-between items-center">
            {stepIndicator('school', 0, 'Select School')}
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            {stepIndicator('donation', 1, 'Choose Donation')}
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            {stepIndicator('payment', 2, 'Payment Details')}
            <div className="flex-1 h-0.5 bg-gray-200 mx-4"></div>
            {stepIndicator('confirmation', 3, 'Confirmation')}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          {currentStep === 'school' && (
            <motion.div
              key="school"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <School className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a School to Support</h2>
                <p className="text-gray-600">Select a school or support our general fund to help students across all partner schools</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {schools.map((school) => {
                  const schoolData = getSchoolData(school);
                  const isSelected = selectedSchool === school;
                  
                  return (
                    <motion.div
                      key={school}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSchool(school)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-2">{school}</h3>
                          <p className="text-sm text-gray-600 mb-3">{schoolData.description}</p>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-gray-900">{schoolData.eligibleStudents}</div>
                          <div className="text-xs text-gray-600">Eligible Students</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-red-600">{schoolData.currentNeed}</div>
                          <div className="text-xs text-gray-600">Current Need</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  disabled={!selectedSchool}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'donation' && (
            <motion.div
              key="donation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Donation</h2>
                <p className="text-gray-600">Select hygiene kits and add an optional donation to maximize your impact</p>
              </div>

              {/* Kit Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Select Hygiene Kit Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {kitTypes.map((kit) => {
                    const isSelected = selectedKit === kit.id;
                    
                    return (
                      <motion.div
                        key={kit.id}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedKit(kit.id)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'border-pink-500 bg-pink-50 shadow-lg' 
                            : 'border-gray-200 bg-white hover:border-pink-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kit.color} flex items-center justify-center`}>
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          {isSelected && (
                            <CheckCircle className="w-6 h-6 text-pink-500" />
                          )}
                        </div>
                        
                        <h4 className="font-bold text-gray-900 mb-2">{kit.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{kit.description}</p>
                        <div className="text-2xl font-bold text-pink-500 mb-3">${kit.price}</div>
                        
                        <ul className="space-y-1">
                          {kit.items.map((item, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quantity Selection */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of Kits
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setKitQuantity(Math.max(1, kitQuantity - 1))}
                      className="w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-3xl font-bold text-gray-900">{kitQuantity}</div>
                      <div className="text-sm text-gray-600">kits</div>
                    </div>
                    <button
                      onClick={() => setKitQuantity(kitQuantity + 1)}
                      className="w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Additional Donation */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Donation (Optional)</h3>
                <div className="bg-blue-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                    <span className="font-medium text-gray-900">Support general operations and outreach</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    placeholder="Enter additional donation amount"
                  />
                </div>
              </div>

              {/* Personal Message */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Personal Message (Optional)</h3>
                <div className="bg-purple-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-purple-500" />
                    <span className="font-medium text-gray-900">Add an encouraging message for the students</span>
                  </div>
                  <textarea
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 resize-none"
                    rows={3}
                    placeholder="Write a message of encouragement and support..."
                    maxLength={200}
                  />
                  <div className="text-right text-sm text-gray-500 mt-2">
                    {personalMessage.length}/200 characters
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Donation Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{kitQuantity}x {selectedKitData?.name}</span>
                    <span className="font-medium">${selectedKitData ? selectedKitData.price * kitQuantity : 0}</span>
                  </div>
                  {donationAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Additional Donation</span>
                      <span className="font-medium">${donationAmount}</span>
                    </div>
                  )}
                  <div className="border-t border-green-200 pt-2 flex justify-between text-lg font-bold">
                    <span>Total Impact</span>
                    <span className="text-green-600">${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('school')}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Continue to Payment
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'payment' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Details</h2>
                <p className="text-gray-600">Complete your sponsorship with secure payment processing</p>
              </div>

              {/* Demo Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Info className="w-6 h-6 text-amber-600" />
                  <span className="font-bold text-amber-800">Demo Mode</span>
                </div>
                <p className="text-amber-700">
                  This is a demonstration of the sponsorship flow. No actual payment will be processed. 
                  In production, this would integrate with secure payment processors like Stripe or PayPal.
                </p>
              </div>

              {/* Donor Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Mock Payment Form */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300"
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Final Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Final Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Supporting:</span>
                    <span className="font-medium">{selectedSchool}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Donation:</span>
                    <span className="font-medium">{kitQuantity}x {selectedKitData?.name} + ${donationAmount} additional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impact:</span>
                    <span className="font-medium">{kitQuantity} students supported</span>
                  </div>
                  <div className="border-t border-blue-200 pt-3 flex justify-between text-xl font-bold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">${totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('donation')}
                  className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!donorName || !donorEmail || isProcessing}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Sponsorship
                      <Heart className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'confirmation' && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Thank You! 🎉
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Your sponsorship is already making a difference in young women's lives.
                </p>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-green-600">{kitQuantity}</div>
                      <div className="text-sm text-gray-600">Students Supported</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600">${totalAmount}</div>
                      <div className="text-sm text-gray-600">Total Contribution</div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-purple-600">1</div>
                      <div className="text-sm text-gray-600">School Supported</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl p-6 mb-8 text-left">
                  <h4 className="font-bold text-gray-900 mb-3">What happens next?</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>You'll receive a confirmation email with your donation receipt</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>Hygiene kits will be prepared and delivered to {selectedSchool}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>You'll receive updates on the impact of your sponsorship</span>
                    </li>
                    {personalMessage && (
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>Your personal message will be included with the kits</span>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      // Reset form
                      setCurrentStep('school');
                      setSelectedSchool('');
                      setSelectedKit('basic');
                      setKitQuantity(1);
                      setDonationAmount(0);
                      setPersonalMessage('');
                      setDonorName('');
                      setDonorEmail('');
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Sponsor More Kits
                  </button>
                  <button
                    onClick={() => navigate('/sponsor')}
                    className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SponsorHygieneKits;