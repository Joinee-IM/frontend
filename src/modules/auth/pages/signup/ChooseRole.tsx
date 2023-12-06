import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { z } from 'zod';

import Bussiness from '@/assets/leaser.jpg';
import Player from '@/assets/player.jpg';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { schemas } from '@/services/type';
import { percentageOfFigma } from '@/utils/css';

const RadioGroup = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  gap: clamp(20px, ${percentageOfFigma(68).vw}, 68px);
`;

const CharacterWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['chosen'].includes(prop),
})<{ chosen: boolean }>`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  gap: 10px;
  align-items: center;
  &:hover {
    img {
      filter: brightness(${({ chosen }) => (chosen ? '100%' : '60%')});
    }
    div {
      color: ${({ theme }) => theme.main[500]};
    }
  }
`;

const Label = styled.div.withConfig({
  shouldForwardProp: (prop) => !['chosen'].includes(prop),
})<{ chosen: boolean }>`
  color: ${({ theme, chosen }) => (chosen ? theme.main[500] : 'black')};
`;

const Character = styled.img.withConfig({
  shouldForwardProp: (prop) => !['chosen'].includes(prop),
})<{ chosen: boolean }>`
  filter: brightness(${({ chosen }) => (chosen ? '100%' : '20%')});
  width: clamp(100px, ${percentageOfFigma(140).vw}, 140px);
  border-radius: 50%;
  aspect-ratio: 1;
  transition: all 0.1s linear;
  cursor: pointer;
`;

export type Role = z.infer<(typeof schemas)['RoleType']> | undefined;

export default function ChooseMember() {
  const [role, setRole] = useState<Role>(undefined);
  const navigate = useNavigate();

  return (
    <Card>
      <div>選擇你的角色</div>
      <RadioGroup>
        <CharacterWrapper onClick={() => setRole('NORMAL')} chosen={role === 'NORMAL'}>
          <Character src={Player} chosen={role === 'NORMAL'} />
          <Label chosen={role === 'NORMAL'}>找運動場</Label>
        </CharacterWrapper>
        <CharacterWrapper onClick={() => setRole('PROVIDER')} chosen={role === 'PROVIDER'}>
          <Character src={Bussiness} chosen={role === 'PROVIDER'} />
          <Label chosen={role === 'PROVIDER'}>出租場地</Label>
        </CharacterWrapper>
      </RadioGroup>
      <RippleButton
        category="solid"
        palette="main"
        borderBox={true}
        disabled={!role}
        htmlType="submit"
        style={{ width: '100%', marginTop: '20px' }}
        onClick={() => navigate(`/auth/signup/account?role=${role}`)}
      >
        下一步
      </RippleButton>
    </Card>
  );
}
