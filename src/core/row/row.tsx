import React from 'react';

import { Box } from '../box';
import { TRowProps } from './row-types';

const Row = (props: TRowProps) => <Box direction="row" {...props} />;

Row.displayName = 'Row';

export { Row };
