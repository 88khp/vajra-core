import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text as RNText } from 'react-native';

import { Box } from './box';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Box', () => {
  it('renders its children', () => {
    render(
      <Box>
        <RNText>Inside box</RNText>
      </Box>,
    );

    expect(screen.getByText('Inside box')).toBeTruthy();
  });

  it('resolves bg to backgroundColor', () => {
    render(
      <Box testID="box" bg="#ff0000">
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.backgroundColor).toBe('#ff0000');
  });

  it('resolves rounded to borderRadius', () => {
    render(
      <Box testID="box" rounded={8}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.borderRadius).toBe(8);
  });

  it('resolves spacing shorthand props (p, m) to padding/margin', () => {
    render(
      <Box testID="box" p={16} m={8}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.padding).toBe(16);
    expect(style.margin).toBe(8);
  });

  it('resolves directional spacing props (px, py, mt, mb)', () => {
    render(
      <Box testID="box" px={4} py={6} mt={1} mb={2}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.paddingHorizontal).toBe(4);
    expect(style.paddingVertical).toBe(6);
    expect(style.marginTop).toBe(1);
    expect(style.marginBottom).toBe(2);
  });

  it('resolves flex layout props (direction, align, justify, gap, flex, wrap)', () => {
    render(
      <Box
        testID="box"
        direction="row"
        align="center"
        justify="space-between"
        gap={10}
        flex={1}
        wrap="wrap"
      >
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.flexDirection).toBe('row');
    expect(style.alignItems).toBe('center');
    expect(style.justifyContent).toBe('space-between');
    expect(style.gap).toBe(10);
    expect(style.flex).toBe(1);
    expect(style.flexWrap).toBe('wrap');
  });

  it('resolves position props (position, top, left, right, bottom)', () => {
    render(
      <Box testID="box" position="absolute" top={1} left={2} right={3} bottom={4}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.position).toBe('absolute');
    expect(style.top).toBe(1);
    expect(style.left).toBe(2);
    expect(style.right).toBe(3);
    expect(style.bottom).toBe(4);
  });

  it('resolves dimension props (w, h, minW, maxW, minH, maxH)', () => {
    render(
      <Box testID="box" w={100} h={50} minW={10} maxW={200} minH={5} maxH={100}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.width).toBe(100);
    expect(style.height).toBe(50);
    expect(style.minWidth).toBe(10);
    expect(style.maxWidth).toBe(200);
    expect(style.minHeight).toBe(5);
    expect(style.maxHeight).toBe(100);
  });

  it('falls back roundedT/roundedB corners to roundedL/roundedR when not given', () => {
    render(
      <Box testID="box" roundedL={5} roundedR={9}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.borderTopLeftRadius).toBe(5);
    expect(style.borderTopRightRadius).toBe(9);
    expect(style.borderBottomLeftRadius).toBe(5);
    expect(style.borderBottomRightRadius).toBe(9);
  });

  it('allows the style prop to override computed styles', () => {
    render(
      <Box testID="box" bg="red" style={{ backgroundColor: 'blue' }}>
        <RNText>content</RNText>
      </Box>,
    );

    const style = flattenStyle(screen.getByTestId('box').props.style);

    expect(style.backgroundColor).toBe('blue');
  });
});
