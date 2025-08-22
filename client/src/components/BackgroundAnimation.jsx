import React, { useCallback } from 'react';
import { loadSlim } from 'tsparticles-slim';
import Particles from 'react-tsparticles';
import '../index.css'

const BackgroundAnimation = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
      }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: { enable: true },
        },
      }}
    />
  );
};

export default BackgroundAnimation;
