import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { CoreTextInput } from './core-text-input';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('CoreTextInput', () => {
  it('renders with the given value', () => {
    render(<CoreTextInput testID="input" value="hello" onChangeText={() => {}} />);

    expect(screen.getByTestId('input').props.value).toBe('hello');
  });

  it('calls onChangeText when text changes', () => {
    const onChangeText = jest.fn();

    render(<CoreTextInput testID="input" value="" onChangeText={onChangeText} />);

    fireEvent.changeText(screen.getByTestId('input'), 'new text');

    expect(onChangeText).toHaveBeenCalledWith('new text');
  });

  it('resolves layout props (w, h, p) to style values', () => {
    render(<CoreTextInput testID="input" w={100} h={40} p={8} />);

    const style = flattenStyle(screen.getByTestId('input').props.style);

    expect(style.width).toBe(100);
    expect(style.height).toBe(40);
    expect(style.padding).toBe(8);
  });

  it('resolves text style props (color, fontSize)', () => {
    render(<CoreTextInput testID="input" color="#654321" fontSize={14} />);

    const style = flattenStyle(screen.getByTestId('input').props.style);

    expect(style.color).toBe('#654321');
    expect(style.fontSize).toBe(14);
  });

  it('passes placeholderColor through as placeholderTextColor', () => {
    render(<CoreTextInput testID="input" placeholderColor="#999999" />);

    expect(screen.getByTestId('input').props.placeholderTextColor).toBe('#999999');
  });
});
