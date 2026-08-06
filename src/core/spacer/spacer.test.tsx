import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { Spacer } from './spacer';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Spacer', () => {
  it('renders without crashing', () => {
    const { UNSAFE_getByType } = render(<Spacer />);

    expect(UNSAFE_getByType(View)).toBeTruthy();
  });

  it('renders a fixed-size box using the w prop', () => {
    const { UNSAFE_getByType } = render(<Spacer w={24} />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.width).toBe(24);
  });

  it('renders a fixed-size box using the h prop', () => {
    const { UNSAFE_getByType } = render(<Spacer h={16} />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.height).toBe(16);
  });

  it('applies both w and h when provided', () => {
    const { UNSAFE_getByType } = render(<Spacer w={10} h={20} />);

    const style = flattenStyle(UNSAFE_getByType(View).props.style);

    expect(style.width).toBe(10);
    expect(style.height).toBe(20);
  });
});
