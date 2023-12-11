import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
const menuItems = ['尋找場地', '尋找球友', 'dolor', 'sit'];

const UnderLinedMenu = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center left;
  color: rgba($color: #171717, $alpha: 0.8);
  background: #ffd11a;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Item = styled(motion.div)`
  margin: 0 1.5rem;
  font-size: 3rem;
  font-weight: 700;
  cursor: pointer;
  position: relative;
  &:first-child {
    margin-left: 3rem;
  }
`;

const Line = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 15px;
  background: black;
  opacity: 0.85;
`;

const MenuItem = ({
  text,
  selected,
  onClick,
}: {
  text: string;
  selected: boolean;
  onClick: () => void;
}) => (
  <Item onClick={onClick} animate={{ opacity: selected ? 1 : 0.5 }}>
    {text}
    {selected && <Line layoutId="underline" />}
  </Item>
);

export default function UnderlinedMenu() {
  const [selected, setSelected] = useState(0);
  return (
    <UnderLinedMenu>
      <Wrapper>
        <LayoutGroup>
          {menuItems.map((el, i) => (
            <MenuItem text={el} key={i} selected={selected === i} onClick={() => setSelected(i)} />
          ))}
        </LayoutGroup>
      </Wrapper>
    </UnderLinedMenu>
  );
}
