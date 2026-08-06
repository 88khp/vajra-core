import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Dimensions } from 'react-native';

import { GridItem } from './grid-item';

const flattenStyle = (style: unknown): Record<string, unknown> => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle));
  }

  return (style as Record<string, unknown>) ?? {};
};

describe('GridItem', () => {
  const originalGet = Dimensions.get;

  afterEach(() => {
    Dimensions.get = originalGet;
  });

  const mockWindowWidth = (width: number) => {
    Dimensions.get = jest.fn().mockReturnValue({
      width,
      height: 800,
      scale: 2,
      fontScale: 1,
    }) as unknown as typeof Dimensions.get;
  };

  it('computes width for a single-span item with default columns=2 and no gap/padding', () => {
    mockWindowWidth(400);

    render(<GridItem testID="item" />);

    const style = flattenStyle(screen.getByTestId('item').props.style);

    // contentWidth = 400, getItemWidth(2, 0) = 200, width = 200*1 + 0*(1-1) = 200
    expect(style.width).toBe(200);
  });

  it('computes width accounting for colGap across a span', () => {
    mockWindowWidth(400);

    render(<GridItem testID="item" span={2} columns={4} colGap={10} />);

    // contentWidth = 400
    // singleColWidth = (400 - 10*3) / 4 = (400-30)/4 = 92.5
    // width = 92.5*2 + 10*(2-1) = 185 + 10 = 195
    const style = flattenStyle(screen.getByTestId('item').props.style);

    expect(style.width).toBe(195);
  });

  it('subtracts screenPadding from both sides before computing width', () => {
    mockWindowWidth(400);

    render(<GridItem testID="item2" columns={2} screenPadding={20} />);

    // contentWidth = 400 - 20*2 = 360; getItemWidth(2,0) = 180
    const style = flattenStyle(screen.getByTestId('item2').props.style);

    expect(style.width).toBe(180);
  });

  it('spans the full row width when span equals columns', () => {
    mockWindowWidth(300);

    render(<GridItem testID="item3" span={3} columns={3} colGap={6} />);

    // singleColWidth = (300 - 6*2)/3 = (300-12)/3 = 96
    // width = 96*3 + 6*(3-1) = 288 + 12 = 300
    const style = flattenStyle(screen.getByTestId('item3').props.style);

    expect(style.width).toBe(300);
  });
});
