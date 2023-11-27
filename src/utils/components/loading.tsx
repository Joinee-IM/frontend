import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import LoadingPage from '@/modules/Loading';
export default function Loading({ Component }: { Component: () => JSX.Element }) {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading((loading) => !loading);
  }, 2600);

  return (
    <>
      <AnimatePresence>{loading && <LoadingPage />} </AnimatePresence>
      <Component />
    </>
  );
}
