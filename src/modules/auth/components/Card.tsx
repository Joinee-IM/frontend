import { motion } from 'framer-motion';
import styled from 'styled-components';

import type { ReactNode } from 'react';

import Logo from '@/assets/icons/Logo';
import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

interface CardProps extends React.ComponentProps<typeof CardBackground> {
  hasTitle?: boolean;
  children?: ReactNode;
}

const CardBackground = styled(motion.div)`
  width: clamp(360px, 33%, 500px);
  height: fit-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px ${hexToRgb('#000000', 0.25)};
  padding: 4% 80px 3%;
  box-sizing: border-box;
  ${flexCenter}
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: end;
  font-family: 'Contrail One', sans-serif;
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 5vh;
  color: ${({ theme }) => theme.main[700]};
`;

export default function Card({ hasTitle = true, children, ...rest }: CardProps) {
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
      {hasTitle && (
        <TitleWrapper>
          <Logo fontSize={'50px'} />
          <div>Jöinee</div>
        </TitleWrapper>
      )}
      {children}
    </CardBackground>
  );
}
