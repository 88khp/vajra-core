import React, { forwardRef, memo } from 'react';
import { TextInput, TextInputProps, TextStyle } from 'react-native';

import { composeStyle, splitStyleProps, TEXT_INPUT_STYLE_SPEC } from '../../style';
import { TCoreTextInputProps } from './core-text-input-types';

const CoreTextInputComponent = forwardRef<TextInput, TCoreTextInputProps>(
  ({ placeholderColor, ...props }, ref) => {
    const [inputStyle, rest] = splitStyleProps<TextInputProps, TextStyle>(
      props,
      TEXT_INPUT_STYLE_SPEC,
    );

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderColor}
        {...rest}
        style={composeStyle(inputStyle, props.style)}
      />
    );
  },
);

CoreTextInputComponent.displayName = 'CoreTextInput';

export const CoreTextInput = memo(CoreTextInputComponent);
