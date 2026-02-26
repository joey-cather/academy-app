'use client';
import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      const { worker } = require('../mocks/browser');
      worker.start();
    }
  }, []);

  return null;
};
