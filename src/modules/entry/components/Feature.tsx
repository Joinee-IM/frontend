import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { ReactNode } from 'react';

import { RippleButton } from '@/components';
import { MOBILE_WITH } from '@/constants/rwd';
import { percentageOfFigma } from '@/utils/css';

interface FeatureProps {
  image: string;
  title: string;
  description: string;
  buttonLabel: string;
  scroll?: 'right' | 'left';
}

const Background = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 1;
    flex-basis: 400px;
    min-height: 30vh;
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
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10px 0px' });

  return (
    <div ref={ref}>
      <ScrollInViewWrapper
        style={{
          transform: isInView ? 'none' : `translateX(${scroll === 'left' ? '-' : ''}200px)`,
          opacity: isInView ? 1 : 0,
          transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0s',
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
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  row-gap: 7%;
`;

const Title = styled.div`
  font-size: ${percentageOfFigma(36).max};
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(20px, ${percentageOfFigma(36).max});
  }
  letter-spacing: 2px;
`;

const Description = styled.div`
  font-size: ${percentageOfFigma(20).max};
  text-align: center;
  margin: 0 ${percentageOfFigma(200).max};
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(16px, ${percentageOfFigma(20).max});
    margin: 0 min(70px, ${percentageOfFigma(200).max});
  }
`;

export default function Feature({
  image,
  title,
  description,
  buttonLabel,
  scroll = 'left',
}: FeatureProps) {
  const navigate = useNavigate();

  // function scrollTo() {
  //   const offset = 0;
  //   const fixedOffset = offset.toFixed();
  //   const onScroll = function () {
  //     if (window.scrollY.toFixed() === fixedOffset) {
  //       window.removeEventListener('scroll', onScroll);
  //       navigate('/auth/login');
  //     }
  //   };

  //   window.addEventListener('scroll', onScroll);
  //   onScroll();
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   });
  // }

  return (
    <Background style={{ flexDirection: scroll === 'left' ? 'row' : 'row-reverse' }}>
      <ScrollInView scroll={scroll}>
        <img src={image} />
      </ScrollInView>
      <ScrollInView scroll={scroll}>
        <Section>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <RippleButton
            category="solid"
            palette="main"
            onClick={() => {
              navigate('/auth/login');
            }}
          >
            {buttonLabel}
          </RippleButton>
        </Section>
      </ScrollInView>
    </Background>
  );
}
