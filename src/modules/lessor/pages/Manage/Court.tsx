import { Table } from 'antd';
import { isEqual } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { CourtTableItem, TableBaseProps } from '@/modules/lessor/pages/Manage/types';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';

import { DirectionRightIcon } from '@/assets/icons/Direction';
import { RippleButton } from '@/components';
import { useLessorBrowseCourt } from '@/modules/lessor/services';

export default function CourtTable({
  setData,
  selectedRowKeys,
  setSelectedRowKeys,
}: TableBaseProps) {
  const navigate = useNavigate();

  const { courts } = useLessorBrowseCourt({ limit: 10, offset: 0 });
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
      render: (_, { is_published }) => <div>{is_published ? '已上架' : '已下架'}</div>,
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
          onClick={() => navigate(`venue/${record.court_id}`)}
        >
          <DirectionRightIcon />
        </RippleButton>
      ),
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

  return <Table {...{ columns, dataSource, rowSelection }}></Table>;
}