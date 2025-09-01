import React, { useState } from 'react';
import { Plus, LogOut } from 'lucide-react';
import PostItem from './PostItem';
import Feed from './Feed'; 
import Responses from './Responses'; // Import the new Responses component
import MyListings from './MyListings';

export default function Dashboard({ user, onSignOut }) {
  const [activeTab, setActiveTab] = useState('feed');
  const [isPostItemOpen, setIsPostItemOpen] = useState(false);

  const styles = {
    container: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0b0c0eff 0%, #040404ff 100%)',
      color: '#333',
    },

    header: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },

    logo: {
  height: '55px',
  width: 'auto',
  objectFit: 'contain',
}
,

    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
    },

    navButtons: {
      display: 'flex',
      gap: '1rem',
    },

    navButton: {
      background: 'none',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      color: '#666',
    },

    activeNavButton: {
      background: 'linear-gradient(135deg, #030405ff, #0b090cff)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(6, 7, 9, 0.3)',
    },

    postButton: {
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #08080bff, #0a090bff)',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 4px 15px rgba(5, 6, 10, 0.3)',
    },

    userSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },

    userInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },

    userName: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#333',
    },

    userEmail: {
      fontSize: '0.8rem',
      color: '#666',
    },

    signOutButton: {
      background: 'none',
      border: '2px solid #e74c3c',
      color: '#e74c3c',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },

    main: {
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },

    content: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      minHeight: '600px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(10px)',
    },

    welcomeMessage: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1rem',
      textAlign: 'center',
    },

    tabContent: {
      textAlign: 'center',
      padding: '3rem 1rem',
      color: '#666',
      fontSize: '1.1rem',
    },
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Call parent sign out function
    onSignOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed currentUser={user} />; // Pass current user to Feed
      case 'responses':
        return <Responses user={user} />; // Use the new Responses component
      case 'myListings':
        return <MyListings user={user} />;
      default:
        return (
          <div style={styles.tabContent}>
            <h2>Welcome to your Dashboard!</h2>
            <p>Select a section from the navigation above to get started.</p>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img src="/logo.png" alt="Placeholder" style={styles.logo} />

        
        <nav style={styles.nav}>
          <div style={styles.navButtons}>
            <button
              style={{
                ...styles.navButton,
                ...(activeTab === 'feed' ? styles.activeNavButton : {})
              }}
              onClick={() => handleNavClick('feed')}
              onMouseEnter={(e) => {
                if (activeTab !== 'feed') {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'feed') {
                  e.target.style.background = 'none';
                  e.target.style.color = '#666';
                }
              }}
            >
              Feed
            </button>
            
            <button
              style={{
                ...styles.navButton,
                ...(activeTab === 'responses' ? styles.activeNavButton : {})
              }}
              onClick={() => handleNavClick('responses')}
              onMouseEnter={(e) => {
                if (activeTab !== 'responses') {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'responses') {
                  e.target.style.background = 'none';
                  e.target.style.color = '#666';
                }
              }}
            >
              Responses
            </button>
            
            <button
              style={{
                ...styles.navButton,
                ...(activeTab === 'myListings' ? styles.activeNavButton : {})
              }}
              onClick={() => handleNavClick('myListings')}
              onMouseEnter={(e) => {
                if (activeTab !== 'myListings') {
                  e.target.style.background = '#f0f0f0';
                  e.target.style.color = '#333';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'myListings') {
                  e.target.style.background = 'none';
                  e.target.style.color = '#666';
                }
              }}
            >
              My Listings
            </button>
          </div>
          
          <button
            style={styles.postButton}
            onClick={() => setIsPostItemOpen(true)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(10, 11, 18, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(5, 5, 7, 0.3)';
            }}
          >
            <Plus size={18} />
            Post Item
          </button>
        </nav>
        
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userName}>
              {user?.firstName} {user?.lastName}
            </div>
            <div style={styles.userEmail}>
              {user?.email}
            </div>
          </div>
          
          <button
            style={styles.signOutButton}
            onClick={handleSignOut}
            onMouseEnter={(e) => {
              e.target.style.background = '#e74c3c';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'none';
              e.target.style.color = '#e74c3c';
            }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.content}>
          <div style={styles.welcomeMessage}>
            Welcome back, {user?.firstName}!
          </div>
          {renderContent()}
        </div>
      </main>
      
      <PostItem 
        isOpen={isPostItemOpen}
        onClose={() => setIsPostItemOpen(false)}
        user={user}
        onPostSuccess={(newPost) => {
          console.log('New post created:', newPost);
          // Optionally refresh the feed or add to local state
        }}
      />
    </div>
  );
}