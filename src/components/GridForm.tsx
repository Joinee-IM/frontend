import { Form } from 'antd';
import { Fragment } from 'react';
import styled from 'styled-components';

import type { Type } from '@/utils/type';
import type { FormInstance } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

type DataProps = Record<string, ReactNode | string>;

interface GridFormProps<T extends DataProps> extends Type<typeof GridFormWrapper> {
  form?: FormInstance;
  data: T;
  labelStyles?: { [key in keyof T]?: CSSProperties };
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

export default function GridForm<T extends DataProps>({
  form,
  data,
  labelStyles,
  style,
  ...rest
}: GridFormProps<T>) {
  return (
    <GridFormWrapper {...rest} form={form} style={{ width: '100%', ...style }}>
      {Object.keys(data).map((column, index) => (
        <Fragment key={index}>
          <Label style={labelStyles?.[column]}>{String(column)}</Label>
          <ItemWrapper>{data[column]}</ItemWrapper>
        </Fragment>
      ))}
    </GridFormWrapper>
  );
}
