import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

export default function SignUp({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      });

      setSuccess('Account created successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during signup');
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
      maxWidth: '500px',
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
      background: 'linear-gradient(135deg, #050506ff, #080609ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
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
      borderColor: '#06070aff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    row: {
      display: 'flex',
      gap: '1rem',
    },
    submitButton: {
      padding: '1rem',
      background: 'linear-gradient(135deg, #050608ff, #09090aff)',
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
    success: {
      color: '#27ae60',
      fontSize: '0.9rem',
      textAlign: 'center',
      padding: '0.5rem',
      background: '#eafaf1',
      borderRadius: '5px',
      marginTop: '1rem',
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
        
        <h2 style={styles.title}>Create Account</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={{...styles.inputGroup, flex: 1}}>
              <label style={styles.label}>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
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
            <div style={{...styles.inputGroup, flex: 1}}>
              <label style={styles.label}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
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
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
                e.target.style.boxShadow = '0 6px 20px rgba(3, 3, 4, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
}