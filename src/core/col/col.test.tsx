import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

import { Col } from './col';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Col', () => {
  it('renders its children', () => {
    render(
      <Col>
        <RNText>col content</RNText>
      </Col>,
    );

    expect(screen.getByText('col content')).toBeTruthy();
  });

  it('always applies flexDirection: column', () => {
    render(
      <Col testID="col">
        <RNText>content</RNText>
      </Col>,
    );

    const style = flattenStyle(screen.getByTestId('col').props.style);

    expect(style.flexDirection).toBe('column');
  });

  it('passes through Box props', () => {
    render(
      <Col testID="col" gap={4} p={2}>
        <RNText>content</RNText>
      </Col>,
    );

    const style = flattenStyle(screen.getByTestId('col').props.style);

    expect(style.gap).toBe(4);
    expect(style.padding).toBe(2);
  });
});
