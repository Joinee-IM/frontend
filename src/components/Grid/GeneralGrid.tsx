import { Fragment } from 'react';
import styled from 'styled-components';

import type { DataProps, GridProps } from '@/components/Grid/base';
import type { Type } from '@/utils/type';

import { gridCss, ItemWrapper, Label } from '@/components/Grid/base';

interface GeneralFormProps<T extends DataProps>
  extends Type<typeof GridFormWrapper>,
    GridProps<T> {}

const GridFormWrapper = styled.div`
  ${gridCss};
`;

export default function GeneralGrid<T extends DataProps>({
  data,
  labelStyles,
  style,
  ...rest
}: GeneralFormProps<T>) {
  return (
    <GridFormWrapper {...rest} style={{ width: '100%', ...style }}>
      {Object.keys(data).map((column, index) => (
        <Fragment key={index}>
          <Label style={labelStyles?.[column]}>{String(column)}</Label>
          <ItemWrapper>{data[column]}</ItemWrapper>
        </Fragment>
      ))}
    </GridFormWrapper>
  );
}
