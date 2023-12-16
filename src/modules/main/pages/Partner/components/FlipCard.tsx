import { format, parseISO } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { schemas } from '@/services/type';
import type { z } from 'zod';

import { DirectionLeftIcon, DirectionRightIcon } from '@/assets/icons/Direction';
import { RippleButton } from '@/components/Button';
import FlipCardComponent from '@/components/FlipCard';
import { FormGrid } from '@/components/Grid';
import { FullContainerLoading } from '@/components/Loading/RippleLoading';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { useStadiumInfo } from '@/modules/main/pages/Stadium/services';
import { useVenueInfo } from '@/modules/main/pages/Venue/services';
import { percentageOfFigma } from '@/utils/css';
import { toTechnicalLevel } from '@/utils/function/map';
import toSportIcon from '@/utils/function/map/toSportIcon';

const FlipCard = styled(FlipCardComponent)`
  border-radius: 10px;
  background-color: #fdf9f6;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default function FlipCardInPartner({
  stadium_id,
  venue_id,
  start_time,
  end_time,
  technical_level,
  vacancy,
  remark,
  id,
}: z.infer<(typeof schemas)['Reservation']>) {
  const { data: stadium, isLoading: fetchingStadium } = useStadiumInfo(stadium_id);
  const { data: venue, isLoading: fetchingVenue } = useVenueInfo(venue_id);

  const navigate = useNavigate();

  const Component = toSportIcon(venue?.data?.sport_name);

  return (
    <FlipCard
      icon={Component ? <Component /> : Component}
      front={
        <>
          <FormGrid
            data={{
              運動項目: (
                <RoundTagWrapper>
                  <RoundTag>{venue?.data?.sport_name}</RoundTag>
                </RoundTagWrapper>
              ),
              場館: stadium?.data?.name,
              場地: venue?.data?.name,
              日期: format(parseISO(start_time), 'yyyy/MM/dd'),
              時間: `${format(parseISO(start_time), 'HH:mm')} - ${format(
                parseISO(end_time),
                'HH:mm',
              )}`,
            }}
            style={{
              padding: `${percentageOfFigma(27).max} ${percentageOfFigma(45).max}`,
              paddingRight: 0,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <RippleButton category="icon" palette="gray" style={{ alignSelf: 'flex-end' }}>
            <DirectionRightIcon />
          </RippleButton>
        </>
      }
      back={
        <>
          <RippleButton category="icon" palette="gray" style={{ alignSelf: 'flex-end' }}>
            <DirectionLeftIcon />
          </RippleButton>
          <FormGrid
            data={{
              技術水準: (
                <RoundTagWrapper>
                  {technical_level.map((level, index) => (
                    <RoundTag key={index}>{toTechnicalLevel(level)}</RoundTag>
                  ))}
                </RoundTagWrapper>
              ),
              徵求人數: `${vacancy} 人`,
              主揪備註: remark ? remark : '無',
            }}
            style={{
              padding: `${percentageOfFigma(27).max} ${percentageOfFigma(15).max}`,
              paddingLeft: 0,
              gridTemplateColumns: 'repeat(2, 1fr)',
            }}
            labelStyles={{ 主揪備註: { alignSelf: 'flex-start' } }}
            onClick={(e) => e.stopPropagation()}
          />
          <RippleButton
            category="solid"
            palette="main"
            style={{ alignSelf: 'flex-end', marginRight: '0.5em', marginBottom: '0.5em' }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/reserve/info/${id}`);
            }}
          >
            加入
          </RippleButton>
        </>
      }
    >
      {(fetchingStadium || fetchingVenue) && <FullContainerLoading />}
    </FlipCard>
  );
}
