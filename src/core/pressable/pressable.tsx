import React from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, ViewStyle } from 'react-native';

import { composeStyle, PRESSABLE_STYLE_SPEC, splitStyleProps } from '../../style';
import { TCorePressableProps } from './pressable-types';

const DEFAULT_ACTIVE_OPACITY = 0.2;

const pressedStyles = new Map<number, ViewStyle>();

const getPressedStyle = (activeOpacity: number): ViewStyle => {
  let pressedStyle = pressedStyles.get(activeOpacity);

  if (pressedStyle === undefined) {
    pressedStyle = { opacity: activeOpacity };
    pressedStyles.set(activeOpacity, pressedStyle);
  }

  return pressedStyle;
};

// Built on Pressable rather than TouchableOpacity, which allocates an
// Animated.Value and an animated view per instance. Press feedback is an
// opacity change while pressed, without the fade animation.
//
// Not memoized: it takes children, so a props comparison would never skip a render.
export const CorePressable = ({
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  ...props
}: TCorePressableProps) => {
  const [boxStyle, rest] = splitStyleProps<PressableProps, ViewStyle>(props, PRESSABLE_STYLE_SPEC);
  const style = composeStyle(boxStyle, props.style);

  if (activeOpacity === 1) return <Pressable {...rest} style={style} />;

  const pressedStyle = getPressedStyle(activeOpacity);

  return (
    <Pressable
      {...rest}
      style={({ pressed }: PressableStateCallbackType) => (pressed ? [style, pressedStyle] : style)}
    />
  );
};

CorePressable.displayName = 'CorePressable';
