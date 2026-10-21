import React from 'react';

import { Box } from '../box';
import { TAbsoluteCenterProps } from './absolute-center-types';

// Passed as Box props rather than an inline style object, so the fill and the
// centering resolve to one cached style.
export const AbsoluteCenter = (props: TAbsoluteCenterProps) => (
  <Box
    position="absolute"
    top={0}
    bottom={0}
    left={0}
    right={0}
    align="center"
    justify="center"
    {...props}
  />
);

AbsoluteCenter.displayName = 'AbsoluteCenter';
