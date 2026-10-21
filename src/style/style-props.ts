import { StyleProp } from 'react-native';

// Marks the rounded* side props, which fan out to two corner radii each.
const CORNER = '';

const SPACING_KEYS = {
  m: 'margin',
  mx: 'marginHorizontal',
  my: 'marginVertical',
  mt: 'marginTop',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mr: 'marginRight',
  p: 'padding',
  px: 'paddingHorizontal',
  py: 'paddingVertical',
  pt: 'paddingTop',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  pr: 'paddingRight',
};

const BOX_KEYS = {
  ...SPACING_KEYS,
  w: 'width',
  h: 'height',
  minW: 'minWidth',
  maxW: 'maxWidth',
  minH: 'minHeight',
  maxH: 'maxHeight',
  bg: 'backgroundColor',
  borderColor: 'borderColor',
  borderWidth: 'borderWidth',
  borderTopWidth: 'borderTopWidth',
  borderBottomWidth: 'borderBottomWidth',
  borderLeftWidth: 'borderLeftWidth',
  borderRightWidth: 'borderRightWidth',
  rounded: 'borderRadius',
  roundedT: CORNER,
  roundedB: CORNER,
  roundedL: CORNER,
  roundedR: CORNER,
  align: 'alignItems',
  justify: 'justifyContent',
  gap: 'gap',
  flex: 'flex',
  direction: 'flexDirection',
  wrap: 'flexWrap',
  position: 'position',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  overflow: 'overflow',
};

const TEXT_KEYS = {
  ...SPACING_KEYS,
  fontSize: 'fontSize',
  lineHeight: 'lineHeight',
  fontWeight: 'fontWeight',
  fontFamily: 'fontFamily',
  letterSpacing: 'letterSpacing',
  color: 'color',
  align: 'textAlign',
  decoration: 'textDecorationLine',
  transform: 'textTransform',
  flex: 'flex',
};

const TEXT_INPUT_KEYS = {
  ...SPACING_KEYS,
  w: 'width',
  h: 'height',
  bg: 'backgroundColor',
  borderColor: 'borderColor',
  borderWidth: 'borderWidth',
  rounded: 'borderRadius',
  color: 'color',
  fontSize: 'fontSize',
  lineHeight: 'lineHeight',
  fontWeight: 'fontWeight',
  letterSpacing: 'letterSpacing',
};

const SEPARATOR = '\u0001';

export type TStyleSpec = {
  keys: ReadonlyMap<string, string>;
  // Style every element of this kind starts from, e.g. TextInput's outline reset.
  base?: Readonly<Record<string, unknown>>;
  // The base is part of the built style, so it is part of the cache key too.
  cachePrefix: string;
};

const createStyleSpec = (
  keys: Record<string, string>,
  base?: Record<string, unknown>,
): TStyleSpec => ({
  keys: new Map(Object.entries(keys)),
  base,
  cachePrefix: base ? JSON.stringify(base) + SEPARATOR : '',
});

export const BOX_STYLE_SPEC = createStyleSpec(BOX_KEYS);

export const PRESSABLE_STYLE_SPEC = createStyleSpec({ ...BOX_KEYS, opacity: 'opacity' });

export const TEXT_STYLE_SPEC = createStyleSpec(TEXT_KEYS);

// react-native-web renders TextInput as a real DOM <input>, which gets a
// browser-default focus outline (usually blue) with no native-platform
// equivalent to preserve, so suppress it by default.
export const TEXT_INPUT_STYLE_SPEC = createStyleSpec(TEXT_INPUT_KEYS, { outlineWidth: 0 });

// Built styles are shared by value: every element with the same resolved style
// gets the same object back, so React Native's prop diff can skip it on update
// the way it does for StyleSheet.create styles.
const MAX_CACHED_STYLES = 1000;
const styleCache = new Map<string, object>();

/**
 * Splits component props into a style object and the props to forward, in one
 * pass. Only props that were passed with a defined value end up in the style.
 * `style` itself is left out of both; the caller merges it with `composeStyle`.
 *
 * Returns `undefined` for the style when no style props were passed.
 */
export const splitStyleProps = <TRest extends object, TStyle extends object = object>(
  props: object,
  spec: TStyleSpec,
): [TStyle | undefined, TRest] => {
  const rest: Record<string, unknown> = {};
  const style: Record<string, unknown> = spec.base ? { ...spec.base } : {};
  let key = '';
  let hasStyle = false;
  let cacheable = true;
  let roundedT: unknown;
  let roundedB: unknown;
  let roundedL: unknown;
  let roundedR: unknown;

  for (const prop in props) {
    const value = (props as Record<string, unknown>)[prop];
    const styleKey = spec.keys.get(prop);

    if (styleKey === undefined) {
      if (prop !== 'style') rest[prop] = value;
      continue;
    }

    if (value === undefined) continue;

    if (styleKey === CORNER) {
      if (prop === 'roundedT') roundedT = value;
      else if (prop === 'roundedB') roundedB = value;
      else if (prop === 'roundedL') roundedL = value;
      else roundedR = value;
      continue;
    }

    style[styleKey] = value;
    hasStyle = true;

    if (cacheable) {
      if (value !== null && typeof value === 'object') cacheable = false;
      else key += styleKey + SEPARATOR + typeof value + SEPARATOR + value + SEPARATOR;
    }
  }

  if (
    roundedT !== undefined ||
    roundedB !== undefined ||
    roundedL !== undefined ||
    roundedR !== undefined
  ) {
    const corners: [string, unknown][] = [
      ['borderTopLeftRadius', roundedT ?? roundedL],
      ['borderTopRightRadius', roundedT ?? roundedR],
      ['borderBottomLeftRadius', roundedB ?? roundedL],
      ['borderBottomRightRadius', roundedB ?? roundedR],
    ];

    for (const [styleKey, value] of corners) {
      if (value === undefined) continue;

      style[styleKey] = value;
      hasStyle = true;
      key += styleKey + SEPARATOR + typeof value + SEPARATOR + value + SEPARATOR;
    }
  }

  if (!hasStyle) {
    return [spec.base as TStyle | undefined, rest as TRest];
  }

  if (!cacheable) return [style as TStyle, rest as TRest];

  key = spec.cachePrefix + key;

  const cached = styleCache.get(key);

  if (cached !== undefined) return [cached as TStyle, rest as TRest];

  if (styleCache.size >= MAX_CACHED_STYLES) styleCache.clear();

  styleCache.set(key, style);

  return [style as TStyle, rest as TRest];
};

/**
 * Merges a built style with the caller's `style` prop without allocating an
 * array when one side is missing.
 */
export const composeStyle = <T>(built: T | undefined, style: StyleProp<T>): StyleProp<T> => {
  if (style == null) return built;
  if (built === undefined) return style;

  return [built, style];
};
