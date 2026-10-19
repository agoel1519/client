import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network authentication
    setTimeout(() => {
      const cleanEmail = (email || '').trim().toLowerCase();
      if (
        (cleanEmail === 'admin@aevora.com' || cleanEmail === 'admin@aevoraclinics.com' || cleanEmail === 'admin') && 
        password === 'aevoraadmin123'
      ) {
        localStorage.setItem('aevora_admin_auth', 'true');
        if (onLogin) onLogin(true);
      } else {
        setError('Invalid credentials. Please try again.');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="premium-login-layout">
      <div className="login-visual-panel">
        <div className="visual-content">
          <div className="logo-badge">Aevora CMS</div>
          <h1>Manage your digital sanctuary.</h1>
          <p>Sign in to the unified content management system to edit pages, manage media, and configure your website.</p>
        </div>
      </div>
      
      <div className="login-form-panel">
        <div className="login-form-container">
          <div className="form-header">
            <h2>Welcome back</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit} className="premium-form">
            {error && (
              <div className="error-alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Email or Username</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aevora.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="label-row">
                <label>Password</label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner-loader"></span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="security-notice">
            <ShieldCheck size={16} />
            <span>Secure, encrypted connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
