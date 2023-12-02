import styled from 'styled-components';

import Temp from '@/assets/stadium.jpeg';
import GridForm from '@/components/GridForm';
import { TabPane, Tabs } from '@/components/Tab';
import { SquareTag } from '@/components/Tag';
import TimeSlot from '@/components/TimeSlot';
import useDeviceDetector from '@/hooks/useDeviceDetector';
import { AlbumWrapper, ImagePreview } from '@/modules/main/pages/Stadium/components/DetailModal';
import { Tag, TagWrapper } from '@/modules/main/pages/Stadium/components/ListItem';
import { hexToRgb } from '@/utils';
import { backgroundCenter } from '@/utils/css';

const Background = styled.div`
  width: 100%;
  height: clamp(200px, 25%, 280px);
  padding: 0 10%;
  box-sizing: border-box;
  background-image: url(${Temp});
  ${backgroundCenter}
  position: relative;
  &::before {
    content: '';
    background-color: ${hexToRgb('#d9d9d9', 0.5)};
    position: absolute;
    ${backgroundCenter}
    position: absolute;
    inset: 0;
  }
`;

const TitleWrapper = styled.div`
  width: 80%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 30px;
  font-weight: 600;
  padding: 10px 0;
`;

const ItemTag = styled(SquareTag).withConfig({
  shouldForwardProp: (prop) => !['reservable'].includes(prop),
})<{ reservable: boolean }>`
  background-color: ${({ theme, reservable }) => (reservable ? theme.sub[300] : theme.red[300])};
`;

const ContentWrapper = styled.div`
  padding: 60px 10%;
  box-sizing: border-box;
  width: 100%;
  .ant-tabs-content-holder {
    border: 0;
  }
  .ant-tabs-ink-bar {
    left: 0;
  }
`;

export default function Venue() {
  const { isMobile } = useDeviceDetector(800);

  return (
    <>
      <Background>
        <TitleWrapper>
          <Title>臺大體育館 / 羽球場 A</Title>
          <ItemTag reservable={false}>173 人使用中</ItemTag>
        </TitleWrapper>
      </Background>
      <ContentWrapper>
        <Tabs tabPosition={isMobile ? 'top' : 'left'}>
          <TabPane index="1" label="關於場地" key="1">
            <GridForm
              style={{ width: isMobile ? '100%' : 'max(36.5%, 575px)', gap: '20px' }}
              data={{
                樓層: '3F',
                場地面積: '2359 平方公尺',
                可容納人數: '200人',
                提供的運動項目: (
                  <TagWrapper>
                    <Tag>羽球</Tag>
                    <Tag>桌球</Tag>
                  </TagWrapper>
                ),
                小單位: '40 個',
                收費資訊: '300 元/小時',
                預約開放時間: '租借日的 30 天前',
                設備: '羽球網 、電梯 、空調 、淋浴室 、活動桌椅 、飲水機 、自動體外心臟電擊去顫器 、羽球電動計分板、無障礙電梯 1 座 、無障礙廁所 2 座',
                運動器材租借: '羽球拍、羽毛球',
              }}
              labelStyles={{ 設備: { alignSelf: 'baseline' } }}
            />
          </TabPane>
          <TabPane index="2" label="預約時段" key="2">
            <div style={{ ...(isMobile && { maxHeight: '450px' }), overflow: 'scroll' }}>
              <TimeSlot></TimeSlot>
            </div>
          </TabPane>
          <TabPane index="3" label="相簿" key="3">
            <AlbumWrapper>
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
              <ImagePreview
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                placeholder={
                  <ImagePreview
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                  />
                }
              />
            </AlbumWrapper>
          </TabPane>
        </Tabs>
      </ContentWrapper>
    </>
  );
}
