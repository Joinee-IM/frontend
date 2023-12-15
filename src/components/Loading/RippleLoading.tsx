import styled, { keyframes } from 'styled-components';

import { hexToRgb } from '@/utils';
import { flexCenter } from '@/utils/css';

const ripple = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

const LoadingWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  & div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: ${ripple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

const FullScreenLoadingWrapper = styled.div`
  background-color: ${hexToRgb('#000000', 0.5)};
  position: absolute;
  width: 100%;
  height: 100%;
  ${flexCenter}
`;
export default function Loading() {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  );
}

export const FullScreenLoading = () => {
  return (
    <FullScreenLoadingWrapper>
      <Loading />
    </FullScreenLoadingWrapper>
  );
};
