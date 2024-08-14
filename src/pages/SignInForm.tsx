import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://142.93.134.108:1111';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { accessToken, refreshToken } = response.data;
      console.log(response);
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        window.location.href = '/me';
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError('Login failed: ' + (err as Error).message);
    }
  };

  return (
    <div className='form-container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account? <a href="/sign-up">Sign Up</a></p>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default SignInForm;
