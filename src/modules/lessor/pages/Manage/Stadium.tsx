import { Table } from 'antd';
import { isEqual } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type { StadiumTableItem, TableBaseProps } from '@/modules/lessor/pages/Manage/types';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import type { Key } from 'react';

import { DirectionRightIcon } from '@/assets/icons/Direction';
import { RippleButton } from '@/components';
import { useLessorBrowseStadium } from '@/modules/lessor/services';

export default function StadiumTable({
  setData,
  selectedRowKeys,
  setSelectedRowKeys,
}: TableBaseProps) {
  const navigate = useNavigate();

  const { stadiums } = useLessorBrowseStadium({ limit: 10, offset: 0 });
  const columns: ColumnsType<StadiumTableItem> = [
    {
      title: '區域',
      dataIndex: ['city_name', 'district_name'],
      render: (_, record) => record.city_name + record.district_name,
      sorter: (a, b) =>
        `${a.city_name}${a.district_name}`.localeCompare(`${b.city_name}${b.district_name}`),
    },
    {
      title: '場館名稱',
      dataIndex: 'stadium_name',
      sorter: (a, b) => a.stadium_name.localeCompare(b.stadium_name),
    },
    {
      title: '場地數量',
      dataIndex: 'venue_count',
      sorter: (a, b) => a.venue_count - b.venue_count,
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
          onClick={() => navigate(`venue/${record.stadium_id}`)}
        >
          <DirectionRightIcon />
        </RippleButton>
      ),
    },
  ];

  const dataSource = useMemo(
    () =>
      stadiums?.map((stadium) => ({
        key: String(stadium.stadium_id),
        ...stadium,
      })) ?? [],
    [stadiums],
  );

  const rowSelection: TableRowSelection<StadiumTableItem> = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: Key[]) => setSelectedRowKeys(newSelectedRowKeys),
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
  };

  useEffect(() => {
    setData?.((prev) => (isEqual(prev, dataSource) ? prev : dataSource));
  }, [dataSource, setData]);

  return <Table {...{ columns, dataSource, rowSelection }}></Table>;
}