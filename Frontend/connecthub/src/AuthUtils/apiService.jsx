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
  generateOtp: (email) =>
    api.post(apiList.generateOtp.replace("{email}", email)),
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

  saveProfileDetails: (data) =>
    api.post(apiList.saveProfileDetails, data, getAuthHeaders()),

  updateEducationDetails: (data) =>
    api.post(apiList.updateEducationDetails, data, getAuthHeaders()),

  insertEducationDetails: (data) =>
    api.post(apiList.insertEducationDetails, data, getAuthHeaders()),

  deleteEducationDetails: (id) =>
  api.post(apiList.deleteEducationDetails.replace("{id}", id), null, getAuthHeaders()),


  saveExperienceDetails: (data) =>
    api.post(apiList.saveExperienceDetails, data, getAuthHeaders()),

  uploadProfile: (file) => {
    const formData = new FormData();
    formData.append("multipart", file);
    return api.post(apiList.uploadProfile, formData, {
      headers: {
        ...getAuthHeaders().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getProfileImage: () =>
  api.get(apiList.getProfileImage, getAuthHeaders()),


  deleteProfileImage: () =>
    api.post(apiList.deleteProfileImage, null, getAuthHeaders()),
};

export default apiService;
