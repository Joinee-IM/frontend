import { Popover } from 'antd';
import styled from 'styled-components';

import type { PopoverProps } from 'antd';
import type { ReactNode } from 'react';

import { ButtonWrapper } from '@/components/Button';
import { percentageOfFigma, rwdFontSize } from '@/utils/css';

interface PopOverProps extends PopoverProps {
  icon?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
}

const InfoReminderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${percentageOfFigma(3).max};
  ${rwdFontSize(16)};
  padding: ${percentageOfFigma(15).max} ${percentageOfFigma(12).max};
`;

const IconWrapper = styled.div`
  padding-top: 2px;
`;

const ContentWrapper = styled.div`
  display: flex;
  column-gap: ${percentageOfFigma(20).max};
`;

export default function PopOver({ content, icon, footer, children, style, ...rest }: PopOverProps) {
  return (
    <Popover
      content={
        <InfoReminderWrapper style={style}>
          <ContentWrapper>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            {content}
          </ContentWrapper>
          {footer && <ButtonWrapper>{footer}</ButtonWrapper>}
        </InfoReminderWrapper>
      }
      {...rest}
    >
      {children}
    </Popover>
  );
}
