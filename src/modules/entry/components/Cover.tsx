import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CoverImage from '@/assets/Cover.png';
import O from '@/assets/ö.png';
import { TapButton } from '@/components';
import useImageDimension from '@/hooks/useImageDimension';
import { hexToRgb } from '@/utils';

export const Background = styled.div.withConfig({
  shouldForwardProp: (prop) => !['ratio'].includes(prop),
})<{ ratio?: number }>`
  background: url(${CoverImage});
  width: 100vw;
  height: ${({ ratio }) => (ratio ? `min(100vh, calc(101vw / ${ratio}))` : `100vh`)};
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
  background-color: ${({ theme: { main } }) => hexToRgb(main[100], 0.48)};
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
    height: 2px;
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
          <Title>
            J<img src={O}></img>inee
          </Title>
          <SloganWrapper>
            <Slogan>Jöinee, go on a journey</Slogan>
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
