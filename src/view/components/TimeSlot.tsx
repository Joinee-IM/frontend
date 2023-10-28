import { range } from 'lodash';
import styled from 'styled-components';

const GAP = 6;

const Container = styled.div`
  display: flex;
  column-gap: ${GAP}px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${GAP}px;
`;

const Unit = styled.div<{ time?: string | number }>`
  width: 100px;
  height: 60px;
  background-color: aqua;
  position: relative;
  &::after {
    content: '${({ time }) => (time ? `${time}:00` : '')}';
    position: absolute;
    top: calc(100% + ${GAP / 2}px);
    right: 105%;
    transform: translateY(-50%);
  }
`;

const NUMBER = 8;
export default function TimeSlot() {
  return (
    <Container>
      {range(5).map((_, cIndex) => (
        <Column key={cIndex}>
          {range(5, 5 + NUMBER).map((time, uIndex) => (
            <Unit key={uIndex} time={cIndex === 0 ? time : ''}></Unit>
          ))}
        </Column>
      ))}
    </Container>
  );
}
