import { motion } from 'framer-motion';
import styled from 'styled-components';

const Circle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: brown;
`;

export default function Dondondon() {
  return (
    <Circle
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: 'spring',
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      }}
    />
  );
}
