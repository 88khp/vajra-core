import React from 'react';
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { composeStyle, PRESSABLE_STYLE_SPEC, splitStyleProps } from '../../style';
import { TCorePressableProps } from './pressable-types';

export const DEFAULT_ACTIVE_OPACITY = 0.2;

type TPressableStyle = PressableProps['style'];

const pressedStyles = new Map<number, ViewStyle>();

const getPressedStyle = (activeOpacity: number): ViewStyle => {
  let pressedStyle = pressedStyles.get(activeOpacity);

  if (pressedStyle === undefined) {
    pressedStyle = { opacity: activeOpacity };
    pressedStyles.set(activeOpacity, pressedStyle);
  }

  return pressedStyle;
};

const createPressedCallback =
  (style: StyleProp<ViewStyle>, pressedStyle: ViewStyle): TPressableStyle =>
  ({ pressed }: PressableStateCallbackType) =>
    pressed ? [style, pressedStyle] : style;

// One callback per (style object, activeOpacity), so a Pressable whose style is
// unchanged passes the same style prop on every render.
const pressedCallbacks = new WeakMap<object, Map<number, TPressableStyle>>();
const unstyledPressedCallbacks = new Map<number, TPressableStyle>();

/**
 * Returns a Pressable `style` prop that drops to `activeOpacity` while pressed.
 * The returned callback is shared per style object, so pass a cached style
 * (e.g. from `splitStyleProps`) to keep the prop stable across renders.
 * `activeOpacity` of 1 returns the style unchanged.
 */
export const getPressableStyle = (
  style: StyleProp<ViewStyle>,
  activeOpacity: number = DEFAULT_ACTIVE_OPACITY,
): TPressableStyle => {
  if (activeOpacity === 1) return style;

  let byOpacity: Map<number, TPressableStyle> | undefined;

  if (style == null) {
    byOpacity = unstyledPressedCallbacks;
  } else if (typeof style === 'object' && !Array.isArray(style)) {
    byOpacity = pressedCallbacks.get(style);

    if (byOpacity === undefined) {
      byOpacity = new Map();
      pressedCallbacks.set(style, byOpacity);
    }
  } else {
    // Arrays are built per render by `composeStyle`, so caching them never hits.
    return createPressedCallback(style, getPressedStyle(activeOpacity));
  }

  let callback = byOpacity.get(activeOpacity);

  if (callback === undefined) {
    callback = createPressedCallback(style, getPressedStyle(activeOpacity));
    byOpacity.set(activeOpacity, callback);
  }

  return callback;
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

  return (
    <Pressable
      {...rest}
      style={getPressableStyle(composeStyle(boxStyle, props.style), activeOpacity)}
    />
  );
};

CorePressable.displayName = 'CorePressable';
