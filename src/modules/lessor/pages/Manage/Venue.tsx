import { Table } from 'antd';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import type { TableBaseProps, VenueTableItem } from '@/modules/lessor/pages/Manage/types';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';

import { DirectionRightIcon } from '@/assets/icons/Direction';
import { RippleButton } from '@/components';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { pagination } from '@/modules/lessor/pages/Manage';
import { useLessorBrowseVenue } from '@/modules/lessor/services';
import theme from '@/provider/theme/theme';

export default function VenueTable({
  setData,
  selectedRowKeys,
  setSelectedRowKeys,
}: TableBaseProps) {
  const navigate = useNavigate();
  const limit = useMemo(() => 10, []);
  const [offset, setOffset] = useState(0);
  const [cookies] = useCookies(['id', 'user-role']);

  const { venues, count } = useLessorBrowseVenue({ limit, offset });
  const columns: ColumnsType<VenueTableItem> = [
    {
      title: '場館名稱',
      dataIndex: 'stadium_name',
      sorter: (a, b) => a.stadium_name.localeCompare(b.stadium_name),
    },
    {
      title: '場地名稱',
      dataIndex: 'venue_name',
      sorter: (a, b) => a.venue_name.localeCompare(b.venue_name),
    },
    {
      title: '小單位數量',
      dataIndex: 'court_count',
      sorter: (a, b) => a.court_count - b.court_count,
    },
    {
      title: '面積（平方公尺）',
      dataIndex: 'area',
      sorter: (a, b) => a.area - b.area,
    },
    {
      title: '狀態',
      dataIndex: 'is_published',
      render: (_, { is_published }) => (
        <div>
          {is_published ? (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: 'white',
                  color: theme.sub[500],
                  borderStyle: 'solid',
                  borderColor: theme.sub[500],
                }}
              >
                已上架
              </RoundTag>
            </RoundTagWrapper>
          ) : (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: 'white',
                  color: '#cbc09f',
                  borderStyle: 'solid',
                  borderColor: '#cbc09f',
                }}
              >
                已下架
              </RoundTag>
            </RoundTagWrapper>
          )}
        </div>
      ),
      sorter: (a, b) => Number(a.is_published) - Number(b.is_published),
      filters: [
        {
          text: '已上架',
          value: true,
        },
        {
          text: '已下架',
          value: 'false',
        },
      ],
      onFilter: (value, record) => record.is_published === value,
    },
    {
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <RippleButton
          category="icon"
          palette="gray"
          onClick={() => navigate(`/manage/${cookies.id}/venue/${record.venue_id}`)}
        >
          <DirectionRightIcon />
        </RippleButton>
      ),
    },
  ];
  const dataSource = useMemo(
    () =>
      venues?.map((venue) => ({
        key: String(venue.venue_id),
        ...venue,
      })) ?? [],
    [venues],
  );
  const rowSelection: TableRowSelection<VenueTableItem> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: Key[]) => setSelectedRowKeys(newSelectedRowKeys),
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  useEffect(() => {
    setData?.((prev) => (isEqual(prev, dataSource) ? prev : dataSource));
  }, [dataSource, setData]);

  return (
    <Table
      pagination={pagination(count ?? 0, limit, offset, setOffset)}
      {...{ columns, dataSource, rowSelection }}
    />
  );
}
