import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://142.93.134.108:1111';

const AccountPage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('No access token');

        const response = await axios.get(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log(response.data);
        setUserData(response.data);
      } catch (error) {
        setError(`Something went wrong ${error}`);
        await refreshAccessToken();
      }
    };

    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const response = await axios.post(`${API_BASE_URL}/refresh`, null, {
          headers: { Authorization: `Bearer ${refreshToken}` }
        });

        const { accessToken } = response.data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);

          const retryResponse = await axios.get(`${API_BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${accessToken}` }
          });

          setUserData(retryResponse.data);
        } else {
          throw new Error('Failed to refresh access token');
        }
      } catch (error) {
        console.error('Failed to refresh access token:', error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/sign-in';
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='account-container'>
      <h1>Welcome to Your Account</h1>
      <p>This is your protected account page.</p>
      {error && <p>{error}</p>}
      {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default AccountPage;
