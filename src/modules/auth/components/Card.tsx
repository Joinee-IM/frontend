import { motion } from 'framer-motion';
import styled from 'styled-components';

import type { ReactNode } from 'react';

import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

interface CardProps extends React.ComponentProps<typeof CardBackground> {
  children?: ReactNode;
}

const CardBackground = styled(motion.div)`
  width: 33%;
  height: fit-content;
  background-color: white;
  border-radius: 0.76%/0.657%;
  box-shadow: 0px 4px 4px 0px ${hexToRgb('#000000', 0.25)};
  padding: 90px 80px 20px;
  box-sizing: border-box;
  ${flexCenter}
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  font-family: 'Contrail One', sans-serif;
  font-size: 30px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 60px;
  color: ${({ theme }) => theme.main[700]};
`;

export default function Card({ children, ...rest }: CardProps) {
  return (
    <CardBackground
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      {...rest}
    >
      <TitleWrapper>Jöinee</TitleWrapper>
      {children}
    </CardBackground>
  );
}
