
import React, { useState } from "react";
import { Search, Users, Heart } from "lucide-react";
import SignUp from "./SignUp"; // Add this line
import SignIn from './SignIn'; 
import Dashboard from './Dashboard';

export default function LostAndFoundLanding() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false); 
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleSignInSuccess = (userData) => {
  setUser(userData);
  setIsLoggedIn(true); // Add this line
  console.log('User signed in:', userData);
};
const handleSignOut = () => {
  setUser(null);
  setIsLoggedIn(false);
};
  const styles = {
    // Global styles
    container: {
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      margin: 0,
      padding: 0,
      minHeight: "100vh",
      background: "linear-gradient(135deg, #090b11ff 0%, #09070aff 100%)",
      color: "#333",
    },

    // Header styles
    header: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
      padding: "1rem 2rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },

     logo: {
  height: '55px',
  width: 'auto',

  objectFit: 'contain',
  

},

    authButtons: {
      display: "flex",
      gap: "1rem",
    },

    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "25px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      transition: "all 0.3s ease",
      textDecoration: "none",
      display: "inline-block",
      textAlign: "center",
    },

    signInBtn: {
      background: "transparent",
      color: "#050710ff",
      border: "2px solid #080911ff",
    },

    signUpBtn: {
      background: "linear-gradient(135deg, #030406ff, #070609ff)",
      color: "white",
      boxShadow: "0 4px 15px rgba(5, 7, 12, 0.3)",
    },

    // Main content styles
    main: {
      padding: "4rem 2rem",
      maxWidth: "1200px",
      margin: "0 auto",
    },

    hero: {
      textAlign: "center",
      marginBottom: "6rem",
      color: "white",
    },

    title: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      marginBottom: "1.5rem",
      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      lineHeight: "1.2",
    },

    subtitle: {
      fontSize: "1.3rem",
      marginBottom: "2rem",
      opacity: "0.9",
      maxWidth: "600px",
      margin: "0 auto 2rem",
      lineHeight: "1.6",
    },

    inspiration: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      padding: "2rem",
      marginBottom: "4rem",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },

    inspirationTitle: {
      fontSize: "2rem",
      marginBottom: "1rem",
      color: "white",
      fontWeight: "600",
    },

    inspirationText: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      opacity: "0.9",
      color: "white",
    },

    // How it works section
    howItWorks: {
      marginBottom: "4rem",
    },

    sectionTitle: {
      fontSize: "2.5rem",
      textAlign: "center",
      marginBottom: "3rem",
      color: "white",
      fontWeight: "600",
    },

    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "2rem",
    },

    card: {
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "20px",
      padding: "2rem",
      textAlign: "center",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    },

    cardIcon: {
      width: "60px",
      height: "60px",
      margin: "0 auto 1.5rem",
      padding: "15px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #07080cff, #09080aff)",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    cardTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#333",
    },

    cardDescription: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "#666",
    },

    // Footer styles
    footer: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      padding: "3rem 2rem 2rem",
      textAlign: "center",
      color: "white",
      borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    },

    footerContent: {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    footerTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
    },

    footerText: {
      opacity: "0.8",
      marginBottom: "2rem",
    },

    copyright: {
      fontSize: "0.9rem",
      opacity: "0.7",
      paddingTop: "2rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    },
  };

 return (
  <div>
    {isLoggedIn ? (
      <Dashboard 
        user={user} 
        onSignOut={handleSignOut}
      />
    ) : (
      <div style={styles.container}>
        {/* Your existing header */}
        <header style={styles.header}>
          <span>
            <img src="/logo.png" alt="Placeholder" style={styles.logo} />
            <h6>lost & Found</h6>
          </span>
          
          <div style={styles.authButtons}>
            <button 
              style={{...styles.button, ...styles.signInBtn}}
              onClick={() => setIsSignInOpen(true)}
              onMouseEnter={(e) => {
                e.target.style.background = '#08090cff';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#060709ff';
              }}
            >
              Sign In
            </button>
            <button 
              style={{...styles.button, ...styles.signUpBtn}}
              onClick={() => setIsSignUpOpen(true)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(7, 7, 8, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(14, 15, 19, 0.3)';
              }}
            >
              Sign Up
            </button>
          </div>
        </header>

        {/* Your existing main content */}
        <main style={styles.main}>
          {/* All your existing hero, inspiration, and how it works sections */}
          <section style={styles.hero}>
            <h1 style={styles.title}>Lost It ! </h1>
            <h1 style={styles.title}>Search It & Found It!!</h1>
            <p style={styles.subtitle}>
              A community-driven platform that bridges the gap between lost items and their rightful owners, 
              making the world a little more connected, one found item at a time.
            </p>
          </section>

          <section style={styles.inspiration}>
            <h2 style={styles.inspirationTitle}>Our Inspiration</h2>
            <p style={styles.inspirationText}>
              Colleges are the place where we come to home mentioning about losing our new earphone which might have kept in a desk but not sure if it's still there. This problem feels so relatable to most of the college students. A problem will still remain the same until someone builds a solution to it.
              Every day, thousands of valuable items are lost and found across our communities. From a child's 
              beloved toy to important documents, from lost pets to forgotten belongings - each item carries 
              emotional value that goes beyond its material worth. We believe that technology can help bridge 
              the gap between those who have lost something precious and those kind souls who find and want 
              to return it. Our platform was born from the simple yet powerful idea that most people want to 
              do the right thing, they just need an easy way to connect.
            </p>
          </section>

          <section style={styles.howItWorks}>
            <h2 style={styles.sectionTitle}>How It Works</h2>
            <div style={styles.cardsContainer}>
              {/* Your existing three cards */}
              <div 
                style={styles.card}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                <div style={styles.cardIcon}>
                  <Search size={30} />
                </div>
                <h3 style={styles.cardTitle}>Report Lost Items</h3>
                <p style={styles.cardDescription}>
                  Easily report lost items with detailed descriptions and photos, or search through 
                  found items in your area. Our smart matching system helps connect the dots between 
                  lost and found posts.
                </p>
              </div>

              <div 
                style={styles.card}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                <div style={styles.cardIcon}>
                  <Users size={30} />
                </div>
                <h3 style={styles.cardTitle}>Find Items</h3>
                <p style={styles.cardDescription}>
                  Join a network of helpful community members who actively participate in reuniting 
                  lost items with their owners. Message, coordinate meetups, and build trust through 
                  our secure communication system.
                </p>
              </div>

              <div 
                style={styles.card}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-10px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                <div style={styles.cardIcon}>
                  <Heart size={30} />
                </div>
                <h3 style={styles.cardTitle}>Get Notified</h3>
                <p style={styles.cardDescription}>
                  Experience the joy of successful reunions! Our platform facilitates safe exchanges 
                  and celebrates every success story. Track your positive impact and be part of 
                  countless heartwarming moments.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Your existing footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <h3 style={styles.footerTitle}>Lost & Found</h3>
            <p style={styles.footerText}>
              Building stronger communities through the simple act of helping others find what they've lost.
            </p>
            <div style={styles.copyright}>
              © 2025 Lost & Found. Made with ❤️ for the community.
            </div>
          </div>
        </footer>

        {/* Modals */}
        <SignUp 
          isOpen={isSignUpOpen} 
          onClose={() => setIsSignUpOpen(false)}
          onSwitchToSignIn={() => {
            setIsSignUpOpen(false);
            setIsSignInOpen(true);
          }}
        />
        <SignIn 
          isOpen={isSignInOpen} 
          onClose={() => setIsSignInOpen(false)} 
          onSignInSuccess={handleSignInSuccess}
          onSwitchToSignUp={() => {
            setIsSignInOpen(false);
            setIsSignUpOpen(true);
          }}
        />
      </div>
    )}
  </div>
);
}
