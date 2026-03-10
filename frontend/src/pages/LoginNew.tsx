import React, { useState } from 'react';
import { ErrorMessage, Field, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'sonner';
import { useLoginUserMutation } from '../provider/queries/Auth.query';
import { Button } from '../components/ui/Button';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

interface LoginFormValues {
  token: string;
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [LoginUser, { isLoading }] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    token: '',
    email: '',
    password: '',
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .required('Password is required'),
  });

  const onSubmitHandler = async (
    values: LoginFormValues,
    { resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const { data, error }: any = await LoginUser(values);
      
      if (error) {
        toast.error(error.data?.message || 'Login failed. Please try again.');
        return;
      }

      localStorage.setItem('token', data.token);
      toast.success('Welcome back! Redirecting to dashboard...');
      resetForm();
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Billing Software</h1>
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Manage your business<br />with confidence
          </h2>
          <p className="text-purple-200 text-lg max-w-md">
            Track orders, manage inventory, and handle customers all in one powerful platform.
          </p>
          <div className="flex items-center gap-8 pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.5%</p>
              <p className="text-purple-200 text-sm">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-purple-200 text-sm">API Endpoints</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-purple-200 text-sm">Support</p>
            </div>
          </div>
        </div>
        <p className="text-purple-300 text-sm">
          © 2024 Billing Software. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center">
            <h1 className="text-2xl font-bold text-purple-600">Billing Software</h1>
          </div>

          {/* Header */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandler}
          >
            {({ values, setFieldValue, handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-1.5 text-sm text-red-500"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5" />
                      ) : (
                        <FiEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="mt-1.5 text-sm text-red-500"
                  />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </span>
                  </label>
                  <Link
                    to="#"
                    className="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey={import.meta.env.VITE_SITE_KEY}
                    onChange={(e) => setFieldValue('token', e)}
                    theme="light"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!values.token}
                  loading={isLoading}
                  fullWidth
                  size="lg"
                >
                  Sign in
                </Button>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400"
                  >
                    Create one now
                  </Link>
                </p>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
