import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Dimensions, Text as RNText } from 'react-native';

import { Grid } from './grid';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('Grid', () => {
  it('Grid.Root renders its children with row/wrap layout', () => {
    render(
      <Grid.Root testID="grid-root">
        <RNText>grid content</RNText>
      </Grid.Root>,
    );

    expect(screen.getByText('grid content')).toBeTruthy();

    const style = flattenStyle(screen.getByTestId('grid-root').props.style);

    expect(style.flexDirection).toBe('row');
    expect(style.flexWrap).toBe('wrap');
  });

  describe('Grid.Item width formula', () => {
    // contentWidth = screenWidth - screenPadding*2
    // singleColWidth = (contentWidth - colGap*(columns-1)) / columns
    // itemWidth = singleColWidth*span + colGap*(span-1)
    const screenWidth = Dimensions.get('window').width;

    it('computes width for a single-span item with no padding/gap', () => {
      const columns = 2;
      const span = 1;
      const expectedWidth = screenWidth / columns;

      render(
        <Grid.Root>
          <Grid.Item testID="grid-item" span={span} columns={columns}>
            <RNText>item</RNText>
          </Grid.Item>
        </Grid.Root>,
      );

      const style = flattenStyle(screen.getByTestId('grid-item').props.style);

      expect(style.width).toBeCloseTo(expectedWidth, 5);
    });

    it('computes width accounting for screenPadding and colGap', () => {
      const columns = 3;
      const span = 1;
      const screenPadding = 16;
      const colGap = 8;

      const contentWidth = screenWidth - screenPadding * 2;
      const singleColWidth = (contentWidth - colGap * (columns - 1)) / columns;
      const expectedWidth = singleColWidth * span + colGap * (span - 1);

      render(
        <Grid.Root>
          <Grid.Item
            testID="grid-item"
            span={span}
            columns={columns}
            colGap={colGap}
            screenPadding={screenPadding}
          >
            <RNText>item</RNText>
          </Grid.Item>
        </Grid.Root>,
      );

      const style = flattenStyle(screen.getByTestId('grid-item').props.style);

      expect(style.width).toBeCloseTo(expectedWidth, 5);
    });

    it('computes width for a multi-span item accounting for internal colGap', () => {
      const columns = 4;
      const span = 2;
      const colGap = 10;

      const singleColWidth = (screenWidth - colGap * (columns - 1)) / columns;
      const expectedWidth = singleColWidth * span + colGap * (span - 1);

      render(
        <Grid.Root>
          <Grid.Item testID="grid-item" span={span} columns={columns} colGap={colGap}>
            <RNText>item</RNText>
          </Grid.Item>
        </Grid.Root>,
      );

      const style = flattenStyle(screen.getByTestId('grid-item').props.style);

      expect(style.width).toBeCloseTo(expectedWidth, 5);
    });

    it('a full-span item is wider than a single-span item out of the same columns', () => {
      render(
        <Grid.Root>
          <Grid.Item testID="single" span={1} columns={2}>
            <RNText>a</RNText>
          </Grid.Item>
          <Grid.Item testID="double" span={2} columns={2}>
            <RNText>b</RNText>
          </Grid.Item>
        </Grid.Root>,
      );

      const singleStyle = flattenStyle(screen.getByTestId('single').props.style);
      const doubleStyle = flattenStyle(screen.getByTestId('double').props.style);

      expect(doubleStyle.width as number).toBeCloseTo((singleStyle.width as number) * 2, 5);
    });
  });
});
