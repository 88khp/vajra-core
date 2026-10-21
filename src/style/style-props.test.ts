import { ViewStyle } from 'react-native';

import {
  BOX_STYLE_SPEC,
  composeStyle,
  splitStyleProps,
  TEXT_INPUT_STYLE_SPEC,
  TEXT_STYLE_SPEC,
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

  it('includes the spec base style', () => {
    const [empty] = splitStyleProps({}, TEXT_INPUT_STYLE_SPEC);
    const [style] = splitStyleProps({ p: 16 }, TEXT_INPUT_STYLE_SPEC);
    const [boxStyle] = splitStyleProps({ p: 16 }, BOX_STYLE_SPEC);

    expect(empty).toEqual({ outlineWidth: 0 });
    expect(style).toEqual({ outlineWidth: 0, padding: 16 });
    expect(boxStyle).toEqual({ padding: 16 });
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
