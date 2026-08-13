import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PageFadeContent = ({
  children,
  blur = false,
  duration = 500,
  ease = 'power3.out',
  initialOpacity = 0,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getSeconds = val => (typeof val === 'number' && val > 10 ? val / 1000 : val);
    const dur = getSeconds(duration);

    // Create a GSAP Context for proper cleanup
    const ctx = gsap.context(() => {
      // 1. Animate the outer page wrapper (Fade + Slide Up + Scale Up)
      gsap.fromTo(
        el,
        {
          autoAlpha: initialOpacity,
          y: 20,
          scale: 0.98,
          filter: blur ? 'blur(10px)' : 'blur(0px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: dur,
          ease: ease,
          onComplete: () => {
            gsap.set(el, { clearProps: 'filter,willChange' });
          },
        }
      );

      // 2. Add a dynamic staggered entrance for the inner cards
      const cards = el.querySelectorAll('.grid > div, form > div');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 15 },
          {
            autoAlpha: 1,
            y: 0,
            duration: dur * 0.8,
            stagger: 0.06, // Each card pops in slightly after the previous one
            ease: 'power2.out',
            delay: 0.1,
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [blur, duration, ease, initialOpacity]);

  return (
    <div ref={ref} className={className} style={{ pointerEvents: 'auto', ...style }} {...props}>
      {children}
    </div>
  );
};

export default PageFadeContent;