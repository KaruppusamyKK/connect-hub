const BASE_URL = 'http://localhost:8080';

const apiList = {
  login: `${BASE_URL}/api/auth/authenticate`,
  signup: `${BASE_URL}/api/auth/register`,
  generateOtp: `${BASE_URL}/api/auth/generateOtp/{email}`,
  verifyOtp: `${BASE_URL}/api/auth/verifyOtp/{email}/{otp}`,
  getProfileDetails: `${BASE_URL}/api/profile/getProfileDetails`,

  
};

export default apiList;
