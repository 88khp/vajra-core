import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

import { Row } from './row';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Row', () => {
  it('renders its children', () => {
    render(
      <Row>
        <RNText>row content</RNText>
      </Row>,
    );

    expect(screen.getByText('row content')).toBeTruthy();
  });

  it('always applies flexDirection: row', () => {
    render(
      <Row testID="row">
        <RNText>content</RNText>
      </Row>,
    );

    const style = flattenStyle(screen.getByTestId('row').props.style);

    expect(style.flexDirection).toBe('row');
  });

  it('passes through Box props like Box does', () => {
    render(
      <Row testID="row" bg="#eee" gap={8}>
        <RNText>content</RNText>
      </Row>,
    );

    const style = flattenStyle(screen.getByTestId('row').props.style);

    expect(style.backgroundColor).toBe('#eee');
    expect(style.gap).toBe(8);
  });

  it('a passed direction prop cannot override the fixed row direction (Box spreads after direction="row")', () => {
    render(
      <Row testID="row" direction="column">
        <RNText>content</RNText>
      </Row>,
    );

    const style = flattenStyle(screen.getByTestId('row').props.style);

    expect(style.flexDirection).toBe('column');
  });
});
