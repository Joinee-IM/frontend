import styled from 'styled-components';

interface SectionProps extends React.ComponentProps<typeof SectionWrapper> {
  title?: string;
  TitleAction?: () => JSX.Element;
}

const SectionWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const SectionTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.gray[500]};
  font-size: 15px;
  font-weight: 500;
  padding: 0 0 3px 0;
`;

export default function Section({ title, TitleAction, children, ...rest }: SectionProps) {
  return (
    <SectionWrapper {...rest}>
      <SectionTitleWrapper>
        {title}
        {TitleAction && <TitleAction />}
      </SectionTitleWrapper>
      {children}
    </SectionWrapper>
  );
}
