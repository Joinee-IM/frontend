import { Form } from 'antd';
import { Fragment } from 'react';
import styled from 'styled-components';

import type { DataProps, GridProps } from '@/components/Grid/base';
import type { Type } from '@/utils/type';
import type { FormInstance } from 'antd';

import { gridCss, ItemWrapper, Label } from '@/components/Grid/base';

interface GridFormProps<T extends DataProps> extends Type<typeof GridFormWrapper>, GridProps<T> {
  form?: FormInstance;
}

const GridFormWrapper = styled(Form)`
  ${gridCss};
`;

export default function FormGrid<T extends DataProps>({
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
