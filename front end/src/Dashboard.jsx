import React, { useState } from 'react';
import Particles from './Particles';
import GooeyNav from './GooeyNav';
import { logoutUser } from './auth';

const navItems = [
  { label: 'Overview', href: '#overview' },
  { label: 'Profile', href: '#profile' },
  { label: 'Medical', href: '#medical' },
  { label: 'Diet', href: '#diet' },
  { label: 'Visits', href: '#visits' },
  { label: 'Tracker', href: '#tracker' },
];

const pages = {
  0: {
    id: 'overview',
    title: 'Overview',
    subtitle: 'Your daily wellness snapshot',
    cards: [
      { title: 'Today\'s Routine', value: 'Hydration + Yoga' },
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
      { title: 'Name', value: 'Aarav Sharma' },
      { title: 'Age', value: '31 years' },
      { title: 'Blood Type', value: 'O+' },
      { title: 'Lifestyle', value: 'Vegetarian · Active' },
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

export default function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState(0);

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  const activeSection = pages[activePage] || pages[0];

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: '#050505',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 24px',
      boxSizing: 'border-box',
    }}>
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

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1280px',
        margin: '0 auto',
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0 30px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div>
            <p style={{ margin: 0, color: '#7ae2b4', letterSpacing: '0.14em', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              AyurvedSathi
            </p>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>Dashboard</h2>
          </div>

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

        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <GooeyNav
            items={navItems}
            initialActiveIndex={activePage}
            onSelect={(index) => setActivePage(index)}
            animationTime={600}
            particleCount={15}
          />
        </div>

        <main style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px',
          padding: '24px',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ marginBottom: '22px' }}>
            <p style={{ margin: 0, color: '#7ae2b4', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {activeSection.title}
            </p>
            <h3 style={{ margin: '10px 0 0', fontSize: '2rem' }}>{activeSection.subtitle}</h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}>
            {activeSection.cards.map((card) => (
              <Card key={card.title} title={card.title} value={card.value} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      padding: '24px',
      minHeight: '140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{title}</p>
      <h3 style={{ margin: '12px 0 0', fontSize: '1.7rem', lineHeight: 1.3 }}>{value}</h3>
    </div>
  );
}
