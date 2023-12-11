import { Table as AntdTable } from 'antd';

import type { AnyObject } from 'antd/es/_util/type';
import type { TableProps } from 'antd/es/table';

type Table<T> = TableProps<T>;

export default function Table<T extends AnyObject>({ columns, dataSource, onChange }: Table<T>) {
  console.log(dataSource);
  return <AntdTable<T> columns={columns} dataSource={dataSource} onChange={onChange} />;
}
