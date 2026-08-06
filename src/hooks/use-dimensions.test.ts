import { act, renderHook } from '@testing-library/react-native';
import { Dimensions, EmitterSubscription, ScaledSize } from 'react-native';

import { useDimensions } from './use-dimensions';

type TDimensionsChangeHandler = (event: { window: ScaledSize; screen: ScaledSize }) => void;

describe('useDimensions', () => {
  it('returns width/height from Dimensions.get("window")', () => {
    const { result } = renderHook(() => useDimensions());

    const window = Dimensions.get('window');

    expect(result.current.width).toBe(window.width);
    expect(result.current.height).toBe(window.height);
  });

  it('computes contentWidth by subtracting screenPadding on both sides', () => {
    const { result } = renderHook(() => useDimensions(20));

    const window = Dimensions.get('window');

    expect(result.current.contentWidth).toBe(window.width - 40);
  });

  it('getItemWidth divides contentWidth across columns, accounting for gap', () => {
    const { result } = renderHook(() => useDimensions(0));

    const window = Dimensions.get('window');
    const columns = 3;
    const gap = 12;
    const expected = (window.width - gap * (columns - 1)) / columns;

    expect(result.current.getItemWidth(columns, gap)).toBeCloseTo(expected, 5);
  });

  it('getCustomWidth divides using a custom marginHorizontal, accounting for gap', () => {
    const { result } = renderHook(() => useDimensions(0));

    const window = Dimensions.get('window');
    const columns = 2;
    const gap = 8;
    const marginHorizontal = 16;
    const expected = (window.width - marginHorizontal * 2 - gap * (columns - 1)) / columns;

    expect(result.current.getCustomWidth(columns, marginHorizontal, gap)).toBeCloseTo(expected, 5);
  });

  it('getCustomWidth defaults marginHorizontal to screenPadding when not provided', () => {
    const screenPadding = 24;
    const { result } = renderHook(() => useDimensions(screenPadding));

    const window = Dimensions.get('window');
    const columns = 2;
    const expected = (window.width - screenPadding * 2) / columns;

    expect(result.current.getCustomWidth(columns)).toBeCloseTo(expected, 5);
  });

  it('subscribes to Dimensions "change" events and updates width/height in response', () => {
    let changeHandler: TDimensionsChangeHandler | undefined;

    const addEventListenerSpy = jest
      .spyOn(Dimensions, 'addEventListener')
      .mockImplementation((eventName: string, handler: unknown) => {
        if (eventName === 'change') {
          changeHandler = handler as TDimensionsChangeHandler;
        }

        return { remove: jest.fn() } as unknown as EmitterSubscription;
      });

    const { result } = renderHook(() => useDimensions());

    expect(addEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    expect(changeHandler).toBeDefined();

    const nextWindow = { fontScale: 1, height: 800, scale: 2, width: 500 } as ScaledSize;

    act(() => {
      changeHandler?.({ screen: nextWindow, window: nextWindow });
    });

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(800);

    addEventListenerSpy.mockRestore();
  });

  it('removes the Dimensions subscription on unmount', () => {
    const remove = jest.fn();
    const addEventListenerSpy = jest
      .spyOn(Dimensions, 'addEventListener')
      .mockImplementation(() => ({ remove }) as unknown as EmitterSubscription);

    const { unmount } = renderHook(() => useDimensions());

    unmount();

    expect(remove).toHaveBeenCalledTimes(1);

    addEventListenerSpy.mockRestore();
  });
});
