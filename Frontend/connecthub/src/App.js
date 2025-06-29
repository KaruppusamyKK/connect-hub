import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home/Home';
import AuthForm from './AuthPage/AuthenticationPage';
import ProtectedRoute from './AuthUtils/ProtectedRoute.jsx';
import Profile from './profile/Profile.jsx';
import { Toaster } from 'sonner';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return (
  <>
    <Toaster position="top-right" richColors closeButton />
    
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/my-profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  </>
);
}

export default App;
