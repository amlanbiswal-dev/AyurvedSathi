import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './MagicBento.css';

const defaultCards = [
  { id: 'overview', label: 'Overview', title: 'Overview', description: 'Daily wellness snapshot', color: '#120F17' },
  { id: 'profile', label: 'Profile', title: 'Profile', description: 'Personal details and preferences', color: '#120F17' },
  { id: 'medical-conditions', label: 'Medical', title: 'Medical Conditions', description: 'Current health and history', color: '#120F17' },
  { id: 'diet-plan', label: 'Diet', title: 'Diet Plan', description: 'Nutrition and Ayurvedic meals', color: '#120F17' },
  { id: 'appointments', label: 'Visits', title: 'Appointments', description: 'Clinic visits and reminders', color: '#120F17' },
  { id: 'wellness-tracker', label: 'Tracker', title: 'Wellness Tracker', description: 'Habits and progress', color: '#120F17' },
];

const MagicBento = ({
  cards = defaultCards,
  selectedId,
  onSelect,
  textAutoHide = true,
  enableBorderGlow = true,
  enableTilt = true,
  glowColor = '132, 0, 255',
  clickEffect = true,
}) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.magic-bento-card');

    const handleMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;

      // Update glow position
      card.style.setProperty('--glow-x', `${px * 100}%`);
      card.style.setProperty('--glow-y', `${py * 100}%`);

      if (enableTilt) {
        gsap.to(card, {
          rotateX: (0.5 - py) * 12,
          rotateY: (px - 0.5) * 12,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
    };

    const handleEnter = (event) => {
      const card = event.currentTarget;
      card.style.setProperty('--glow-intensity', '1');
    };

    const handleLeave = (event) => {
      const card = event.currentTarget;
      card.style.setProperty('--glow-intensity', '0');
      
      if (enableTilt) {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    items.forEach((item) => {
      item.addEventListener('mouseenter', handleEnter);
      item.addEventListener('mousemove', handleMove);
      item.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', handleEnter);
        item.removeEventListener('mousemove', handleMove);
        item.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cards, enableTilt]);

  const handleCardClick = (event, cardId) => {
    if (clickEffect) {
      gsap.fromTo(
        event.currentTarget,
        { scale: 1 },
        { scale: 0.98, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
    onSelect?.(cardId);
  };

  return (
    <div className="card-grid bento-section" ref={gridRef}>
      {cards.map((card, index) => {
        const cardId = card.id || card.title || index;
        const isActive = selectedId === cardId || (!selectedId && index === 0);

        return (
          <button
            key={cardId}
            type="button"
            className={[
              'magic-bento-card',
              textAutoHide ? 'magic-bento-card--text-autohide' : '',
              enableBorderGlow ? 'magic-bento-card--border-glow' : '',
              isActive ? 'magic-bento-card--active' : '',
            ].join(' ')}
            style={{
              backgroundColor: card.color || '#120F17',
              '--glow-color': glowColor,
              borderColor: isActive ? 'rgba(122, 226, 180, 0.75)' : undefined,
              boxShadow: isActive ? '0 0 24px rgba(122, 226, 180, 0.28)' : undefined,
            }}
            onClick={(event) => handleCardClick(event, cardId)}
          >
            <div className="magic-bento-card__header">
              <span className="magic-bento-card__label">{card.label}</span>
            </div>

            <div className="magic-bento-card__content">
              <h2 className="magic-bento-card__title">{card.title}</h2>
              <p className="magic-bento-card__description">{card.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default MagicBento;
