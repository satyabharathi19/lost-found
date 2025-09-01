import React, { useState, useEffect } from 'react';
import { Clock, User, MessageCircle, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import axios from 'axios';

export default function Responses({ user, viewType = 'responder' }) {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (viewType === 'responder') {
      fetchMyResponses();
    } 
  }, [user, viewType]);

const fetchMyResponses = async () => {
  try {
    setLoading(true);
    console.log('Fetching responses for user ID:', user.id);
    console.log('API URL:', `http://localhost:5000/api/responses/responder/${user.id}`);
    
    const response = await axios.get(`http://localhost:5000/api/responses/responder/${user.id}`);
    
    console.log('API Response:', response.data);
    console.log('Responses received:', response.data.responses);
    
    setResponses(response.data.responses || []);
  } catch (err) {
    setError('Failed to load responses');
    console.error('Error fetching responses:', err);
    console.error('Error details:', err.response?.data);
  } finally {
    setLoading(false);
  }
};
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Function to get status message for responder
  const getResponderStatusMessage = (status) => {
    switch (status) {
      case 'accepted':
        return {
          message: "🎉 Great news! You are correct - this was the item the owner needed! The owner is in the process of approaching you. Check your contact details below.",
          color: '#16a34a',
          bgColor: '#dcfce7',
          icon: <CheckCircle size={20} style={{ color: '#16a34a' }} />
        };
      case 'rejected':
        return {
          message: "❌ Unfortunately, this wasn't the correct item the owner was looking for. Thank you for trying to help!",
          color: '#dc2626',
          bgColor: '#fee2e2',
          icon: <XCircle size={20} style={{ color: '#dc2626' }} />
        };
      case 'pending':
        return {
          message: "⏳ Your response is under review. The owner will verify your security answer and get back to you soon.",
          color: '#d97706',
          bgColor: '#fef3c7',
          icon: <Clock size={20} style={{ color: '#d97706' }} />
        };
      default:
        return {
          message: "Your response has been submitted.",
          color: '#666',
          bgColor: '#f5f5f5',
          icon: <AlertCircle size={20} style={{ color: '#666' }} />
        };
    }
  };

  const styles = {
    container: {
      padding: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '2rem',
    },
    responsesGrid: {
      display: 'grid',
      gap: '1.5rem',
    },
    responseCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      border: '1px solid #f0f0f0',
      transition: 'all 0.3s ease',
    },
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
    },
    itemInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    itemName: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
    },
    statusBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontSize: '0.8rem',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    pendingBadge: {
      background: '#fef3c7',
      color: '#d97706',
    },
    acceptedBadge: {
      background: '#dcfce7',
      color: '#16a34a',
    },
    rejectedBadge: {
      background: '#fee2e2',
      color: '#dc2626',
    },
    responderInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    securityAnswer: {
      background: '#f8f9ff',
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
    },
    answerLabel: {
      fontSize: '0.9rem',
      color: '#667eea',
      fontWeight: '500',
      marginBottom: '0.5rem',
    },
    answerText: {
      fontSize: '1rem',
      color: '#333',
      fontWeight: '500',
    },
    // New style for status message
    statusMessage: {
      padding: '1rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '0.95rem',
      fontWeight: '500',
      lineHeight: '1.5',
    },
    responseFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #f0f0f0',
    },
    timestamp: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.9rem',
    },
    actionButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    acceptButton: {
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #16a34a, #22c55e)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    rejectButton: {
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #dc2626, #ef4444)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    contactButton: {
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #09090bff, #0a090bff)',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '3rem',
    },
    noResponsesContainer: {
      textAlign: 'center',
      padding: '3rem',
      color: '#666',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '3rem',
      color: '#e74c3c',
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading responses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {viewType === 'responder' ? 'My Responses' : 'Responses to Your Posts'}
      </h1>
      
      {responses.length === 0 ? (
        <div style={styles.noResponsesContainer}>
          <AlertCircle size={48} style={{ marginBottom: '1rem', color: '#ccc' }} />
          <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No responses yet</div>
          <div style={{ color: '#999' }}>
            {viewType === 'responder' 
              ? 'Your responses to found items will appear here.'
              : 'When people respond to your lost items, they\'ll appear here.'
            }
          </div>
        </div>
      ) : (
        <div style={styles.responsesGrid}>
          {responses.map((response) => {
            const statusInfo = viewType === 'responder' ? getResponderStatusMessage(response.status) : null;
            
            return (
              <div 
                key={response._id} 
                style={styles.responseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={styles.cardHeader}>
                  <div style={styles.itemInfo}>
                    <div style={styles.itemName}>{response.itemName}</div>
                  </div>
                  <span style={{
                    ...styles.statusBadge,
                    ...(response.status === 'pending' ? styles.pendingBadge : 
                        response.status === 'accepted' ? styles.acceptedBadge : 
                        styles.rejectedBadge)
                  }}>
                    {response.status}
                  </span>
                </div>

                <div style={styles.responderInfo}>
                  <User size={16} />
                  {viewType === 'responder' 
                    ? `Response to ${response.ownerName || 'Owner'}`
                    : `Response from ${response.responderName}`
                  }
                </div>

                {/* Status message for responder */}
                {viewType === 'responder' && statusInfo && (
                  <div style={{
                    ...styles.statusMessage,
                    backgroundColor: statusInfo.bgColor,
                    color: statusInfo.color,
                  }}>
                    {statusInfo.icon}
                    <span>{statusInfo.message}</span>
                  </div>
                )}

                <div style={styles.securityAnswer}>
                  <div style={styles.answerLabel}>Security Question Answer:</div>
                  <div style={styles.answerText}>"{response.securityAnswer}"</div>
                </div>

                <div style={styles.responseFooter}>
                  <div style={styles.timestamp}>
                    <Clock size={16} />
                    {formatDate(response.createdAt)}
                  </div>

                  <div style={styles.actionButtons}>
                    {/* Accept/Reject buttons only for owner and pending responses */}
                    {viewType === 'owner' && response.status === 'pending' && (
                      <>
                        <button
                          style={styles.acceptButton}
                          onClick={() => handleAcceptResponse(response._id)}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 15px rgba(22, 163, 74, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <CheckCircle size={14} />
                          Accept (Answer is Correct)
                        </button>
                        
                        <button
                          style={styles.rejectButton}
                          onClick={() => handleRejectResponse(response._id)}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <XCircle size={14} />
                          Reject (Wrong Answer)
                        </button>
                      </>
                    )}
                    
                    {/* Contact button - available for accepted responses or responder view */}
                    {(response.status === 'accepted' ) && (
                      <button
                        style={styles.contactButton}
                        onClick={() => alert(`Contact ${viewType === 'responder' ? response.ownerName : response.responderName} at ${viewType === 'responder' ? response.ownerEmail : response.responderEmail}`)}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <MessageCircle size={14} />
                        Contact {viewType === 'responder' ? 'Owner' : 'Responder'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}