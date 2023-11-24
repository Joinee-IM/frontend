import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Bussiness from '@/assets/business.png';
import Player from '@/assets/player.png';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';

const RadioGroup = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  gap: 10px;
`;

const CharacterWrapper = styled.div<{ chosen: boolean }>`
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

const Label = styled.div<{ chosen: boolean }>`
  color: ${({ theme, chosen }) => (chosen ? theme.main[500] : 'black')};
`;

const Character = styled.img<{ chosen: boolean }>`
  filter: brightness(${({ chosen }) => (chosen ? '100%' : '20%')});
  width: 100px;
  height: 120px;
  transition: all 0.1s linear;
  cursor: pointer;
`;

type Role = 'PROVIDER' | 'NORMAL' | undefined;

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
        disabled={!role}
        htmlType="submit"
        style={{ width: '100%', marginTop: '20px' }}
        onClick={() => navigate('/auth/signup/account')}
      >
        下一步
      </RippleButton>
    </Card>
  );
}
