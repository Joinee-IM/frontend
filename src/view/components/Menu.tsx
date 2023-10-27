import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Container = styled.div`
  padding: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fafafa;
  background-color: #6600ff;
  padding-bottom: 100px;
  overflow: hidden;
`;

const MenuContainer = styled(motion.nav)`
  filter: drop-shadow(1px 1px 1px #4700b3);
  width: 300px;
  font-family: sofia-pro, sans-serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
`;

const MenuButton = styled(motion.button)`
  background: #fafafa;
  color: #6600ff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListContainer = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fafafa;
  list-style: none;
  margin: 0;
  padding: 10px;
`;

const List = styled(motion.li)`
  color: #6600ff;
  display: block;
  list-style: none;
  margin: 0;
  padding: 10px;
`;

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <MenuContainer initial={false} animate={isOpen ? 'open' : 'closed'}>
        <MenuButton whileTap={{ scale: 0.97 }} onClick={() => setIsOpen(!isOpen)}>
          Menu
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </MenuButton>
        <ListContainer
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        >
          <List variants={itemVariants}>Item 1 </List>
          <List variants={itemVariants}>Item 2 </List>
          <List variants={itemVariants}>Item 3 </List>
          <List variants={itemVariants}>Item 4 </List>
          <List variants={itemVariants}>Item 5 </List>
        </ListContainer>
      </MenuContainer>
    </Container>
  );
}
