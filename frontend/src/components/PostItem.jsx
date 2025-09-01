import React, { useState } from 'react';
import axios from 'axios';
import { X, Upload } from 'lucide-react';

export default function PostItem({ isOpen, onClose, user, onPostSuccess }) {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    question: '',
    category: 'lost',
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        file: file
      });
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setFilePreview(e.target.result);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('itemName', formData.itemName);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('question', formData.question);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('userId', user.id);
      formDataToSend.append('userName', `${user.firstName} ${user.lastName}`);
      formDataToSend.append('userEmail', user.email);
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/posts`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Item posted successfully!');
      
      // Reset form
      setFormData({
        itemName: '',
        description: '',
        question: '',
        category: 'lost',
        file: null
      });
      setFilePreview(null);
      
      // Call success callback to refresh feed
      if (onPostSuccess) {
        onPostSuccess(response.data.post);
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while posting');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      itemName: '',
      description: '',
      question: '',
      category: 'lost',
      file: null
    });
    setFilePreview(null);
    setError('');
    setSuccess('');
    onClose();
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
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
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
      background: 'linear-gradient(135deg, #07070aff, #0d0c0eff)',
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
    textarea: {
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical',
    },
    select: {
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      outline: 'none',
      background: 'white',
    },
    inputFocus: {
      borderColor: '#060709ff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
    },
    fileUpload: {
      position: 'relative',
    },
    fileInput: {
      display: 'none',
    },
    fileButton: {
      padding: '0.75rem',
      border: '2px dashed #060709ff',
      borderRadius: '10px',
      cursor: 'pointer',
      textAlign: 'center',
      color: '#050608ff',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
    },
    filePreview: {
      marginTop: '1rem',
      textAlign: 'center',
    },
    previewImage: {
      maxWidth: '200px',
      maxHeight: '200px',
      borderRadius: '10px',
      objectFit: 'cover',
    },
    fileName: {
      marginTop: '0.5rem',
      fontSize: '0.9rem',
      color: '#666',
    },
    submitButton: {
      padding: '1rem',
      background: 'linear-gradient(135deg, #0c0d10ff, #070608ff)',
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
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div style={styles.modal}>
        <button 
          style={styles.closeButton}
          onClick={handleClose}
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
        
        <h2 style={styles.title}>Post an Item</h2>
        
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Item Name *</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
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
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={styles.textarea}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="Provide detailed description..."
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Security Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              placeholder="e.g., What color is the item?"
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={styles.select}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
              required
            >
              <option value="lost">Lost Item</option>
              <option value="found">Found Item</option>
            </select>
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Upload Photo</label>
            <div style={styles.fileUpload}>
              <input
                type="file"
                id="file-input"
                style={styles.fileInput}
                onChange={handleFileChange}
                accept="image/*"
              />
              <label 
                htmlFor="file-input" 
                style={styles.fileButton}
                onMouseEnter={(e) => {
                  e.target.style.background = '#f8f9ff';
                  e.target.style.borderColor = '#0a0a0bff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.borderColor = '#040405ff';
                }}
              >
                <Upload size={24} />
                {formData.file ? 'Change Photo' : 'Choose Photo'}
              </label>
              
              {filePreview && (
                <div style={styles.filePreview}>
                  <img src={filePreview} alt="Preview" style={styles.previewImage} />
                </div>
              )}
              
              {formData.file && (
                <div style={styles.fileName}>
                  Selected: {formData.file.name}
                </div>
              )}
            </div>
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
                e.target.style.boxShadow = '0 6px 20px rgba(7, 7, 9, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? 'Posting...' : 'Post Item'}
          </button>
          
          {error && <div style={styles.error}>{error}</div>}
          {success && <div style={styles.success}>{success}</div>}
        </form>
      </div>
    </div>
  );
}