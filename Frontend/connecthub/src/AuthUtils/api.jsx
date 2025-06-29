import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });

let requests = 0;

const api = axios.create();

const showCustomLoader = () => {
  let loader = document.getElementById('global-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.style.position = 'fixed';
    loader.style.top = 0;
    loader.style.left = 0;
    loader.style.width = '100vw';
    loader.style.height = '100vh';
    loader.style.background = 'rgba(255,255,255,0.6)';
    loader.style.display = 'flex';
    loader.style.justifyContent = 'center';
    loader.style.alignItems = 'center';
    loader.style.zIndex = 9999;

    const img = document.createElement('img');
    img.src = '/loader.svg'; 
    img.alt = 'Loading...';
    img.style.width = '60px';
    img.style.height = '60px';
    img.style.animation = 'spin 1s linear infinite';

    loader.appendChild(img);
    document.body.appendChild(loader);
  } else {
    loader.style.display = 'flex';
  }
};

const hideCustomLoader = () => {
  const loader = document.getElementById('global-loader');
  if (loader) loader.style.display = 'none';
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

api.interceptors.request.use((config) => {
  requests++;
  if (requests === 1) {
    showCustomLoader(); 
    NProgress.start();  
  }
  return config;
});

api.interceptors.response.use(
  async (response) => {
    await delay(2000);
    requests--;
    if (requests === 0) {
      hideCustomLoader();
      NProgress.done();
    }
    return response;
  },
  async (error) => {
    await delay(2000);
    requests--;
    if (requests === 0) {
      hideCustomLoader();
      NProgress.done();
    }

    const message = error?.response?.data?.message;
    if (message === "JWT token expired") {
      localStorage.removeItem("authToken"); 
      window.location.href = "/"; 
    }

    return Promise.reject(error);
  }
);

export default api;
