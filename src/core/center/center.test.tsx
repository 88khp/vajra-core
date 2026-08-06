import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

import { Center } from './center';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Center', () => {
  it('renders its children', () => {
    render(
      <Center>
        <RNText>centered content</RNText>
      </Center>,
    );

    expect(screen.getByText('centered content')).toBeTruthy();
  });

  it('applies alignItems and justifyContent center', () => {
    render(
      <Center testID="center">
        <RNText>content</RNText>
      </Center>,
    );

    const style = flattenStyle(screen.getByTestId('center').props.style);

    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('center');
  });

  it('passes through Box props', () => {
    render(
      <Center testID="center" bg="#fafafa">
        <RNText>content</RNText>
      </Center>,
    );

    const style = flattenStyle(screen.getByTestId('center').props.style);

    expect(style.backgroundColor).toBe('#fafafa');
  });
});
