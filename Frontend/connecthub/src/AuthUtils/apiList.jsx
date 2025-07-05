const BASE_URL = 'http://localhost:8080';

const apiList = {
  login: `${BASE_URL}/api/auth/authenticate`,
  signup: `${BASE_URL}/api/auth/register`,
  generateOtp: `${BASE_URL}/api/auth/generateOtp/{email}`,
  verifyOtp: `${BASE_URL}/api/auth/verifyOtp/{email}/{otp}`,
  getProfileDetails: `${BASE_URL}/api/profile/getProfileDetails`,


  saveProfileDetails: `${BASE_URL}/api/profile/saveProfileDetails`,
  updateEducationDetails: `${BASE_URL}/api/profile/updateEducationDetails`,
  insertEducationDetails: `${BASE_URL}/api/profile/insertEducationDetails`,
  deleteEducationDetails: `${BASE_URL}/api/profile/deleteEducationDetails/{id}`,
  saveExperienceDetails: `${BASE_URL}/api/profile/saveExperienceDetails`,
  uploadProfile: `${BASE_URL}/api/profile/uploadProfile`,
  getProfileImage: `${BASE_URL}/api/profile/getProfileImage`,
  deleteProfileImage: `${BASE_URL}/api/profile/deleteProfileImage`,


  
};

export default apiList;
