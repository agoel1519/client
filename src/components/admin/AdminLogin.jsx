import React, { useState } from 'react';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      // Hardcoded credentials as requested
      if (username === 'admin' && password === 'aevoraadmin123') {
        localStorage.setItem('aevora_admin_auth', 'true');
        onLogin(true);
      } else {
        setError('Invalid username or password.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-login-brand">
            <h2>AEVORA</h2>
            <span>SECURE PORTAL</span>
          </div>
          <p>Please enter your credentials to access the admin dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          {error && (
            <div className="admin-login-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label>Username</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-login-submit" disabled={isLoading}>
            {isLoading ? <span className="spinner"></span> : <LogIn size={18} />}
            <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>
        
        <div className="admin-login-footer">
          <p>Aevora by Kian Clinics &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
