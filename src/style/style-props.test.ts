import { ViewStyle } from 'react-native';

import {
  BOX_STYLE_SPEC,
  composeStyle,
  PRESSABLE_STYLE_SPEC,
  splitStyleProps,
  TEXT_INPUT_STYLE_SPEC,
  TEXT_STYLE_SPEC,
  TStyleResolver,
} from './style-props';

describe('splitStyleProps', () => {
  it('writes only the style keys that were passed with a value', () => {
    const [style] = splitStyleProps({ p: 16, bg: '#fff', m: undefined }, BOX_STYLE_SPEC);

    expect(style).toEqual({ padding: 16, backgroundColor: '#fff' });
  });

  it('forwards non-style props and drops style', () => {
    const onLayout = jest.fn();
    const [, rest] = splitStyleProps(
      { p: 16, testID: 'box', onLayout, style: { opacity: 1 } },
      BOX_STYLE_SPEC,
    );

    expect(rest).toEqual({ testID: 'box', onLayout });
  });

  it('returns undefined when no style props were passed', () => {
    const [style] = splitStyleProps({ testID: 'box', p: undefined }, BOX_STYLE_SPEC);

    expect(style).toBeUndefined();
  });

  it('returns the same object for the same values', () => {
    const [first] = splitStyleProps({ p: 16, rounded: 12, bg: '#fff' }, BOX_STYLE_SPEC);
    const [second] = splitStyleProps({ p: 16, rounded: 12, bg: '#fff' }, BOX_STYLE_SPEC);
    const [other] = splitStyleProps({ p: 16, rounded: 12, bg: '#000' }, BOX_STYLE_SPEC);

    expect(second).toBe(first);
    expect(other).not.toBe(first);
  });

  it('does not share entries between values of different types', () => {
    const [numeric] = splitStyleProps({ fontWeight: 700 }, TEXT_STYLE_SPEC);
    const [text] = splitStyleProps({ fontWeight: '700' }, TEXT_STYLE_SPEC);

    expect(numeric).toEqual({ fontWeight: 700 });
    expect(text).toEqual({ fontWeight: '700' });
  });

  it('maps the same prop name per spec', () => {
    const [box] = splitStyleProps({ align: 'center' }, BOX_STYLE_SPEC);
    const [text] = splitStyleProps({ align: 'center' }, TEXT_STYLE_SPEC);

    expect(box).toEqual({ alignItems: 'center' });
    expect(text).toEqual({ textAlign: 'center' });
  });

  it('does not cache styles holding object values', () => {
    const animated = {};
    const [first] = splitStyleProps({ w: animated }, BOX_STYLE_SPEC);
    const [second] = splitStyleProps({ w: animated }, BOX_STYLE_SPEC);

    expect(second).not.toBe(first);
    expect(second).toEqual({ width: animated });
  });

  it('fans rounded sides out to corners, with top/bottom winning over left/right', () => {
    const [style] = splitStyleProps({ roundedT: 4, roundedL: 8 }, BOX_STYLE_SPEC);

    expect(style).toEqual({
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 8,
    });
  });

  it("leaves the spec's omit props out of both the style and the forwarded props", () => {
    const [style, rest] = splitStyleProps(
      { activeOpacity: 0.5, p: 4, testID: 'button' },
      PRESSABLE_STYLE_SPEC,
    );

    expect(style).toEqual({ padding: 4 });
    expect(rest).toEqual({ testID: 'button' });
  });

  it('keeps a style apart from a longer one that starts with the same props', () => {
    const [short] = splitStyleProps({ p: 2 }, BOX_STYLE_SPEC);
    const [long] = splitStyleProps({ p: 2, m: 3 }, BOX_STYLE_SPEC);
    const [shortAgain] = splitStyleProps({ p: 2 }, BOX_STYLE_SPEC);

    expect(short).toEqual({ padding: 2 });
    expect(long).toEqual({ padding: 2, margin: 3 });
    expect(shortAgain).toBe(short);
  });

  it('keeps returning correct styles after the cache fills up', () => {
    for (let i = 0; i < 1100; i += 1) {
      expect(splitStyleProps({ w: i }, BOX_STYLE_SPEC)[0]).toEqual({ width: i });
    }
  });

  it('keeps each rounded side apart in the cache', () => {
    const [top] = splitStyleProps({ roundedT: 6 }, BOX_STYLE_SPEC);
    const [bottom] = splitStyleProps({ roundedB: 6 }, BOX_STYLE_SPEC);

    expect(top).toEqual({ borderTopLeftRadius: 6, borderTopRightRadius: 6 });
    expect(bottom).toEqual({ borderBottomLeftRadius: 6, borderBottomRightRadius: 6 });
  });

  it('includes the spec base style', () => {
    const [empty] = splitStyleProps({}, TEXT_INPUT_STYLE_SPEC);
    const [style] = splitStyleProps({ p: 16 }, TEXT_INPUT_STYLE_SPEC);
    const [boxStyle] = splitStyleProps({ p: 16 }, BOX_STYLE_SPEC);

    expect(empty).toEqual({ outlineWidth: 0 });
    expect(style).toEqual({ outlineWidth: 0, padding: 16 });
    expect(boxStyle).toEqual({ padding: 16 });
  });
});

describe('splitStyleProps with a resolver', () => {
  const colors: Record<string, string> = { primary: '#00f', surface: '#fff' };
  const createResolver = (scale: Record<string, string>): TStyleResolver =>
    jest.fn((prop: string, value: unknown) => (prop === 'bg' ? scale[value as string] : value));

  it('resolves values before they go in the style', () => {
    const [style, rest] = splitStyleProps(
      { bg: 'primary', p: 16, testID: 'box' },
      BOX_STYLE_SPEC,
      createResolver(colors),
    );

    expect(style).toEqual({ backgroundColor: '#00f', padding: 16 });
    expect(rest).toEqual({ testID: 'box' });
  });

  it('skips resolving on a cache hit and returns the same object', () => {
    const resolve = createResolver(colors);
    const [first] = splitStyleProps({ bg: 'surface', p: 8 }, BOX_STYLE_SPEC, resolve);
    const calls = (resolve as jest.Mock).mock.calls.length;
    const [second] = splitStyleProps({ bg: 'surface', p: 8 }, BOX_STYLE_SPEC, resolve);

    expect(second).toBe(first);
    expect((resolve as jest.Mock).mock.calls.length).toBe(calls);
  });

  it('caches per resolver, so the same tokens resolve per theme', () => {
    const light = createResolver({ primary: '#fff' });
    const dark = createResolver({ primary: '#000' });
    const [lightStyle] = splitStyleProps({ bg: 'primary' }, BOX_STYLE_SPEC, light);
    const [darkStyle] = splitStyleProps({ bg: 'primary' }, BOX_STYLE_SPEC, dark);

    expect(lightStyle).toEqual({ backgroundColor: '#fff' });
    expect(darkStyle).toEqual({ backgroundColor: '#000' });
  });

  it('leaves out values that resolve to undefined', () => {
    const resolve = createResolver(colors);
    const [style] = splitStyleProps({ bg: 'missing', p: 4 }, BOX_STYLE_SPEC, resolve);
    const [empty] = splitStyleProps({ bg: 'missing' }, BOX_STYLE_SPEC, resolve);

    expect(style).toEqual({ padding: 4 });
    expect(empty).toBeUndefined();
  });

  it('resolves rounded sides before fanning them out', () => {
    const resolve: TStyleResolver = (prop, value) => (prop === 'roundedT' ? 10 : value);
    const [style] = splitStyleProps({ roundedT: 'r-2' }, BOX_STYLE_SPEC, resolve);

    expect(style).toEqual({ borderTopLeftRadius: 10, borderTopRightRadius: 10 });
  });
});

describe('composeStyle', () => {
  const built: ViewStyle = { padding: 16 };
  const user: ViewStyle = { margin: 4 };

  it('returns the built style alone when there is no user style', () => {
    expect(composeStyle(built, undefined)).toBe(built);
  });

  it('returns the user style alone when nothing was built', () => {
    expect(composeStyle(undefined, user)).toBe(user);
  });

  it('puts the user style last when both exist', () => {
    expect(composeStyle(built, user)).toEqual([built, user]);
  });
});
