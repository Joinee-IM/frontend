import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { schemas } from '@/services/type';
import type { z } from 'zod';

import Bussiness from '@/assets/leaser.jpg';
import Player from '@/assets/player.jpg';
import { RippleButton } from '@/components';
import Card from '@/modules/auth/components/Card';
import { useEditAccount } from '@/modules/main/pages/UserInfo/services';
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
  const { account_id } = useParams();
  const { mutate } = useEditAccount(Number(account_id));

  const handleClick = () => {
    mutate({ role }, { onSuccess: () => navigate(`/?account_id=${account_id}`) });
  };
  return (
    <Card>
      <div>已成功用 Google 帳號登入，請選擇您的角色</div>
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
        onClick={handleClick}
      >
        儲存
      </RippleButton>
    </Card>
  );
}
