import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { CoreText } from './core-text';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('CoreText', () => {
  it('renders its text content', () => {
    render(<CoreText>Hello world</CoreText>);

    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('resolves typography props to style values', () => {
    render(
      <CoreText testID="text" fontSize={18} fontWeight="700" color="#112233">
        Styled text
      </CoreText>,
    );

    const style = flattenStyle(screen.getByTestId('text').props.style);

    expect(style.fontSize).toBe(18);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe('#112233');
  });

  it('resolves align and decoration props', () => {
    render(
      <CoreText testID="text" align="center" decoration="underline">
        Styled text
      </CoreText>,
    );

    const style = flattenStyle(screen.getByTestId('text').props.style);

    expect(style.textAlign).toBe('center');
    expect(style.textDecorationLine).toBe('underline');
  });

  it('resolves spacing shorthand props', () => {
    render(
      <CoreText testID="text" p={4} m={8}>
        Styled text
      </CoreText>,
    );

    const style = flattenStyle(screen.getByTestId('text').props.style);

    expect(style.padding).toBe(4);
    expect(style.margin).toBe(8);
  });
});
