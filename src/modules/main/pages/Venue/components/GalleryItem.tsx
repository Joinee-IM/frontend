import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import type { Type } from '@/utils/type';

import { SquareTag } from '@/components/Tag';
import { useAlbum } from '@/services/useInfo';
import { backgroundCenter } from '@/utils/css';

interface GalleryItemProps extends Type<typeof Item> {
  name: string;
  venue_id: number;
  is_reservable: boolean;
  floor: string;
  capacity: number;
  current_user_count: number;
}

const Item = styled.div.withConfig({
  shouldForwardProp: (prop) => !['image'].includes(prop),
})<{ image: string }>`
  aspect-ratio: 1.1;
  background-color: aliceblue;
  background-image: ${({ image }) => `url(${image})`};
  ${backgroundCenter}
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .gallery_item_info {
    /* transform: translate(0, 22px); */
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    & .gallery_item_info {
      /* transform: translate(0, 0px); */
      background-color: ${({ theme }) => theme.main[300]};
    }
  }
`;

const ItemTag = styled(SquareTag).withConfig({
  shouldForwardProp: (prop) => !['reservable'].includes(prop),
})<{ reservable: boolean }>`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: ${({ theme, reservable }) => (reservable ? theme.sub[300] : theme.red[300])};
`;

const ItemInfo = styled(motion.div).attrs({ className: 'gallery_item_info' })`
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 18px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.main[500]};
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const ItemInfoTitle = styled.div`
  font-weight: 600;
`;
const ItemInfoContent = styled.div`
  font-size: 9px;
`;

export default function GalleryItem({
  venue_id,
  is_reservable,
  name,
  floor,
  capacity,
  current_user_count,
}: GalleryItemProps) {
  const { data: album } = useAlbum(Number(venue_id), 'VENUE');
  const navigate = useNavigate();

  return (
    <Item image={album?.data?.[0]?.url ?? ''} onClick={() => navigate(`${venue_id}`)}>
      <ItemTag reservable={is_reservable}>{is_reservable ? '可預約' : '不可預約'}</ItemTag>
      <ItemInfo>
        <ItemInfoTitle>{name}</ItemInfoTitle>
        <ItemInfoContent>{`${floor}F．可容納 ${capacity} 人．${current_user_count} 人正在使用中`}</ItemInfoContent>
      </ItemInfo>
    </Item>
  );
}
