import React from 'react';
import WebThreads from './WebThreads';
import './WebThreads.css';

export default function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#000000' }}>
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
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
    </div>
  );
}
