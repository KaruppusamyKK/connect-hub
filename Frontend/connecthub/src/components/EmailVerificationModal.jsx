import React, { useState } from 'react';
import { X } from 'lucide-react';
import apiService from '../AuthUtils/apiService.jsx';
import { toast } from 'sonner';

const EmailVerificationModal = ({ onClose,email,signupData }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));

  const handleChange = (value, index) => {
    if (!/^[0-9a-zA-Z]{0,1}$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    const next = document.getElementById(`otp-${index + 1}`);
    if (value && next) next.focus();
  };

  const handleRetry = async () => {
    try {
      await apiService.resendVerification(); 
      toast.success('Verification code resent!');
    } catch (e) {
      toast.error('Failed to resend code');
    }
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length !== 6) {
      toast.error('Enter all 6 characters');
      return;
    }

    try {
      await apiService.verifyOtp(email,code,signupData);
      toast.success('Email verified successfully!');
      onClose();
    } catch (e) {
      toast.error('Invalid verification code');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative shadow-xl">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-600 mb-4">Enter the 6-digit code sent to your email.</p>

        <div className="flex justify-center gap-2 mb-5">
          {otp.map((char, idx) => (
            <input
  key={idx}
  id={`otp-${idx}`}
  type="text"
  maxLength={1}
  className="w-10 h-10 border border-gray-300 rounded text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  value={char}
  onChange={(e) => handleChange(e.target.value, idx)}
  onKeyDown={(e) => {
    if (e.key === 'Backspace') {
      if (otp[idx]) {
        const updated = [...otp];
        updated[idx] = '';
        setOtp(updated);
      } else {
        const prev = document.getElementById(`otp-${idx - 1}`);
        if (prev) prev.focus();
      }
    } else if (e.key === 'ArrowLeft') {
      const prev = document.getElementById(`otp-${idx - 1}`);
      if (prev) prev.focus();
    } else if (e.key === 'ArrowRight') {
      const next = document.getElementById(`otp-${idx + 1}`);
      if (next) next.focus();
    }
  }}
/>

          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleRetry}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Retry
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
