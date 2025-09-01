import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

export default function SignIn({ isOpen, onClose, onSignInSuccess, onSwitchToSignUp }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/auth/signin`, {
        email: formData.email,
        password: formData.password
      });

      // Store user data in localStorage or context
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      // Call success callback
      if (onSignInSuccess) {
        onSignInSuccess(response.data.user);
      }

      // Reset form and close modal
      setFormData({ email: '', password: '' });
      onClose();

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '1rem',
    },
    modal: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      margin:'auto'
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#666',
      transition: 'all 0.3s ease',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      background: 'linear-gradient(135deg, #030306ff, #0a070dff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: '500',
      color: '#333',
    },
    input: {
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
    },
    inputFocus: {
      borderColor: '#040507ff',
      boxShadow: '0 0 0 3px rgba(11, 12, 14, 0.1)',
    },
    submitButton: {
      padding: '1rem',
      background: 'linear-gradient(135deg, #060607ff, #050506ff)',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    error: {
      color: '#e74c3c',
      fontSize: '0.9rem',
      textAlign: 'center',
      padding: '0.5rem',
      background: '#ffeaea',
      borderRadius: '5px',
      marginTop: '1rem',
    },
    forgotPassword: {
      textAlign: 'center',
      marginTop: '1rem',
    },
    forgotPasswordLink: {
      color: '#030405ff',
      textDecoration: 'none',
      fontSize: '0.9rem',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
    divider: {
      textAlign: 'center',
      margin: '1.5rem 0',
      color: '#666',
      fontSize: '0.9rem',
    },
    signUpPrompt: {
      textAlign: 'center',
      color: '#666',
      fontSize: '0.9rem',
    },
    signUpLink: {
      color: '#010102ff',
      cursor: 'pointer',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        <button 
          style={styles.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = '#f0f0f0';
            e.target.style.color = '#333';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'none';
            e.target.style.color = '#666';
          }}
        >
          <X size={20} />
        </button>
        
        <h2 style={styles.title}>Welcome Back</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              ...styles.submitButton,
              ...(loading ? styles.submitButtonDisabled : {})
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(3, 4, 5, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          
          {error && <div style={styles.error}>{error}</div>}
          
        </form>
        
        <div style={styles.divider}>
          ─────────────────────
        </div>
        
        <div style={styles.signUpPrompt}>
          Don't have an account?{' '}
          <span 
  style={styles.signUpLink}
  onClick={() => {
    onClose();
    if (onSwitchToSignUp) onSwitchToSignUp();
  }}
  onMouseEnter={(e) => e.target.style.color = '#070709ff'}
  onMouseLeave={(e) => e.target.style.color = '#070709ff'}
>
  Sign up here
</span>
        </div>
      </div>
    </div>
  );
}