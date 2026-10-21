import React from 'react';

import { Box } from '../box';
import { TGridRootProps } from './grid-types';

export const GridRoot = (props: TGridRootProps) => <Box direction="row" wrap="wrap" {...props} />;

GridRoot.displayName = 'Grid.Root';
