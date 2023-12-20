import { Table } from 'antd';
import { isEqual } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import type { CourtTableItem, TableBaseProps } from '@/modules/lessor/pages/Manage/types';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';

import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { pagination } from '@/modules/lessor/pages/Manage';
import { useLessorBrowseCourt } from '@/modules/lessor/services';
import theme from '@/provider/theme/theme';

export default function CourtTable({
  setData,
  selectedRowKeys,
  setSelectedRowKeys,
}: TableBaseProps) {
  const limit = useMemo(() => 10, []);
  const [offset, setOffset] = useState(0);

  const { courts, count } = useLessorBrowseCourt({ limit, offset });
  const columns: ColumnsType<CourtTableItem> = [
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
      title: '小單位編號',
      dataIndex: 'court_number',
      sorter: (a, b) => a.court_number - b.court_number,
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
                  color: theme.dirt,
                  borderStyle: 'solid',
                  borderColor: theme.dirt,
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
  ];
  const dataSource = useMemo(
    () =>
      courts?.map((court) => ({
        key: String(court.court_id),
        ...court,
      })) ?? [],
    [courts],
  );
  const rowSelection: TableRowSelection<CourtTableItem> = {
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
