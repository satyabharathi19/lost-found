import React, { useState } from 'react';
import { ArrowLeft, User, Clock, MessageCircle, CheckCircle, Delete } from 'lucide-react';
import axios from 'axios';


export default function ItemDetail({ item, onBack, currentUser }) {
  const [showFoundForm, setShowFoundForm] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };
  const deleteItem = async () => {
  try {
    console.log(item._id);
    const response = await axios.delete(`http://localhost:5000/api/posts/${item._id}`);
   alert('Item deleted successfully:', response.data);
   
    // Optionally update local state or refetch data here
  } catch (error) {
    console.error('Failed to delete item:', error.response?.data || error.message);
  }
};


  const handleFoundSubmit = async (e) => {
    e.preventDefault();
    if (!securityAnswer.trim()) {
      setMessage('Please provide an answer to the security question.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/responses', {
        postId: item._id,
        postOwnerId: item.userId,
        responderId: currentUser.id,
        responderName: currentUser.firstName + ' ' + currentUser.lastName,
        responderEmail: currentUser.email,
        securityAnswer: securityAnswer.trim(),
        responseType: 'found',
        itemName: item.itemName
      });

      if (response.data.success) {
        setMessage('Your response has been sent successfully! The item owner will be notified.');
        setShowFoundForm(false);
        setSecurityAnswer('');
      }
    } catch (error) {
      console.error('Error submitting response:', error);
      setMessage(error.response?.data?.message || 'Failed to submit response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const styles = {
    container: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'none',
      border: 'none',
      color: '#060709ff',
      fontSize: '1rem',
      cursor: 'pointer',
      padding: '0.5rem 0',
      marginBottom: '1.5rem',
      transition: 'color 0.3s ease',
    },
    card: {
      background: 'white',
      borderRadius: '15px',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f0f0f0',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
    },
    itemName: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
    },
    categoryBadge: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    lostBadge: {
      background: '#fee2e2',
      color: '#dc2626',
    },
    foundBadge: {
      background: '#dcfce7',
      color: '#16a34a',
    },
    image: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '1.5rem',
    },
    description: {
      fontSize: '1.1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '1.5rem',
    },
    question: {
      background: '#f8f9ff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1.5rem',
      fontSize: '1rem',
      color: '#08080aff',
      fontWeight: '500',
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1.5rem',
      borderTop: '2px solid #f0f0f0',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '1rem',
    },
    timeStamp: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '1rem',
    },
    actionButtons: {
      display: 'flex',
      gap: '1rem',
    },
    contactButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #07070aff, #030303ff)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    foundButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #16a34a, #22c55e)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    foundForm: {
      marginTop: '2rem',
      padding: '1.5rem',
      background: '#f8f9ff',
      borderRadius: '10px',
      border: '2px solid #e0e7ff',
    },
    formTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1rem',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      fontSize: '1rem',
      fontWeight: '500',
      color: '#333',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    submitButton: {
      padding: '0.75rem 2rem',
      background: 'linear-gradient(135deg, #16a34a, #22c55e)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      marginRight: '1rem',
    },
    cancelButton: {
      padding: '0.75rem 2rem',
      background: 'none',
      color: '#666',
      border: '2px solid #e0e0e0',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    message: {
      padding: '1rem',
      borderRadius: '8px',
      marginTop: '1rem',
      background: '#dcfce7',
      color: '#16a34a',
      fontSize: '1rem',
    },
    errorMessage: {
      background: '#fee2e2',
      color: '#dc2626',
    }
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.backButton}
        onClick={onBack}
        onMouseEnter={(e) => e.target.style.color = '#050506ff'}
        onMouseLeave={(e) => e.target.style.color = '#060609ff'}
      >
        <ArrowLeft size={20} />
        Back to Feed
      </button>

      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.itemName}>{item.itemName}</h1>
          </div>
          <span style={{
            ...styles.categoryBadge,
            ...(item.category === 'lost' ? styles.lostBadge : styles.foundBadge)
          }}>
            {item.category}
          </span>
        </div>

        {item.imageUrl && (
          <img 
            src={`http://localhost:5000${item.imageUrl}`}
            alt={item.itemName}
            style={styles.image}
          />
        )}

        <p style={styles.description}>{item.description}</p>

        {item.question && (
          <div style={styles.question}>
            <strong>Security Question:</strong> {item.question}
          </div>
        )}

        <div style={styles.footer}>
          <div style={styles.userInfo}>
            <User size={18} />
            Posted by {item.userName}
          </div>

          <div style={styles.timeStamp}>
            <Clock size={18} />
            {formatDate(item.createdAt)}
          </div>

          <div style={styles.actionButtons}>
            
             {item.userId===currentUser?.id ?(
  <button
                style={{
      ...styles.foundButton,
      backgroundColor: 'red'
    }}

                onClick={() => deleteItem()}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(2, 3, 2, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <Delete size={16} />
                DeleteItem
              </button>
)
            : (
              <button
                style={styles.foundButton}
                onClick={() => setShowFoundForm(true)}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 15px rgba(2, 3, 2, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <CheckCircle size={16} />
                I Found / Lost This
              </button>
            )}
          </div>
        </div>

        {showFoundForm && (
          <div style={styles.foundForm}>
            <h3 style={styles.formTitle}>I Found / Lost This Item!</h3>
            <form onSubmit={handleFoundSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Answer the security question to prove you found this item:
                </label>
                <input
                  type="text"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Your answer..."
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = '#08090bff'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  required
                />
              </div>

              
              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    ...styles.submitButton,
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Response'}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setShowFoundForm(false);
                    setSecurityAnswer('');
                    setMessage('');
                  }}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>

            {message && (
              <div style={{
                ...styles.message,
                ...(message.includes('Failed') || message.includes('Please') ? styles.errorMessage : {})
              }}>
                {message}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}