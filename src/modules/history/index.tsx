import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import type { schemas } from '@/services/type';
import type { StatusType } from '@/utils/function/map/toStatus';
import type { ColumnsType } from 'antd/es/table';
import type { z } from 'zod';

import { DirectionRightIcon } from '@/assets/icons/Direction';
import Table from '@/components/Table';
import { useBrowseHistory } from '@/modules/history/services';
import { toStatus } from '@/utils/function/map';

interface DataType extends z.infer<(typeof schemas)['ViewMyReservation']> {
  key: React.Key;
}
const Container = styled.div`
  padding: 60px clamp(30px, 12.7vw, 200px);
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
`;

export default function History() {
  const { account_id } = useParams();
  const { histories } = useBrowseHistory(Number(account_id), { limit: 10, offset: 0 });

  const columns: ColumnsType<DataType> = [
    {
      title: '時間',
      dataIndex: ['start_time', 'endTime'],
      render: (_, record) => (
        <div>
          {format(new Date(record.start_time), 'yyyy/MM/dd HH:mm') +
            `-${format(new Date(record.end_time), 'HH:mm')}`}
        </div>
      ),
      sorter: (a, b) => a.start_time.localeCompare(b.start_time),
    },
    {
      title: '場館名稱',
      dataIndex: 'stadium_name',
      // filters: [
      //   {
      //     text: 'Joe',
      //     value: 'Joe',
      //   },
      //   {
      //     text: 'Jim',
      //     value: 'Jim',
      //   },
      //   {
      //     text: 'Submenu',
      //     value: 'Submenu',
      //     children: [
      //       {
      //         text: 'Green',
      //         value: 'Green',
      //       },
      //       {
      //         text: 'Black',
      //         value: 'Black',
      //       },
      //     ],
      //   },
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.name.startsWith(value),
      // sorter: (a, b) => a.name.length - b.name.length,
      sorter: (a, b) => a.stadium_name.localeCompare(b.stadium_name),
    },
    {
      title: '場地',
      dataIndex: 'venue_name',
      sorter: (a, b) => a.venue_name.localeCompare(b.venue_name),
    },
    {
      title: '我的角色',
      dataIndex: 'is_manager',
      render: (_, { is_manager }) => <div>{is_manager ? '主揪' : '成員'}</div>,
      sorter: (a, b) => Number(a.is_manager) - Number(b.is_manager),
    },
    {
      title: '徵球友',
      dataIndex: 'vacancy',
      render: (text) => <div>{text ? '是' : '否'}</div>,
      sorter: (a, b) => Number(a.vacancy) - Number(b.vacancy),
    },
    {
      title: '狀態',
      dataIndex: 'status',
      render: (text) => <div>{toStatus(text as StatusType)}</div>,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      dataIndex: '',
      key: 'x',
      render: () => (
        <a>
          <DirectionRightIcon />
        </a>
      ),
    },
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   defaultSortOrder: 'descend',
    //   // sorter: (a, b) => a.age - b.age,
    // },
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   filters: [
    //     {
    //       text: 'London',
    //       value: 'London',
    //     },
    //     {
    //       text: 'New York',
    //       value: 'New York',
    //     },
    //   ],
    //   // onFilter: (value: string, record) => record.address.startsWith(value),
    // },
  ];

  const data = histories?.map((history) => ({
    key: String(history.reservation_id),
    ...history,
  }));

  return (
    <Container>
      <Table dataSource={data} columns={columns}></Table>
    </Container>
  );
}
