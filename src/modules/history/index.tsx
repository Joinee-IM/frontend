import { Table } from 'antd';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';

import type { schemas } from '@/services/type';
import type { StatusType } from '@/utils/function/map';
import type { ColumnsType } from 'antd/es/table';
import type { z } from 'zod';

import { DirectionRightIcon } from '@/assets/icons/Direction';
import { RoundTag, RoundTagWrapper } from '@/components/Tag';
import { PageTitle } from '@/components/Title';
import { useBrowseHistory } from '@/modules/history/services';
import { Container } from '@/modules/main/components';
import theme from '@/provider/theme/theme';

interface DataType extends z.infer<(typeof schemas)['ViewMyReservation']> {
  key: React.Key;
}

export default function History() {
  const { account_id } = useParams();
  const { histories } = useBrowseHistory({
    limit: 30,
    offset: 0,
    account_id: Number(account_id),
    sort_by: 'time',
    order: 'DESC',
  });
  const navigate = useNavigate();

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
      render: (_, { is_manager }) => (
        <div>
          {is_manager ? (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: theme.pink[500],
                }}
              >
                主揪
              </RoundTag>
            </RoundTagWrapper>
          ) : (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: theme.sub[300],
                }}
              >
                成員
              </RoundTag>
            </RoundTagWrapper>
          )}
        </div>
      ),
      sorter: (a, b) => Number(a.is_manager) - Number(b.is_manager),
      filters: [
        {
          text: '主揪',
          value: true,
        },
        {
          text: '成員',
          value: 'false',
        },
      ],
      onFilter: (value, record) => record.is_manager === value,
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
      // render: (text) => <div>{toStatus(text as StatusType)}</div>,
      render: (text) => (
        <div>
          {(text as StatusType) === 'CANCELLED' ? (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: 'white',
                  color: theme.gray[500],
                  borderStyle: 'solid',
                  borderColor: theme.gray[500],
                }}
              >
                已取消
              </RoundTag>
            </RoundTagWrapper>
          ) : (text as StatusType) === 'FINISHED' ? (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: 'white',
                  color: theme.brown,
                  borderStyle: 'solid',
                  borderColor: theme.brown,
                }}
              >
                已結束
              </RoundTag>
            </RoundTagWrapper>
          ) : (
            <RoundTagWrapper>
              <RoundTag
                style={{
                  backgroundColor: 'white',
                  color: theme.sub[500],
                  borderStyle: 'solid',
                  borderColor: theme.sub[500],
                }}
              >
                未結束
              </RoundTag>
            </RoundTagWrapper>
          )}
        </div>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <a onClick={() => navigate(`/reservation/info/${record.reservation_id}`)}>
          <DirectionRightIcon style={{ color: theme.gray[500] }} />
        </a>
      ),
    },
  ];

  const data = histories?.map((history) => ({
    key: String(history.reservation_id),
    ...history,
  }));

  return (
    <Container>
      <PageTitle>歷史紀錄</PageTitle>
      <Table dataSource={data} columns={columns}></Table>
    </Container>
  );
}
