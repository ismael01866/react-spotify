import { useEffect, useState } from 'react';

export const useDelayedRender = (delay: number) => {
  const [delayed, setDelayed] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (fn: Function) => !delayed && fn();
};
