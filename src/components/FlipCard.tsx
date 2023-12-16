import { useState } from 'react';
import styled, { css } from 'styled-components';

import type { Type } from '@/utils/type';
import type { ReactNode } from 'react';

import { flexCenter, rwdFontSize } from '@/utils/css';

interface FlipCardProps extends Type<typeof Card> {
  front: ReactNode;
  back: ReactNode;
  icon?: ReactNode;
}

const Card = styled.div`
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  aspect-ratio: 4 / 3;
`;

const FlipCardWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['flipped'].includes(prop),
})<{ flipped: boolean }>`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 200ms ease-out;
  ${({ flipped }) =>
    flipped &&
    css`
      transform: rotateY(180deg);
    `};
  ${flexCenter};
`;

const Front = styled.div`
  transform-style: preserve-3d;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  ${flexCenter};
`;
const Back = styled(Front)`
  transform: rotateY(180deg);
`;
const Icon = styled.div`
  position: absolute;
  top: -0.2em;
  left: -0.1em;
  ${rwdFontSize(60)};
`;

export default function FlipCard({ front, back, icon, children, ...rest }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Card>
      <FlipCardWrapper {...rest} flipped={flipped} onClick={() => setFlipped((prev) => !prev)}>
        {flipped ? (
          <Back>
            {icon && <Icon>{icon}</Icon>}
            {back}
          </Back>
        ) : (
          <Front>
            {icon && <Icon>{icon}</Icon>}
            {front}
          </Front>
        )}
        {children}
      </FlipCardWrapper>
    </Card>
  );
}
