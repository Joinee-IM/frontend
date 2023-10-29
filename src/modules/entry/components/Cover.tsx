import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CoverImage from '@/assets/Cover.png';
import O from '@/assets/ö.png';
import { TapButton } from '@/components';
import { hexToRgb } from '@/utils';

const Background = styled.div<{ ratio: number }>`
  background: url(${CoverImage});
  width: 100vw;
  height: min(101vh, calc(101vw / ${({ ratio }) => ratio}));
  /* aspect-ratio: ${({ ratio }) => ratio}; */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  min-height: 33%;
  box-sizing: border-box;
  padding: 20px 15%;
  background-color: ${hexToRgb('#D9E3F7', 0.48)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-style: inter;
  font-weight: bold;
  font-size: 6.5vw;
  color: white;
  letter-spacing: 3px;
  margin: 0 10px;
  img {
    width: 3.5vw;
    margin-bottom: -2px;
    margin-right: 4px;
  }
`;

const SloganWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  &::before,
  &::after {
    content: '';
    margin: auto 0px;
    flex: 1;
    height: 1px;
    background-color: ${hexToRgb('#FFFFFF', 0.5)};
  }
  margin: 10px 0 20px 0;
`;

const Slogan = styled.div`
  font-style: inter;
  font-weight: bold;
  font-size: 2.5vw;
  color: white;
  letter-spacing: 2px;
  margin: 0 15px;
`;

const ButtonGroup = styled.div`
  display: flex;
  column-gap: 4.2%;
  width: 100%;
  justify-content: center;
`;

const Button = styled(TapButton)`
  background-color: ${hexToRgb('#D9F2F7', 0.61)};
`;

export default function Cover() {
  const [ratio, setRatio] = useState(0);
  const img = new Image();
  img.src = CoverImage;

  img.onload = () => {
    setRatio(img.width / img.height);
  };

  const { t } = useTranslation();

  return (
    <Background ratio={ratio}>
      <TitleWrapper>
        <Title>
          J<img src={O}></img>inee
        </Title>
        <SloganWrapper>
          <Slogan>Jöinee, go on a journey</Slogan>
        </SloganWrapper>
        <ButtonGroup>
          <Button>{t('entry.button.browseStadium')}</Button>
          <Button>{t('entry.button.login')}</Button>
        </ButtonGroup>
      </TitleWrapper>
    </Background>
  );
}
