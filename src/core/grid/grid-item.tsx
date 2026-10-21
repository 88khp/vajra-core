import React from 'react';

import { useDimensions } from '../../hooks';
import { Box } from '../box';
import { TGridItemProps } from './grid-types';

export const GridItem = ({
  span = 1,
  columns = 2,
  colGap = 0,
  screenPadding = 0,
  ...rest
}: TGridItemProps) => {
  const { getItemWidth } = useDimensions(screenPadding);
  const singleColWidth = getItemWidth(columns, colGap);
  const width = singleColWidth * span + colGap * (span - 1);

  return <Box w={width} {...rest} />;
};

GridItem.displayName = 'Grid.Item';
