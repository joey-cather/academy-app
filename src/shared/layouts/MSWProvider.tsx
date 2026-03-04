'use client';
import { useEffect, useState } from 'react';

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_ENABLE_MSW === 'true'
    ) {
      import('../../mocks/browser')
        .then(({ worker }) => worker.start())
        .finally(() => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  if (!ready)
    return (
      <div
        style={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }}
      />
    );
  return <>{children}</>;
};
