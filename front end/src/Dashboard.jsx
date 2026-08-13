import React, { useMemo, useState } from 'react';
import Particles from './Particles';
import MagicBento from './MagicBento';
import { logoutUser } from './auth';

const navItems = [
  { id: 'overview', label: 'Overview', title: 'Overview', description: 'Daily wellness snapshot', color: '#120F17' },
  { id: 'profile', label: 'Profile', title: 'Profile', description: 'Personal details and preferences', color: '#120F17' },
  { id: 'medical-conditions', label: 'Medical', title: 'Medical Conditions', description: 'Current health and history', color: '#120F17' },
  { id: 'diet-plan', label: 'Diet', title: 'Diet Plan', description: 'Nutrition and Ayurvedic meals', color: '#120F17' },
  { id: 'appointments', label: 'Visits', title: 'Appointments', description: 'Clinic visits and reminders', color: '#120F17' },
  { id: 'wellness-tracker', label: 'Tracker', title: 'Wellness Tracker', description: 'Habits and progress', color: '#120F17' },
];

export default function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('overview');

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  const activeSection = useMemo(() => {
    const pages = {
      overview: {
        title: 'Overview',
        subtitle: 'Your daily wellness snapshot',
        cards: [
          { title: 'Today’s Routine', value: 'Hydration + Yoga' },
          { title: 'Diet Plan', value: 'Balanced Ayurvedic Meals' },
          { title: 'Wellness Score', value: '86%' },
          { title: 'Appointments', value: '3 scheduled' },
        ],
      },
      profile: {
        title: 'Profile',
        subtitle: 'Personal details and wellness preferences',
        cards: [
          { title: 'Name', value: 'Aarav Sharma' },
          { title: 'Age', value: '31 years' },
          { title: 'Blood Type', value: 'O+' },
          { title: 'Lifestyle', value: 'Vegetarian · Active' },
        ],
      },
      'medical-conditions': {
        title: 'Medical Conditions',
        subtitle: 'Track your current health conditions',
        cards: [
          { title: 'Stress Level', value: 'Moderate' },
          { title: 'Sleep Quality', value: '7.5/10' },
          { title: 'Digestive Health', value: 'Improving' },
          { title: 'Follow-Up', value: 'Next week' },
        ],
      },
      'diet-plan': {
        title: 'Diet Plan',
        subtitle: 'Daily nutrition and ayurvedic balance',
        cards: [
          { title: 'Breakfast', value: 'Oats + Fruits + Almond Milk' },
          { title: 'Lunch', value: 'Seasonal greens + Lentil bowl' },
          { title: 'Dinner', value: 'Rice, soup, and steamed vegetables' },
          { title: 'Hydration', value: '2.5L goal' },
        ],
      },
      appointments: {
        title: 'Appointments',
        subtitle: 'Your scheduled wellness sessions',
        cards: [
          { title: 'Doctor Consult', value: 'Mon, 10:30 AM' },
          { title: 'Dietician Call', value: 'Wed, 2:00 PM' },
          { title: 'Yoga Session', value: 'Fri, 7:00 AM' },
          { title: 'Check-In', value: 'Sun, 9:00 AM' },
        ],
      },
      'wellness-tracker': {
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

    return pages[activePage] || pages.overview;
  }, [activePage]);

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
