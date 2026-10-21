import React, { memo } from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';

import { composeStyle, splitStyleProps, TEXT_STYLE_SPEC } from '../../style';
import { TTextProps } from './core-text-types';

// Memoized because text children are usually strings, which compare equal.
export const CoreText = memo((props: TTextProps) => {
  const [textStyle, rest] = splitStyleProps<TextProps, TextStyle>(props, TEXT_STYLE_SPEC);

  return <RNText {...rest} style={composeStyle(textStyle, props.style)} />;
});

CoreText.displayName = 'CoreText';
