import styled from 'styled-components';

type TitleProps = React.ComponentProps<typeof TitleWrapper>;

const TitleWrapper = styled.div`
  display: flex;
  column-gap: 4px;
  font-family: 'Contrail One', sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: ${({ theme }) => theme.main[700]};
`;

export default function Title({ children, ...rest }: TitleProps) {
  return <TitleWrapper {...rest}>{children ?? 'Jöinee'}</TitleWrapper>;
}
