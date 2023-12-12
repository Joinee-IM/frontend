import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import LoadingBackground from '@/assets/loading.gif';
import { backgroundCenter, flexCenter } from '@/utils/css';

const LoadingWrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['image'].includes(prop),
})<{ image: string }>`
  width: 100%;
  height: 100%;
  z-index: 1000000;
  position: absolute;
  background-image: ${({ image }) => `url(${image})`};
  ${backgroundCenter}
  display: flex;
  ${flexCenter}
  filter: brightness(0.9);
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 5vmin;
  margin-top: 500px;
  letter-spacing: 3px;
`;

export default function Loading({
  image = LoadingBackground,
  text = 'Live Happy Die Young',
}: {
  image?: string;
  text?: string;
}) {
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
      image={image}
    >
      <Text>{`${text}${'.'.repeat(dots)}`}</Text>
    </LoadingWrapper>
  );
}

export function useLoading(
  dependencies: boolean[],
  image = LoadingBackground,
  text = 'Live Happy Die Young',
) {
  const context = useMemo(
    () => (
      <AnimatePresence>
        {dependencies.some((dependency) => dependency) && <Loading image={image} text={text} />}
      </AnimatePresence>
    ),
    [dependencies, image, text],
  );
  return { context };
}
