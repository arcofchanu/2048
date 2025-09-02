import React, { useState, useEffect } from 'react';

interface ScoreMilestoneEffectProps {
  trigger: number;
}

const ScoreMilestoneEffect: React.FC<ScoreMilestoneEffectProps> = ({ trigger }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setActive(true);
      // Duration should be animation duration + last animation delay
      const timer = setTimeout(() => {
        setActive(false);
      }, 1200 + 500); // 1.2s animation, 0.5s last delay
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!active) {
    return null;
  }

  return (
    <div 
      className="absolute inset-0 flex justify-center items-center pointer-events-none z-50"
      aria-hidden="true"
    >
      <div className="shockwave-ring" style={{ animationDelay: '0s' }}></div>
      <div className="shockwave-ring" style={{ animationDelay: '0.25s' }}></div>
      <div className="shockwave-ring" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default ScoreMilestoneEffect;