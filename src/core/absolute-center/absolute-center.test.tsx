import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

import { AbsoluteCenter } from './absolute-center';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('AbsoluteCenter', () => {
  it('renders its children', () => {
    render(
      <AbsoluteCenter>
        <RNText>absolute content</RNText>
      </AbsoluteCenter>,
    );

    expect(screen.getByText('absolute content')).toBeTruthy();
  });

  it('applies absolute positioning filling the parent and centers content', () => {
    render(
      <AbsoluteCenter testID="absolute-center">
        <RNText>content</RNText>
      </AbsoluteCenter>,
    );

    const style = flattenStyle(screen.getByTestId('absolute-center').props.style);

    expect(style.position).toBe('absolute');
    expect(style.top).toBe(0);
    expect(style.bottom).toBe(0);
    expect(style.left).toBe(0);
    expect(style.right).toBe(0);
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('center');
  });

  // TAbsoluteCenterProps = Omit<TBoxProps, 'style'>, so consumers using the
  // type-safe public API have no way to pass a conflicting style prop that
  // would override the fixed absolute-fill positioning above.

  it('passes through other Box props', () => {
    render(
      <AbsoluteCenter testID="absolute-center" bg="#000">
        <RNText>content</RNText>
      </AbsoluteCenter>,
    );

    const style = flattenStyle(screen.getByTestId('absolute-center').props.style);

    expect(style.backgroundColor).toBe('#000');
  });
});
