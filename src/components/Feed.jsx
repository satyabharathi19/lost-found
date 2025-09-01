import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, User, MessageCircle, Search } from 'lucide-react';
import ItemDetail from './ItemDetail';

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, lost, found
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [currentUser]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data.posts || []);
    } catch (err) {
      setError('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const handleBackToFeed = () => {
    setShowDetail(false);
    setSelectedItem(null);
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = filter === 'all' || post.category === filter;
    const matchesSearch = post.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const styles = {
    container: {
      padding: '2rem',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1rem',
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
    },
    searchContainer: {
      position: 'relative',
      flex: '1',
      minWidth: '250px',
    },
    searchInput: {
      width: '100%',
      padding: '0.75rem 1rem 0.75rem 3rem',
      border: '2px solid #e0e0e0',
      borderRadius: '25px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
    },
    searchIcon: {
      position: 'absolute',
      left: '1rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666',
    },
    filterButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    filterButton: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #e0e0e0',
      borderRadius: '25px',
      background: 'white',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      color: '#666',
    },
    activeFilter: {
      background: 'linear-gradient(135deg, #07080aff, #0a070cff)',
      color: 'white',
      borderColor: '#060709ff',
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '1.5rem',
    },
    postCard: {
      background: 'white',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #f0f0f0',
      cursor: 'pointer', // Make it clear it's clickable
    },
    postHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1rem',
    },
    categoryBadge: {
      padding: '0.25rem 0.75rem',
      borderRadius: '15px',
      fontSize: '0.8rem',
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
    itemName: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.5rem',
    },
    description: {
      color: '#666',
      lineHeight: '1.5',
      marginBottom: '1rem',
      // Limit description to 3 lines in card view
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    question: {
      background: '#f8f9ff',
      padding: '0.75rem',
      borderRadius: '8px',
      marginBottom: '1rem',
      fontSize: '0.9rem',
      color: '#0b0c10ff',
      fontStyle: 'italic',
      // Limit question to 2 lines in card view
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    postImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '1rem',
    },
    postFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '1rem',
      borderTop: '1px solid #f0f0f0',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.9rem',
    },
    timeStamp: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#666',
      fontSize: '0.9rem',
    },
    contactButton: {
      padding: '0.5rem 1rem',
      background: 'linear-gradient(135deg, #0c0d11ff, #08070aff)',
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
    loadingText: {
      fontSize: '1.1rem',
      color: '#666',
    },
    errorContainer: {
      textAlign: 'center',
      padding: '3rem',
      color: '#e74c3c',
    },
    noPostsContainer: {
      textAlign: 'center',
      padding: '3rem',
      color: '#666',
    },
    noPostsText: {
      fontSize: '1.1rem',
      marginBottom: '1rem',
    },
    clickHint: {
      fontSize: '0.8rem',
      color: '#050508ff',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: '0.5rem',
    }
  };

  // Show item detail if selected
  if (showDetail && selectedItem) {
    return (
      <ItemDetail 
        item={selectedItem} 
        onBack={handleBackToFeed} 
        currentUser={currentUser}
      />
    );
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingText}>Loading posts...</div>
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
      <div style={styles.header}>
        <h1 style={styles.title}>Community Feed</h1>
        
        <div style={styles.controls}>
          <div style={styles.searchContainer}>
            <Search size={18} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
              onFocus={(e) => {
                e.target.style.borderColor = '#0b0b0eff';
                e.target.style.boxShadow = '0 0 0 3px rgba(15, 16, 21, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          

          <div style={styles.filterButtons}>
            {['all', 'lost', 'found'].map((filterType) => (
              <button
                key={filterType}
                style={{
                  ...styles.filterButton,
                  ...(filter === filterType ? styles.activeFilter : {})
                }}
                onClick={() => setFilter(filterType)}
                onMouseEnter={(e) => {
                  if (filter !== filterType) {
                    e.target.style.borderColor = '#0a0b0dff';
                    e.target.style.color = '#0c0c0eff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== filterType) {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.color = '#666';
                  }
                }}
              >
                {filterType === 'all' ? 'All Items' : filterType === 'lost' ? 'Lost Items' : 'Found Items'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div style={styles.noPostsContainer}>
          <div style={styles.noPostsText}>
            {searchTerm || filter !== 'all'
              ? 'No items match your search criteria.' 
              : 'No posts yet. Be the first to post an item!'}
          </div>
        </div>
      ) : (
        <div style={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <div 
              key={post._id} 
              style={styles.postCard}
              onClick={() => handleItemClick(post)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={styles.postHeader}>
                <h3 style={styles.itemName}>{post.itemName}</h3>
                <span style={{
                  ...styles.categoryBadge,
                  ...(post.category === 'lost' ? styles.lostBadge : styles.foundBadge)
                }}>
                  {post.category}
                </span>
              </div>
              
              <p style={styles.description}>{post.description}</p>
              
              {post.question && (
                <div style={styles.question}>
                  Security Question: {post.question}
                </div>
              )}
              
              {post.imageUrl && (
                <img 
                  src={`http://localhost:5000${post.imageUrl}`}
                  alt={post.itemName}
                  style={styles.postImage}
                />
              )}
              
              <div style={styles.postFooter}>
                <div style={styles.userInfo}>
                  <User size={16} />
                  {post.userName}
                </div>
                
                <div style={styles.timeStamp}>
                  <Clock size={16} />
                  {formatDate(post.createdAt)}
                </div>
                
                
              </div>
              
              <div style={styles.clickHint}>
                Click to view details
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}