import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { BOX_STYLE_SPEC, composeStyle, splitStyleProps } from '../../style';
import { TBoxProps } from './box-types';

// Not memoized: Box takes children, which are new elements on every parent
// render, so a props comparison would never skip a render.
export const Box = (props: TBoxProps) => {
  const [boxStyle, rest] = splitStyleProps<ViewProps, ViewStyle>(props, BOX_STYLE_SPEC);

  return <View {...rest} style={composeStyle(boxStyle, props.style)} />;
};

Box.displayName = 'Box';
