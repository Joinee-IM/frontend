import { useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import styled from 'styled-components';

import { RippleButton } from '@/components';

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  scroll?: 'right' | 'left';
}

const Background = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  > div {
    width: 50%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const ScrollInViewWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ScrollInView = ({
  children,
  scroll = 'left',
}: {
  children: ReactNode;
  scroll: FeatureProps['scroll'];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      <ScrollInViewWrapper
        style={{
          transform: isInView ? 'none' : `translateX(${scroll === 'left' ? '-' : ''}200px)`,
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s',
        }}
      >
        {children}
      </ScrollInViewWrapper>
    </div>
  );
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  row-gap: 7%;
`;

const Title = styled.div`
  font-size: 2.5vw;
`;

const Description = styled.div`
  font-size: 1.5vw;
  margin: 0 23%;
  text-align: center;
`;

export default function Feature({
  image,
  title,
  description,
  buttonLabel,
  scroll = 'left',
}: FeatureProps) {
  return (
    <Background style={{ flexDirection: scroll === 'left' ? 'row' : 'row-reverse' }}>
      <ScrollInView scroll={scroll}>
        <img src={image} />
      </ScrollInView>
      <ScrollInView scroll={scroll}>
        <Section>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <RippleButton>{buttonLabel}</RippleButton>
        </Section>
      </ScrollInView>
    </Background>
  );
}
