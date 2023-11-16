import { motion } from 'framer-motion';
import styled from 'styled-components';

const TapButtonBase = styled(motion.div)`
  padding: 1.8% 3.3%;
  font-weight: bolder;
  font-size: 1.5vw;
  line-height: 12px;
  border-radius: 10px;
  width: fit-content;
  white-space: nowrap;
  cursor: inherit, pointer;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

type TapButtonProps = React.ComponentProps<typeof TapButtonBase>;

export default function TapButton({
  whileHover = { scale: 1.1 },
  whileTap = { scale: 0.95 },
  transition = { type: 'spring', stiffness: 400, damping: 17 },
  children,
  ...rest
}: TapButtonProps) {
  return (
    <TapButtonBase whileHover={whileHover} whileTap={whileTap} transition={transition} {...rest}>
      {children}
    </TapButtonBase>
  );
}
