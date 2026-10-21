import React from 'react';

import { Box } from '../box';
import { TColProps } from './col-types';

const Col = (props: TColProps) => <Box direction="column" {...props} />;

Col.displayName = 'Col';

export { Col };
