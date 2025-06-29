import React, { useState } from 'react';
import apiService from '../AuthUtils/apiService.jsx';
import socialNetworking from '../assets/undraw_social-networking_v4z1.svg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EmailVerificationModal from '../components/EmailVerificationModal.jsx';
import { Eye, EyeOff } from 'lucide-react';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [errors, setErrors] = useState({});
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [signupData, setSignupData] = useState({});
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = () => {
    const errs = {};
    if (!formData.email.includes('@')) errs.email = 'Enter a valid email';
    if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!isLogin && formData.username.trim() === '') errs.username = 'Username is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    if (isLogin) {
      const response = await apiService.login({
        email: formData.email,
        password: formData.password,
      });

      console.log(response.data.token);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('username', response.data.username);
      window.location.href = '/home';

    } else {
      
      await apiService.signup(formData);
      toast.success('Signup successful!');

      
      const loginResponse = await apiService.login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('authToken', loginResponse.data.token);
      localStorage.setItem('username', loginResponse.data.username);
      toast.success('Logged in successfully!');
      window.location.href = '/home';
    }
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    const message = error?.response?.data?.error || "Something went wrong";
    toast.error(message);
  }
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="py-6 w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 items-center gap-6">
          <div className="border border-slate-300 rounded-lg p-6 max-w-md w-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] mx-auto">
            <div className="mb-6 flex justify-center gap-4">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-md font-medium ${isLogin ? 'bg-[#1f2a38] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-md font-medium ${!isLogin ? 'bg-[#1f2a38] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Signup
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h1 className="text-slate-900 text-3xl font-semibold mb-1">{isLogin ? 'Sign In' : 'Register'}</h1>
                <p className="text-slate-600 text-[15px] mt-2 leading-relaxed">
                  {isLogin
                    ? 'Sign in to your account and explore a world of possibilities.'
                    : 'Create your account to get started.'}
                </p>
              </div>
              {!isLogin && (
                <div>
                  <label className="text-sm font-medium block mb-1 text-slate-900">Username</label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border border-slate-300 px-4 py-3 rounded-lg text-sm text-slate-900"
                    placeholder="Enter username"
                  />
                  {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                </div>
              )}
              <div>
                <label className="text-sm font-medium block mb-1 text-slate-900">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg text-sm text-slate-900"
                  placeholder="Enter email"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="relative">
                <label className="text-sm font-medium block mb-1 text-slate-900">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border border-slate-300 px-4 py-3 rounded-lg text-sm text-slate-900 pr-12"
                  placeholder="Enter password"
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-[38px] cursor-pointer text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="text-center text-lg font-medium my-2">
                {isLogin ? 'Welcome Back !!!' : 'Not a user? Sign up here.'}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-[#1f2a38]"
              >
                {isLogin ? 'Sign In' : 'Register'}
              </button>
            </form>
          </div>

          <div className="max-lg:mt-8">
            <img
              src={socialNetworking}
              className="w-full aspect-[71/50] max-lg:w-4/5 mx-auto block object-cover"
              alt="login"
            />

          </div>
        </div>
      </div>

      {showVerifyModal && (
        <EmailVerificationModal onClose={() => setShowVerifyModal(false)} email={signupEmail} signupData={signupData} />
      )}
    </div>
  );
};

export default AuthForm;
