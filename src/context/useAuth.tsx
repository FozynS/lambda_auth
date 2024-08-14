import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://142.93.134.108:1111';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        await axios.get(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        console.error(error);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
}
