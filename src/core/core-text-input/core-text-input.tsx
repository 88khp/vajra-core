import React, { forwardRef, memo } from 'react';
import { TextInput } from 'react-native';

import { buildBoxStyle } from '../box/build-box-style';
import { TCoreTextInputProps } from './core-text-input-types';

const CoreTextInputComponent = forwardRef<TextInput, TCoreTextInputProps>(
  (
    {
      style,
      w,
      h,
      m,
      mx,
      my,
      mt,
      mb,
      ml,
      mr,
      p,
      px,
      py,
      pt,
      pb,
      pl,
      pr,
      bg,
      borderWidth,
      borderColor,
      rounded,
      color,
      fontSize,
      lineHeight,
      fontWeight,
      letterSpacing,
      placeholderColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderColor}
        style={[
          buildBoxStyle({
            w,
            h,
            m,
            mx,
            my,
            mt,
            mb,
            ml,
            mr,
            p,
            px,
            py,
            pt,
            pb,
            pl,
            pr,
            bg,
            borderWidth,
            borderColor,
            rounded,
          }),
          { color, fontSize, lineHeight, fontWeight, letterSpacing },
          // react-native-web renders TextInput as a real DOM <input>, which
          // gets a browser-default focus outline (usually blue) with no
          // native-platform equivalent to preserve — suppress it by default.
          { outlineWidth: 0 },
          style,
        ]}
        {...rest}
      />
    );
  },
);

CoreTextInputComponent.displayName = 'CoreTextInput';

export const CoreTextInput = memo(CoreTextInputComponent);
