import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CoverImage from '@/assets/Cover.png';
import { TapButton } from '@/components';
import { MOBILE_WITH } from '@/constants/rwd';
import useImageDimension from '@/hooks/useImageDimension';
import { hexToRgb } from '@/utils';
import { backgroundCenter, percentageOfFigma } from '@/utils/css';

export const Background = styled.div.withConfig({
  shouldForwardProp: (prop) => !['ratio'].includes(prop),
})<{ ratio?: number }>`
  background: url(${CoverImage});
  width: 100vw;
  height: 100vh;
  ${backgroundCenter}
  display: flex;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  min-height: 33%;
  row-gap: ${percentageOfFigma(60).vh};
  box-sizing: border-box;
  padding: ${percentageOfFigma(46).max} 30px ${percentageOfFigma(30).max};
  background-color: ${({ theme: { main } }) => hexToRgb(main[100], 0.48)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Contrail One', sans-serif;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: ${percentageOfFigma(80).max};
  color: white;
  letter-spacing: 3px;
  line-height: ${percentageOfFigma(80).max};
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
  max-width: 1026px;
  &::before,
  &::after {
    content: '';
    margin: auto 0px;
    flex: 1;
    height: 2px;
    background-color: ${hexToRgb('#FFFFFF', 0.5)};
  }
`;

const Slogan = styled.div`
  font-weight: bold;
  font-size: ${percentageOfFigma(36).max};
  @media (max-width: ${MOBILE_WITH}px) {
    font-size: min(20px, ${percentageOfFigma(36).max});
  }
  color: white;
  letter-spacing: 2px;
  margin: 0 3vw;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${percentageOfFigma(43).vw};
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(TapButton)`
  background-color: ${({ theme: { main } }) => hexToRgb(main[100], 0.61)};
`;

export default function Cover({ isAuth }: { isAuth: boolean }) {
  const { ratio } = useImageDimension(CoverImage);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Background ratio={ratio}>
      {!isAuth && (
        <TitleWrapper>
          <Title>Jöinee</Title>
          <SloganWrapper>
            <Slogan>Jöinee, go on a journey!</Slogan>
          </SloganWrapper>
          <ButtonGroup>
            <Button onClick={() => navigate('/auth/login')}>
              {t('entry.button.browseStadium')}
            </Button>
            <Button onClick={() => navigate('/auth/login')}>{t('entry.button.login')}</Button>
          </ButtonGroup>
        </TitleWrapper>
      )}
    </Background>
  );
}
