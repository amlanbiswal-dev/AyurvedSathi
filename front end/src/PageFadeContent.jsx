import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const PageFadeContent = ({
  children,
  blur = false,
  duration = 500,
  ease = 'power2.out',
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

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter'
    });

    gsap.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration: getSeconds(duration),
      ease: ease
    });

    return () => {
      gsap.killTweensOf(el);
    };
  }, [blur, duration, ease, initialOpacity]);

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {children}
    </div>
  );
};

export default PageFadeContent;
