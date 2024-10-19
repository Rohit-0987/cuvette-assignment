import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      // If token is not found, redirect to login
      navigate('/login');
    }
  }, [navigate]);
};

export default useAuth;
