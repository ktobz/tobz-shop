import { useState, useEffect, useCallback } from 'react';

export const useCountUp = (target, duration = 800, startOnMount = true) => {
  const [count, setCount] = useState(startOnMount ? 0 : target);

  const animate = useCallback(() => {
    if (target === 0) {
      setCount(0);
      return;
    }
    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (startOnMount) animate();
  }, [animate, startOnMount]);

  return { count, animate };
};
