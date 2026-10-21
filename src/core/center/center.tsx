import React from 'react';

import { Box } from '../box';
import { TCenterProps } from './center-types';

const Center = (props: TCenterProps) => <Box align="center" justify="center" {...props} />;

Center.displayName = 'Center';

export { Center };
