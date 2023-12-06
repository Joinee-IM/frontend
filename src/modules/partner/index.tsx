import styled from 'styled-components';

import SortIcon from '@/assets/icons/Sort';
import GridForm from '@/components/GridForm';
import Select from '@/components/Select';
import { TabPane, Tabs } from '@/components/Tab';
import useDeviceDetector from '@/hooks/useDeviceDetector';
import Filter from '@/modules/main/components/Filter';
import { Tag, TagWrapper } from '@/modules/main/pages/Stadium/components/ListItem';

const ContentWrapper = styled.div`
  padding: 60px 10%;
  box-sizing: border-box;
  width: 100%;
  display: flex;
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
    <ContentWrapper>
      <Tabs tabPosition={isMobile ? 'top' : 'left'}>
        <TabPane index="1" label="全部" key="1"></TabPane>
        <TabPane index="2" label="桌球" key="2"></TabPane>
        <TabPane index="3" label="羽球" key="3"></TabPane>
        <TabPane index="4" label="籃球" key="4"></TabPane>
        <TabPane index="5" label="排球" key="5"></TabPane>
      </Tabs>
      <Filter
        twoSteps={false}
        searchable={false}
        filters={
          <>
            <Select
              title={'排序'}
              icon={<SortIcon fontSize={'20px'} />}
              items={['時間由近到遠', '時間由遠到近', '徵求人數由多到少', '徵求人數由少到多'].map(
                (sort, index) => ({ label: sort, key: `${index + 1}` }),
              )}
            ></Select>
            {' · '}
            <Select title={'運動項目'} items={[]}></Select>
            <Select title={'容納人數'} items={[]}></Select>
            <Select title={'開放預約'} items={[]}></Select>
          </>
        }
      >
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
      </Filter>
    </ContentWrapper>
  );
}
