import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

const useBreakpoint = (): number => {
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

const getCurrentBreakpoint = () => {
  if (window.matchMedia('(min-width: 1536px)').matches) {
    return breakpoints['2xl'];
  } else if (window.matchMedia('(min-width: 1280px)').matches) {
    return breakpoints.xl;
  } else if (window.matchMedia('(min-width: 1024px)').matches) {
    return breakpoints.lg;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    return breakpoints.md;
  } else if (window.matchMedia('(min-width: 640px)').matches) {
    return breakpoints.sm;
  } else {
    return breakpoints.xs;
  }
};

const isMobile = (breakpoint: number): boolean => {
  return breakpoint < breakpoints.sm;
};

export {
  useBreakpoint,
  breakpoints,
  isMobile,
};