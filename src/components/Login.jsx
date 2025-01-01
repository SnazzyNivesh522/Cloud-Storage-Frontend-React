// Login.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import Spinner from "./Spinner";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext); // Access the login handler
  const [profileLoading, setProfileLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        setProfileLoading(true);
        const response = await axios.post('/api/auth/token', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        console.log('Login response:', response);
        if (response.data.message === 'Account not verified') {
          alert('Account not verified');
          navigate('/register');
        } else {
          console.log('Logging in and navigating to dashboard');
          handleLogin(response.data.access_token); // Update auth state

          navigate('/dashboard');
        }
      } catch (error) {
        if (error.response?.status === 404 && error.response.data.detail === 'User not found') {
          alert('User not found');
          navigate('/register');
        } else {
          alert(error.response?.data?.detail || 'Login failed');
        }
      }
    } else {
      alert('Please enter both email and password.');
    }
    setProfileLoading(false);
  };

  return (
    <>
      {profileLoading && <Spinner />}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title text-center">Sign In</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="formEmail" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="formEmail"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="formPassword"
                      placeholder="Password"
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign In
                  </button>
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => navigate('/register')}
                    >
                      Don’t have an account? Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}