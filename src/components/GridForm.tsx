import { Form } from 'antd';
import { Fragment } from 'react';
import styled from 'styled-components';

import type { FormInstance } from 'antd';
import type { ReactNode } from 'react';

type DataProps = Record<string, ReactNode | string>;

interface GridFormProps<T extends DataProps> {
  form: FormInstance;
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

const ItemWrapper = styled.div`
  grid-column: 2 / 3;
  &,
  * {
    margin: 0;
  }
`;

export default function GridForm<T extends DataProps>({ form, data }: GridFormProps<T>) {
  return (
    <GridFormWrapper form={form} style={{ width: '100%' }}>
      {Object.keys(data).map((column, index) => (
        <Fragment key={index}>
          <Label>{String(column)}</Label>
          <ItemWrapper>{data[column]}</ItemWrapper>
        </Fragment>
      ))}
    </GridFormWrapper>
  );
}
