import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, Globe, Database, Edit, Trash2, Loader, ExternalLink, Play, Terminal, FileCode, Key, Info, Zap, Clock, Pause, RotateCcw, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authService from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';

interface SandboxData {
  user_id: string;
  container_name: string;
  status: 'running' | 'paused' | 'deleted';
  urls: {
    frontend: string;
    backend: string;
    code_server: string;
  };
}

const Sandbox = () => {
  const navigate = useNavigate();
  const [sandbox, setSandbox] = useState<SandboxData | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pausing, setPausing] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [frontendReady, setFrontendReady] = useState(false);
  const [checkingFrontend, setCheckingFrontend] = useState(false);

  // Check for existing sandbox on component mount
  useEffect(() => {
    checkExistingSandbox();
  }, []);

  // Check frontend availability when sandbox status changes to running
  useEffect(() => {
    if (sandbox?.status === 'running' && sandbox.urls.frontend) {
      checkFrontendAvailability();
    } else {
      setFrontendReady(false);
      setCheckingFrontend(false);
    }
  }, [sandbox?.status, sandbox?.urls.frontend]);

  const checkExistingSandbox = async () => {
    setLoading(true);
    setError(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.get(
        'https://glt-backend.glt-sandbox.com/api/sandbox',
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          }
        }
      );

      // If we get a 200 response, sandbox exists
      setSandbox(response.data);
    } catch (err: any) {
      // If 404, no sandbox exists - this is expected
      if (err.response?.status === 404) {
        setSandbox(null);
      } else {
        // Other errors should be displayed
        console.error('Sandbox check error:', err);
        setError(
          err.response?.data?.detail || 
          err.response?.data?.message || 
          'Failed to check sandbox status. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const checkFrontendAvailability = async () => {
    if (!sandbox?.urls.frontend) return;

    setCheckingFrontend(true);
    setFrontendReady(false);

    const maxAttempts = 30; // Maximum 30 attempts (30 seconds)
    let attempts = 0;

    const checkUrl = async (): Promise<boolean> => {
      try {
        // Use a simple HEAD request to check if the frontend is responding
        const response = await fetch(sandbox.urls.frontend, {
          method: 'HEAD',
          mode: 'no-cors', // Avoid CORS issues
        });
        return true; // If no error is thrown, the frontend is likely ready
      } catch (error) {
        return false;
      }
    };

    const pollFrontend = async () => {
      attempts++;
      
      try {
        // Try to fetch the frontend URL
        const response = await fetch(sandbox.urls.frontend, {
          method: 'GET',
          mode: 'no-cors',
        });
        
        // If we get here without an error, the frontend is ready
        setFrontendReady(true);
        setCheckingFrontend(false);
        return;
      } catch (error) {
        // Frontend not ready yet
        if (attempts < maxAttempts) {
          setTimeout(pollFrontend, 1000); // Check again in 1 second
        } else {
          // Max attempts reached, assume it's ready anyway
          setFrontendReady(true);
          setCheckingFrontend(false);
        }
      }
    };

    // Start polling
    pollFrontend();
  };

  const createSandbox = async () => {
    setCreating(true);
    setError(null);
    setSuccess(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.post(
        'https://glt-backend.glt-sandbox.com/api/sandbox/create/',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setSandbox(response.data);
      setSuccess('Sandbox created successfully! Your development environment is starting up...');
    } catch (err: any) {
      console.error('Sandbox creation error:', err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to create sandbox. Please try again.'
      );
    } finally {
      setCreating(false);
    }
  };

  const pauseSandbox = async () => {
    setPausing(true);
    setError(null);
    setSuccess(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.post(
        'https://glt-backend.glt-sandbox.com/api/sandbox/pause/',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update sandbox status to paused
      setSandbox(prev => prev ? { ...prev, status: 'paused' } : null);
      setSuccess(response.data.message || 'Sandbox paused successfully!');
    } catch (err: any) {
      console.error('Sandbox pause error:', err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to pause sandbox. Please try again.'
      );
    } finally {
      setPausing(false);
    }
  };

  const resumeSandbox = async () => {
    setResuming(true);
    setError(null);
    setSuccess(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.post(
        'https://glt-backend.glt-sandbox.com/api/sandbox/resume/',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update sandbox status to running
      setSandbox(prev => prev ? { ...prev, status: 'running' } : null);
      setSuccess(response.data.message || 'Sandbox resumed successfully! Frontend is starting up...');
    } catch (err: any) {
      console.error('Sandbox resume error:', err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to resume sandbox. Please try again.'
      );
    } finally {
      setResuming(false);
    }
  };

  const resetSandbox = async () => {
    setResetting(true);
    setError(null);
    setSuccess(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      const response = await axios.post(
        'https://glt-backend.glt-sandbox.com/api/sandbox/reset/',
        {},
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Update sandbox with the new data from reset response
      setSandbox(response.data.sandbox);
      setSuccess(response.data.message || 'Sandbox reset successfully! All changes have been reverted to default.');
    } catch (err: any) {
      console.error('Sandbox reset error:', err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to reset sandbox. Please try again.'
      );
    } finally {
      setResetting(false);
    }
  };

  const deleteSandbox = async () => {
    setDeleting(true);
    setError(null);
    setSuccess(null);

    try {
      const tokens = authService.getTokens();
      if (!tokens?.access) throw new Error('Not authenticated');

      await axios.delete(
        'https://glt-backend.glt-sandbox.com/api/sandbox/delete/',
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          }
        }
      );

      setSandbox(null);
      setSuccess('Sandbox deleted successfully!');
    } catch (err: any) {
      console.error('Sandbox deletion error:', err);
      setError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        'Failed to delete sandbox. Please try again.'
      );
    } finally {
      setDeleting(false);
    }
  };

  const openUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'text-green-600 bg-green-500';
      case 'paused':
        return 'text-yellow-600 bg-yellow-500';
      case 'deleted':
        return 'text-red-600 bg-red-500';
      default:
        return 'text-gray-600 bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'paused':
        return 'Paused';
      case 'deleted':
        return 'Deleted';
      default:
        return 'Unknown';
    }
  };

  const sandboxActions = [
    {
      title: 'View Frontend',
      description: 'See your React application in action',
      icon: <Globe className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      url: sandbox?.urls.frontend,
      action: () => openUrl(sandbox!.urls.frontend),
      disabled: sandbox?.status !== 'running' || !frontendReady,
      loading: sandbox?.status === 'running' && checkingFrontend,
      statusText: checkingFrontend ? 'Starting up...' : !frontendReady ? 'Waiting for frontend...' : 'Ready'
    },
    {
      title: 'View Backend Admin',
      description: 'Access Django admin panel',
      icon: <Database className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      url: `${sandbox?.urls.backend}/admin`,
      action: () => openUrl(`${sandbox!.urls.backend}/admin`),
      disabled: sandbox?.status !== 'running'
    },
    {
      title: 'Edit Frontend Code',
      description: 'Code your React components',
      icon: <FileCode className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      url: `${sandbox?.urls.code_server}/?folder=/app/frontend`,
      action: () => openUrl(`${sandbox!.urls.code_server}/?folder=/app/frontend`),
      disabled: sandbox?.status !== 'running'
    },
    {
      title: 'Edit Backend Code',
      description: 'Develop your Django API',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      url: `${sandbox?.urls.code_server}/?folder=/app/backend`,
      action: () => openUrl(`${sandbox!.urls.code_server}/?folder=/app/backend`),
      disabled: sandbox?.status !== 'running'
    }
  ];

  const upcomingFeatures = [
    {
      title: 'Terminal Access',
      description: 'Direct command line access to your sandbox environment',
      icon: <Terminal className="w-6 h-6" />,
      color: 'from-gray-400 to-gray-500',
      comingSoon: true
    }
  ];

  // Show loading spinner while checking sandbox status
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader className="w-8 h-8 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Checking Sandbox Status</h2>
          <p className="text-gray-600">Please wait while we check your development environment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/app')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-indigo-600 hover:text-indigo-700"
            aria-label="Back to chat"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Development Sandbox</h1>
            <p className="text-gray-600">Create and manage your full-stack development environment</p>
          </div>
        </div>

        {/* Real-time Development Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-emerald-900 mb-2">Live Development Environment</h3>
              <p className="text-emerald-700 leading-relaxed">
                Your sandbox features instant hot-reload capabilities. Any changes you make to your frontend or backend code 
                are automatically reflected in real-time without requiring manual builds, deployments, or server restarts. 
                Simply save your files and see the changes instantly!
              </p>
            </div>
          </div>
        </motion.div>

        {/* Minimal Login Information */}
        {sandbox && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-gray-500" />
              <div className="flex-1">
                <span className="text-sm text-gray-600">Demo credentials: </span>
                <code className="text-xs bg-white px-2 py-1 rounded border text-gray-700">demo@example.com</code>
                <span className="text-gray-400 mx-2">•</span>
                <code className="text-xs bg-white px-2 py-1 rounded border text-gray-700">demo</code>
              </div>
            </div>
          </motion.div>
        )}

        {/* Status Messages */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 font-medium">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"
            >
              <p className="text-green-600 font-medium">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!sandbox || sandbox.status === 'deleted' ? (
          /* Create Sandbox Section */
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-xl border border-white/20"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                <Code className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Coding?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Create your personal development sandbox with a full-stack environment including 
                React frontend, Django backend, and VS Code server - all ready to use in seconds!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <Globe className="w-8 h-8 text-blue-500 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">React Frontend</h3>
                  <p className="text-sm text-gray-600">Modern React app with Tailwind CSS</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <Database className="w-8 h-8 text-green-500 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">Django Backend</h3>
                  <p className="text-sm text-gray-600">Powerful API with admin panel</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                  <FileCode className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-900 mb-2">VS Code Server</h3>
                  <p className="text-sm text-gray-600">Full IDE in your browser</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200 relative">
                  <Terminal className="w-8 h-8 text-gray-400 mb-3 mx-auto" />
                  <h3 className="font-semibold text-gray-700 mb-2">Terminal Access</h3>
                  <p className="text-sm text-gray-500">Command line interface</p>
                  <div className="absolute top-2 right-2">
                    <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Soon
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={createSandbox}
                disabled={creating}
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-3">
                  {creating ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      Creating Sandbox...
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Create My Sandbox
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
            </motion.div>
          </div>
        ) : (
          /* Sandbox Management Section */
          <div className="space-y-8">
            {/* Sandbox Info & Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Sandbox</h2>
                  <p className="text-gray-600">Container: {sandbox.container_name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(sandbox.status)} ${sandbox.status === 'running' ? 'animate-pulse' : ''}`}></div>
                  <span className={`text-sm font-medium ${getStatusColor(sandbox.status).split(' ')[0]}`}>
                    {getStatusText(sandbox.status)}
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap gap-3">
                {sandbox.status === 'running' && (
                  <button
                    onClick={pauseSandbox}
                    disabled={pausing}
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {pausing ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Pause className="w-4 h-4" />
                    )}
                    {pausing ? 'Pausing...' : 'Pause'}
                  </button>
                )}

                {sandbox.status === 'paused' && (
                  <button
                    onClick={resumeSandbox}
                    disabled={resuming}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resuming ? (
                      <Loader className="w-4 h-4 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {resuming ? 'Resuming...' : 'Resume'}
                  </button>
                )}

                <button
                  onClick={resetSandbox}
                  disabled={resetting || sandbox.status === 'paused'}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetting ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <RotateCcw className="w-4 h-4" />
                  )}
                  {resetting ? 'Resetting...' : 'Reset to Default'}
                </button>

                <button
                  onClick={checkExistingSandbox}
                  className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Status
                </button>
              </div>

              {sandbox.status === 'paused' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-700 text-sm">
                    <strong>Note:</strong> Your sandbox is currently paused. Resume it to access your applications and code editor.
                  </p>
                </div>
              )}

              {checkingFrontend && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader className="w-4 h-4 text-blue-600 animate-spin" />
                    <p className="text-blue-700 text-sm">
                      <strong>Starting up:</strong> Your frontend is initializing. This usually takes 10-30 seconds...
                    </p>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Available Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sandboxActions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-300 ${
                      action.disabled 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                    }`}
                    onClick={action.disabled ? undefined : action.action}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white shadow-lg ${
                        action.disabled ? 'opacity-75' : 'group-hover:scale-110'
                      } transition-transform relative`}>
                        {action.loading && (
                          <div className="absolute inset-0 bg-white/20 rounded-xl flex items-center justify-center">
                            <Loader className="w-4 h-4 animate-spin" />
                          </div>
                        )}
                        {action.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`text-xl font-bold transition-colors ${
                            action.disabled 
                              ? 'text-gray-500' 
                              : 'text-gray-900 group-hover:text-indigo-600'
                          }`}>
                            {action.title}
                          </h3>
                          {action.title === 'View Frontend' && sandbox.status === 'running' && (
                            <div className="flex items-center gap-1">
                              {frontendReady ? (
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span className="text-xs font-medium">Ready</span>
                                </div>
                              ) : checkingFrontend ? (
                                <div className="flex items-center gap-1 text-blue-600">
                                  <Loader className="w-4 h-4 animate-spin" />
                                  <span className="text-xs font-medium">Starting...</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 text-yellow-600">
                                  <AlertCircle className="w-4 h-4" />
                                  <span className="text-xs font-medium">Waiting</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <p className={`mb-3 ${action.disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                          {action.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <ExternalLink className="w-4 h-4" />
                          <span className="truncate">{action.url}</span>
                        </div>
                        {action.title === 'View Backend Admin' && !action.disabled && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Info className="w-4 h-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Login Required</span>
                            </div>
                            <p className="text-xs text-blue-700">Use the demo credentials to access the admin panel</p>
                          </div>
                        )}
                        {action.disabled && (
                          <div className="mt-3 p-2 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500">
                              {action.title === 'View Frontend' && checkingFrontend 
                                ? 'Frontend is starting up...' 
                                : 'Available when sandbox is running'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Coming Soon Features */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200 relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg opacity-75`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-700">{feature.title}</h3>
                          <div className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Coming Soon
                          </div>
                        </div>
                        <p className="text-gray-500 mb-3">{feature.description}</p>
                        <p className="text-sm text-gray-400 italic">
                          This feature is currently in development and will be available in a future update.
                        </p>
                      </div>
                    </div>
                    
                    {/* Overlay to indicate disabled state */}
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Reset Warning */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-2">Reset Sandbox</h3>
              <p className="text-blue-700 mb-4">
                Resetting your sandbox will restore all code and data to the default state, undoing any changes you've made. 
                Your sandbox will remain active, but all customizations will be lost.
              </p>
              <p className="text-sm text-blue-600">
                Use the "Reset to Default" button above to reset your sandbox.
              </p>
            </motion.div>

            {/* Delete Sandbox */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
              <p className="text-red-700 mb-4">
                Deleting your sandbox will permanently remove all your code and data. This action cannot be undone.
              </p>
              <button
                onClick={deleteSandbox}
                disabled={deleting}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete Sandbox
                  </>
                )}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sandbox;