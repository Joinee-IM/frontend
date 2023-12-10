import { AnimatePresence } from 'framer-motion';

import LoadingPage from '@/modules/Loading';
export default function Loading({
  Component,
  loading,
}: {
  Component: () => JSX.Element;
  loading: boolean;
}) {
  return (
    <>
      <AnimatePresence>{loading && <LoadingPage />} </AnimatePresence>
      <Component />
    </>
  );
}
