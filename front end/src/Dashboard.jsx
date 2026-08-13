import React, { useState, useEffect } from 'react';
import Particles from './Particles';
import GooeyNav from './GooeyNav';
import PageFadeContent from './PageFadeContent';
import BorderGlow from './BorderGlow';
import { logoutUser } from './auth';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Profile', href: '#profile' },
  { label: 'Medical', href: '#medical' },
  { label: 'Diet', href: '#diet' },
  { label: 'Visits', href: '#visits' },
  { label: 'Tracker', href: '#tracker' },
];

const initialPages = {
  0: {
    id: 'overview',
    title: 'Overview',
    subtitle: 'Your daily wellness snapshot',
    cards: [
      { title: "Today's Routine", value: 'Hydration + Yoga' },
      { title: 'Diet Plan', value: 'Balanced Ayurvedic Meals' },
      { title: 'Wellness Score', value: '86%' },
      { title: 'Appointments', value: '3 scheduled' },
    ],
  },
  1: {
    id: 'profile',
    title: 'Profile',
    subtitle: 'Personal details and wellness preferences',
    cards: [
      { title: 'Name', value: 'Aarav Sharma', key: 'name' },
      { title: 'Age', value: '31 years', key: 'age' },
      { title: 'Gender', value: 'Male', key: 'gender' },
      { title: 'Weight', value: '70 kg', key: 'weight' },
      { title: 'Height', value: '175 cm', key: 'height' },
      { title: 'Blood Type', value: 'O+', key: 'bloodType' },
      { title: 'Lifestyle', value: 'Vegetarian · Active', key: 'lifestyle' },
    ],
  },
  2: {
    id: 'medical',
    title: 'Medical Conditions',
    subtitle: 'Track your current health conditions',
    cards: [
      { title: 'Stress Level', value: 'Moderate' },
      { title: 'Sleep Quality', value: '7.5/10' },
      { title: 'Digestive Health', value: 'Improving' },
      { title: 'Follow-Up', value: 'Next week' },
    ],
  },
  3: {
    id: 'diet',
    title: 'Diet Plan',
    subtitle: 'Daily nutrition and ayurvedic balance',
    cards: [
      { title: 'Breakfast', value: 'Oats + Fruits + Almond Milk' },
      { title: 'Lunch', value: 'Seasonal greens + Lentil bowl' },
      { title: 'Dinner', value: 'Rice, soup, and steamed vegetables' },
      { title: 'Hydration', value: '2.5L goal' },
    ],
  },
  4: {
    id: 'visits',
    title: 'Appointments',
    subtitle: 'Your scheduled wellness sessions',
    cards: [
      { title: 'Doctor Consult', value: 'Mon, 10:30 AM' },
      { title: 'Dietician Call', value: 'Wed, 2:00 PM' },
      { title: 'Yoga Session', value: 'Fri, 7:00 AM' },
      { title: 'Check-In', value: 'Sun, 9:00 AM' },
    ],
  },
  5: {
    id: 'tracker',
    title: 'Wellness Tracker',
    subtitle: 'Consistency and health habits',
    cards: [
      { title: 'Daily Steps', value: '8,200' },
      { title: 'Meditation', value: '20 mins' },
      { title: 'Exercise', value: '4 days/week' },
      { title: 'Mood', value: 'Positive' },
    ],
  },
};

export default function AppContainer({ onLogout, onNavigate }) {
  const [activeTopNav, setActiveTopNav] = useState('dashboard');
  const [activePage, setActivePage] = useState(0);

  const [pagesData, setPagesData] = useState(() => {
    const savedProfileCards = localStorage.getItem('ayurved_profile_cards');
    if (savedProfileCards) {
      try {
        const parsedCards = JSON.parse(savedProfileCards);
        return {
          ...initialPages,
          1: {
            ...initialPages[1],
            cards: parsedCards,
          },
        };
      } catch (err) {
        console.error('Failed to parse saved profile data:', err);
      }
    }
    return initialPages;
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState(pagesData[1].cards);

  useEffect(() => {
    setEditFormData(pagesData[1].cards);
  }, [pagesData]);

  const handleLogout = () => {
    if (typeof logoutUser === 'function') logoutUser();
    if (typeof onLogout === 'function') onLogout();
  };

  const handleTopNavClick = (navKey) => {
    setActiveTopNav(navKey);
    if (typeof onNavigate === 'function') {
      onNavigate(navKey);
    }
  };

  const handleProfileInputChange = (index, newValue) => {
    const updatedForm = [...editFormData];
    updatedForm[index] = { ...updatedForm[index], value: newValue };
    setEditFormData(updatedForm);
  };

  const handleSaveProfile = () => {
    setPagesData((prev) => ({
      ...prev,
      1: {
        ...prev[1],
        cards: editFormData,
      },
    }));

    localStorage.setItem('ayurved_profile_cards', JSON.stringify(editFormData));
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setEditFormData(pagesData[1].cards);
    setIsEditingProfile(false);
  };

  const activeSection = pagesData[activePage] || pagesData[0];
  const isProfileTab = activePage === 1;

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#050505',
        color: '#ffffff',
        fontFamily: 'Arial, sans-serif',
        padding: '40px 24px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Particles
          particleColors={['#ffffff']}
          particleCount={180}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Header with Top Nav */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0 30px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                color: '#7ae2b4',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontSize: '0.72rem',
              }}
            >
              AyurvedSathi
            </p>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>
              {activeTopNav === 'home' && 'Welcome Home'}
              {activeTopNav === 'dashboard' && 'Dashboard'}
              {activeTopNav === 'new-feature' && 'Explore Features'}
            </h2>
          </div>

          {/* Top Navbar */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <button
              onClick={() => handleTopNavClick('home')}
              style={{
                background: activeTopNav === 'home' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: activeTopNav === 'home' ? '#7ae2b4' : '#a1a1aa',
                border: 'none',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: activeTopNav === 'home' ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Home
            </button>

            <button
              onClick={() => handleTopNavClick('dashboard')}
              style={{
                background: activeTopNav === 'dashboard' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: activeTopNav === 'dashboard' ? '#7ae2b4' : '#a1a1aa',
                border: 'none',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: activeTopNav === 'dashboard' ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Dashboard
            </button>

            <button
              onClick={() => handleTopNavClick('new-feature')}
              style={{
                background: activeTopNav === 'new-feature' ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: activeTopNav === 'new-feature' ? '#7ae2b4' : '#a1a1aa',
                border: 'none',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '0.9rem',
                fontWeight: activeTopNav === 'new-feature' ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Features ✦
            </button>
          </nav>

          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              borderRadius: '999px',
              padding: '10px 18px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </header>

        {/* --- DYNAMIC VIEW RENDERING --- */}
        {activeTopNav === 'home' && <HomePage onGoToDashboard={() => setActiveTopNav('dashboard')} />}

        {activeTopNav === 'new-feature' && <NewFeaturePage />}

        {activeTopNav === 'dashboard' && (
          <>
            <div style={{ marginTop: '40px', marginBottom: '40px' }}>
              <GooeyNav
                items={navItems}
                initialActiveIndex={activePage}
                onSelect={(index) => {
                  setActivePage(index);
                  if (isEditingProfile) handleCancelEdit();
                }}
                animationTime={600}
                particleCount={15}
              />
            </div>

            {/* Dashboard Sub-Section Content */}
            <PageFadeContent key={activePage} duration={400} ease="power2.out" initialOpacity={0}>
              <div
                style={{
                  padding: '32px',
                  borderRadius: '24px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  style={{
                    marginBottom: '28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        color: '#7ae2b4',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {activeSection.title}
                    </p>
                    <h3 style={{ margin: '10px 0 0', fontSize: '2rem' }}>
                      {activeSection.subtitle}
                    </h3>
                  </div>

                  {isProfileTab && (
                    <div>
                      {!isEditingProfile ? (
                        <button
                          onClick={() => setIsEditingProfile(true)}
                          style={{
                            background: '#7ae2b4',
                            color: '#050505',
                            border: 'none',
                            borderRadius: '999px',
                            padding: '10px 20px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                          }}
                        >
                          Edit Profile
                        </button>
                      ) : (
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            onClick={handleCancelEdit}
                            style={{
                              background: 'rgba(255,255,255,0.1)',
                              color: '#fff',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '999px',
                              padding: '10px 18px',
                              cursor: 'pointer',
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            style={{
                              background: '#7ae2b4',
                              color: '#050505',
                              border: 'none',
                              borderRadius: '999px',
                              padding: '10px 20px',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                            }}
                          >
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Grid for Cards */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '20px',
                  }}
                >
                  {isProfileTab && isEditingProfile
                    ? editFormData.map((card, idx) => (
                        <EditCard
                          key={card.title || idx}
                          activePage={activePage}
                          title={card.title}
                          value={card.value}
                          onChange={(val) => handleProfileInputChange(idx, val)}
                        />
                      ))
                    : activeSection.cards.map((card, idx) => (
                        <Card
                          key={card.title || idx}
                          activePage={activePage}
                          title={card.title}
                          value={card.value}
                        />
                      ))}
                </div>
              </div>
            </PageFadeContent>
          </>
        )}
      </div>
    </div>
  );
}

// Custom Home Page View Component
function HomePage({ onGoToDashboard }) {
  return (
    <div style={{ marginTop: '50px', textAlign: 'center', padding: '40px 20px' }}>
      <PageFadeContent key="home" duration={400} ease="power2.out" initialOpacity={0}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Harmonize Your Life with AyurvedSathi</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 32px' }}>
          Discover personalized holistic remedies, track your wellness progress, and achieve natural mind-body balance.
        </p>
        <button
          onClick={onGoToDashboard}
          style={{
            background: '#7ae2b4',
            color: '#050505',
            border: 'none',
            borderRadius: '999px',
            padding: '14px 32px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Open Dashboard →
        </button>
      </PageFadeContent>
    </div>
  );
}

// Custom New Feature View Component
function NewFeaturePage() {
  return (
    <div style={{ marginTop: '50px', padding: '20px' }}>
      <PageFadeContent key="feature" duration={400} ease="power2.out" initialOpacity={0}>
        <div
          style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <h2 style={{ fontSize: '2rem', marginTop: 0 }}>AI Health Assistant</h2>
          <p style={{ color: '#7ae2b4', margin: '0 0 20px' }}>Ask questions based on your Ayurvedic Profile</p>
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: '200px',
            }}
          >
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Your personalized AI recommendations will appear here...</p>
          </div>
        </div>
      </PageFadeContent>
    </div>
  );
}

// Border-only Glowing Tile Component
function Card({ title, value, activePage }) {
  return (
    <BorderGlow
      key={activePage}
      animated={true}
      borderRadius={20}
      backgroundColor="transparent"
      glowColor="160 65 68"
      colors={['#7ae2b4', '#38bdf8', '#c084fc']}
      edgeSensitivity={30}
      glowRadius={15}
    >
      <div
        style={{
          padding: '24px',
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '20px',
          background: '#0a0a0a',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{title}</p>
        <h3 style={{ margin: '12px 0 0', fontSize: '1.7rem', lineHeight: 1.3 }}>{value}</h3>
      </div>
    </BorderGlow>
  );
}

// Border-only Editable Tile Component
function EditCard({ title, value, onChange, activePage }) {
  return (
    <BorderGlow
      key={activePage}
      animated={true}
      borderRadius={20}
      backgroundColor="transparent"
      glowColor="160 65 68"
      colors={['#7ae2b4', '#f472b6', '#38bdf8']}
      glowIntensity={3}
      glowRadius={30}
    >
      <div
        style={{
          padding: '20px',
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRadius: '20px',
          background: '#0d0d0d',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ margin: 0, color: '#7ae2b4', fontSize: '0.85rem', textTransform: 'uppercase' }}>
          {title}
        </p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            marginTop: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            padding: '10px 12px',
            color: '#ffffff',
            fontSize: '1rem',
            outline: 'none',
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
      </div>
    </BorderGlow>
  );
}