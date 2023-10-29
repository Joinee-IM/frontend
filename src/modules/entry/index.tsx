import styled from 'styled-components';

import Badminton from '@/assets/badminton.png';
import Net from '@/assets/net.png';
import PingPong from '@/assets/pingpong.png';
import Cover from '@/modules/entry/components/Cover';
import Feature from '@/modules/entry/components/Feature';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

export default function Entry() {
  return (
    <Container>
      <Cover />
      <Feature
        image={Badminton}
        title="幫你找到最適合的場地"
        description="台灣各地任您挑選，想打球時隨時預約"
        buttonLabel="立即預約"
      />
      <Feature
        image={PingPong}
        title="幫您找到最適合的球友"
        description="總是一個人打球嗎？Jöinee 幫您及時找到適合的球友"
        buttonLabel="尋找球友"
        scroll="right"
      />
      <Feature
        image={Net}
        title="球場總是空蕩蕩租不出去嗎？"
        description="一張桌球桌也可以！馬上註冊並上架自己的場地讓更多人看見吧！"
        buttonLabel="立即上架"
      />
    </Container>
  );
}
