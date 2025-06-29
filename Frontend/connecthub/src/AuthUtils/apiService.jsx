import api from '../AuthUtils/api.jsx';
import apiList from './apiList';

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const apiService = {
  login: (data) => api.post(apiList.login, data),
  signup: (data) => api.post(apiList.signup, data),
  generateOtp: (email) => api.post(apiList.generateOtp.replace("{email}", email)),
  verifyOtp: (email, otp, signupData) =>
    api.post(
      apiList.verifyOtp.replace("{email}", email).replace("{otp}", otp),
      signupData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ),
  getProfileDetails: () => api.get(apiList.getProfileDetails, getAuthHeaders()),
};

export default apiService;
