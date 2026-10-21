import React, { memo } from 'react';
import { ViewStyle } from 'react-native';

import { Box } from '../box';
import { TSeparatorProps, TSeparatorVariant } from './separator-types';

const BORDER_STYLES: Record<TSeparatorVariant, ViewStyle> = {
  solid: { borderStyle: 'solid' },
  dashed: { borderStyle: 'dashed' },
  dotted: { borderStyle: 'dotted' },
};

const SeparatorComponent: React.FC<TSeparatorProps> = ({
  orientation = 'horizontal',
  thickness = 1,
  color = '#000',
  variant = 'solid',
}) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <Box
      w={isHorizontal ? '100%' : thickness}
      h={isHorizontal ? thickness : '100%'}
      borderColor={color}
      borderBottomWidth={isHorizontal ? thickness : 0}
      borderLeftWidth={isHorizontal ? 0 : thickness}
      style={BORDER_STYLES[variant]}
    />
  );
};

export const Separator = memo(SeparatorComponent);

Separator.displayName = 'Separator';
