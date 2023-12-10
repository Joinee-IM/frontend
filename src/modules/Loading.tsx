import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import LoadingBackground from '@/assets/loading.gif';
import { backgroundCenter, flexCenter } from '@/utils/css';

const LoadingWrapper = styled(motion.div)`
  width: 100vw;
  height: 100%;
  z-index: 1000000;
  position: absolute;
  background-image: url(${LoadingBackground});
  ${backgroundCenter}
  display: flex;
  ${flexCenter}
  filter: brightness(0.9);
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 5vmin;
  margin-top: 500px;
`;

export default function Loading() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(() => {
      setDots((prev) => (prev + 1) % 4);
    }, 500);

    //Clearing the interval
    return () => clearInterval(interval);
  }, [dots]);

  return (
    <LoadingWrapper
      key="loading"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        ease: 'linear',
      }}
    >
      <Text>{`Live Happy Die Young${'.'.repeat(dots)}`}</Text>
    </LoadingWrapper>
  );
}
