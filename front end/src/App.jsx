import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { loginUser, logoutUser, isAuthenticated } from './auth';
import WebThreads from './WebThreads';
import './WebThreads.css';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLogin = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      loginUser();
      setIsLoggedIn(true);
      setTimeout(() => setIsTransitioning(false), 160);
    }, 180);
  };

  const handleLogout = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      logoutUser();
      setIsLoggedIn(false);
      setTimeout(() => setIsTransitioning(false), 160);
    }, 180);
  };

  const fadeStyle = {
    transition: 'opacity 0.5s ease',
    opacity: isTransitioning ? 0.2 : 1,
    pointerEvents: isTransitioning ? 'none' : 'auto',
    width: '100%',
    height: '100%',
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#000000',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      position: 'relative',
    }}>
      <div
        style={{
          ...fadeStyle,
          position: 'absolute',
          inset: 0,
          opacity: isLoggedIn ? 0 : 1,
          pointerEvents: isLoggedIn ? 'none' : 'auto',
          transition: 'opacity 0.55s ease',
        }}
      >
        <div style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box',
        }}>
          <div
            style={{
              width: '100%',
              maxWidth: '1200px',
              height: '600px',
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.36)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.45)',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <WebThreads
                color1="#59bc9b"
                color2="#ff002c"
                color3="#ad860c"
                speed={0.15}
                threadCount={7}
                frequency={4.5}
                spread={0.18}
                taper={1}
                position={0.5}
                fanMode="left"
                glow={0.02}
                falloff={0.68}
                thickness={0.9}
                brightness={0.3}
                opacity={0.84}
                mirror={true}
                shimmer
                grain={true}
                grainIntensity={0.05}
                mouseInteraction={true}
                mouseStrength={0.18}
              />
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'grid',
                gridTemplateColumns: '1.3fr 0.7fr',
                height: '100%',
                width: '100%',
                padding: '48px 56px',
                boxSizing: 'border-box',
                gap: '32px',
                alignItems: 'center',
              }}
            >
              <div style={{ maxWidth: '560px' }}>
                <p style={{
                  margin: '0 0 16px',
                  fontSize: '12px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#7ae2b4',
                  fontWeight: 700,
                }}>
                  WELCOME TO AYURVEDSATHI
                </p>
                <h1 style={{
                  margin: '0 0 18px',
                  fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                  lineHeight: 1,
                  fontWeight: 800,
                  letterSpacing: '-0.06em',
                }}>
                  Heal naturally.
                  <br />
                  Live better.
                </h1>
                <p style={{
                  margin: '0 0 28px',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.78)',
                }}>
                  Personalized Ayurvedic guidance for your wellness, diet, and daily routine.
                  Discover a healthier life with expert support tailored to you.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button style={{
                    background: '#7ae2b4',
                    color: '#07130e',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}>
                    Get Started
                  </button>
                  <button style={{
                    background: 'transparent',
                    color: '#ffffff',
                    border: '1px solid rgba(255,255,255,0.3)',
                    borderRadius: '999px',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}>
                    Learn More
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '340px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '24px',
                  padding: '28px 24px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 18px 40px rgba(0,0,0,0.35)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
                    <button style={{
                      flex: 1,
                      background: '#ffffff',
                      color: '#0e0e0e',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}>
                      Login
                    </button>
                    <button style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#ffffff',
                      border: '1px solid rgba(255,255,255,0.18)',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}>
                      Sign Up
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <input
                      placeholder="Email"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        fontSize: '0.95rem',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={handleLogin}
                      style={{
                        marginTop: '6px',
                        background: 'linear-gradient(90deg, #59bc9b, #8fe3bf)',
                        color: '#06130d',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      Continue
                    </button>
                    <p style={{
                      margin: '6px 0 0',
                      textAlign: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.85rem',
                    }}>
                      New here? <span style={{ color: '#7ae2b4', fontWeight: 700 }}>Create account</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          ...fadeStyle,
          position: 'absolute',
          inset: 0,
          opacity: isLoggedIn ? 1 : 0,
          pointerEvents: isLoggedIn ? 'auto' : 'none',
          transition: 'opacity 0.55s ease',
        }}
      >
        <Dashboard onLogout={handleLogout} />
      </div>
    </div>
  );
}
