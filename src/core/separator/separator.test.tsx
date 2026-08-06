import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { Separator } from './separator';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Separator', () => {
  it('renders without crashing', () => {
    const { UNSAFE_getByType } = render(<Separator />);

    expect(UNSAFE_getByType(View)).toBeTruthy();
  });

  it('defaults to a horizontal orientation', () => {
    const { UNSAFE_getByType } = render(<Separator />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.width).toBe('100%');
    expect(style.height).toBe(1);
    expect(style.borderBottomWidth).toBe(1);
    expect(style.borderLeftWidth).toBe(0);
  });

  it('defaults color to #000', () => {
    const { UNSAFE_getByType } = render(<Separator />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.borderColor).toBe('#000');
  });

  it('applies vertical orientation styles', () => {
    const { UNSAFE_getByType } = render(<Separator orientation="vertical" thickness={2} />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.width).toBe(2);
    expect(style.height).toBe('100%');
    expect(style.borderLeftWidth).toBe(2);
    expect(style.borderBottomWidth).toBe(0);
  });

  it('resolves the color prop to borderColor', () => {
    const { UNSAFE_getByType } = render(<Separator color="#abcdef" />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.borderColor).toBe('#abcdef');
  });

  it('resolves the variant prop to borderStyle', () => {
    const { UNSAFE_getByType } = render(<Separator variant="dashed" />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.borderStyle).toBe('dashed');
  });
});
