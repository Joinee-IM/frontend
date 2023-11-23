import { Form } from 'antd';
import { Fragment } from 'react';
import styled from 'styled-components';

import type { FormInstance } from 'antd';

type DataProps = Record<string, { value: string; label: string }>;

interface GridFormProps<T extends DataProps> {
  form: FormInstance;
  columns: (keyof T)[];
  data: T;
}

const GridFormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  align-items: center;
  row-gap: 10px;
`;

const Label = styled.div`
  grid-column: 1 / 2;
  font-weight: 600;
`;

const FormItem = styled(Form.Item)`
  grid-column: 2 / 3;
  margin: 0;
`;

export default function GridForm<T extends DataProps>({ form, columns, data }: GridFormProps<T>) {
  return (
    <GridFormWrapper form={form} style={{ width: '100%' }}>
      {columns.map((column, index) => (
        <Fragment key={index}>
          <Label>{data[column].label}</Label>
          <FormItem name={column}>{data[column].value}</FormItem>
        </Fragment>
      ))}
    </GridFormWrapper>
  );
}
