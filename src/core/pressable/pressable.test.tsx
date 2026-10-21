import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

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

  it('drops to activeOpacity while pressed', () => {
    render(
      <CorePressable testID="pressable" activeOpacity={0.4} testOnly_pressed>
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.opacity).toBe(0.4);
  });

  it('defaults activeOpacity to 0.2', () => {
    render(
      <CorePressable testID="pressable" testOnly_pressed>
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.opacity).toBe(0.2);
  });

  it('keeps its opacity while pressed when activeOpacity is 1', () => {
    render(
      <CorePressable testID="pressable" activeOpacity={1} opacity={0.5} testOnly_pressed>
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.opacity).toBe(0.5);
  });

  it('is not dimmed when not pressed', () => {
    render(
      <CorePressable testID="pressable">
        <RNText>content</RNText>
      </CorePressable>,
    );

    const style = flattenStyle(screen.getByTestId('pressable').props.style);

    expect(style.opacity).toBeUndefined();
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
