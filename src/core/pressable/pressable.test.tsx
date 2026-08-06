import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text as RNText, TouchableOpacity } from 'react-native';

import { CorePressable } from './pressable';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('CorePressable', () => {
  it('renders its children', () => {
    render(
      <CorePressable>
        <RNText>press me</RNText>
      </CorePressable>,
    );

    expect(screen.getByText('press me')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();

    render(
      <CorePressable testID="pressable" onPress={onPress}>
        <RNText>press me</RNText>
      </CorePressable>,
    );

    fireEvent.press(screen.getByTestId('pressable'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();

    render(
      <CorePressable testID="pressable" onPress={onPress} disabled>
        <RNText>press me</RNText>
      </CorePressable>,
    );

    fireEvent.press(screen.getByTestId('pressable'));

    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies the opacity prop to style', () => {
    render(
      <CorePressable testID="pressable" opacity={0.5}>
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.opacity).toBe(0.5);
  });

  it('passes activeOpacity through to the underlying TouchableOpacity', () => {
    const { UNSAFE_getByType } = render(
      <CorePressable activeOpacity={0.2}>
        <RNText>content</RNText>
      </CorePressable>,
    );

    expect(UNSAFE_getByType(TouchableOpacity).props.activeOpacity).toBe(0.2);
  });

  it('resolves Box-style props (bg, rounded)', () => {
    render(
      <CorePressable testID="pressable" bg="#0000ff" rounded={6}>
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.backgroundColor).toBe('#0000ff');
    expect(style.borderRadius).toBe(6);
  });
});
