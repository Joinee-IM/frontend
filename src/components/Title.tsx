import styled from 'styled-components';

import LogoIcon from '@/assets/icons/Logo';
import { rwdFontSize } from '@/utils/css';

type TitleProps = React.ComponentProps<typeof TitleWrapper>;

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  align-items: end;
  font-family: 'Contrail One', sans-serif;
  ${rwdFontSize(30)};
  font-weight: 400;
  color: ${({ theme }) => theme.main[700]};
`;

const Logo = styled(LogoIcon)`
  ${rwdFontSize(50)};
`;

export default function Title({ children, ...rest }: TitleProps) {
  return (
    <TitleWrapper {...rest}>
      <Logo />
      {children ?? 'Jöinee'}
    </TitleWrapper>
  );
}

export const PageTitle = styled.div`
  font-size: max(20px, 2.29vw);
  font-weight: 600;
  letter-spacing: 1.8px;
`;
