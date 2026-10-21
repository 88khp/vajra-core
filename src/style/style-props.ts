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

export type TStyleSpec = {
  keys: ReadonlyMap<string, string>;
  // Style every element of this kind starts from, e.g. TextInput's outline reset.
  base?: Readonly<Record<string, unknown>>;
  /**
   * @deprecated Unused since 3.0.0-alpha.1: styles are cached per spec, so the
   * base no longer needs to be part of a cache key. Kept so existing specs
   * still type-check.
   */
  cachePrefix?: string;
};

const createStyleSpec = (
  keys: Record<string, string>,
  base?: Record<string, unknown>,
): TStyleSpec => ({
  keys: new Map(Object.entries(keys)),
  base,
});

export const BOX_STYLE_SPEC = createStyleSpec(BOX_KEYS);

export const PRESSABLE_STYLE_SPEC = createStyleSpec({ ...BOX_KEYS, opacity: 'opacity' });

export const TEXT_STYLE_SPEC = createStyleSpec(TEXT_KEYS);

// react-native-web renders TextInput as a real DOM <input>, which gets a
// browser-default focus outline (usually blue) with no native-platform
// equivalent to preserve, so suppress it by default.
export const TEXT_INPUT_STYLE_SPEC = createStyleSpec(TEXT_INPUT_KEYS, { outlineWidth: 0 });

/**
 * Maps a style prop's passed value to the value that goes in the style, e.g. a
 * theme token name to its color. Returning `undefined` leaves the key out.
 *
 * A resolver must be pure and stable: styles are cached per resolver by the
 * values passed in, so create one per theme rather than one per render.
 */
export type TStyleResolver = (prop: string, value: unknown) => unknown;

// Built styles are shared by value: every element with the same style props
// gets the same object back, so React Native's prop diff can skip it on update
// the way it does for StyleSheet.create styles.
//
// Each cache is a tree with one level per passed style prop, keyed by style key
// and then by value, so a lookup is a few Map reads on values that are already
// there (token names, numbers) instead of building a string key. Caches are
// kept per spec, and per resolver for resolved styles, so a cache hit skips
// resolving too.
type TStyleNode = {
  next: Map<string, Map<unknown, TStyleNode>> | undefined;
  style: object | undefined;
};

type TStyleCache = { root: TStyleNode; size: number };

const MAX_CACHED_STYLES = 1000;
const styleCaches = new WeakMap<TStyleSpec, TStyleCache>();
const resolvedStyleCaches = new WeakMap<TStyleResolver, WeakMap<TStyleSpec, TStyleCache>>();

const createNode = (): TStyleNode => ({ next: undefined, style: undefined });

const getStyleCache = (spec: TStyleSpec, resolve: TStyleResolver | undefined): TStyleCache => {
  let bySpec: WeakMap<TStyleSpec, TStyleCache> | undefined = styleCaches;

  if (resolve !== undefined) {
    bySpec = resolvedStyleCaches.get(resolve);

    if (bySpec === undefined) {
      bySpec = new WeakMap();
      resolvedStyleCaches.set(resolve, bySpec);
    }
  }

  let cache = bySpec.get(spec);

  if (cache === undefined) {
    cache = { root: createNode(), size: 0 };
    bySpec.set(spec, cache);
  }

  return cache;
};

// Corner props share one marker style key, so they are keyed by prop name.
const cacheKeyFor = (prop: string, styleKey: string): string =>
  styleKey === CORNER ? prop : styleKey;

const insertStyle = (cache: TStyleCache, props: object, spec: TStyleSpec, style: object) => {
  if (cache.size >= MAX_CACHED_STYLES) {
    cache.root = createNode();
    cache.size = 0;
  }

  let node = cache.root;

  for (const prop in props) {
    const styleKey = spec.keys.get(prop);

    if (styleKey === undefined) continue;

    const value = (props as Record<string, unknown>)[prop];

    if (value === undefined) continue;

    const key = cacheKeyFor(prop, styleKey);

    if (node.next === undefined) node.next = new Map();

    let byValue = node.next.get(key);

    if (byValue === undefined) {
      byValue = new Map();
      node.next.set(key, byValue);
    }

    let child = byValue.get(value);

    if (child === undefined) {
      child = createNode();
      byValue.set(value, child);
    }

    node = child;
  }

  node.style = style;
  cache.size += 1;
};

// Builds the style object. Only runs on a cache miss or for uncacheable values.
const buildStyle = (
  props: object,
  spec: TStyleSpec,
  resolve: TStyleResolver | undefined,
): object | undefined => {
  const style: Record<string, unknown> = spec.base ? { ...spec.base } : {};
  let hasStyle = false;
  let roundedT: unknown;
  let roundedB: unknown;
  let roundedL: unknown;
  let roundedR: unknown;

  for (const prop in props) {
    const styleKey = spec.keys.get(prop);

    if (styleKey === undefined) continue;

    const passed = (props as Record<string, unknown>)[prop];

    if (passed === undefined) continue;

    const value = resolve === undefined ? passed : resolve(prop, passed);

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
    }
  }

  return hasStyle ? style : spec.base;
};

/**
 * Splits component props into a style object and the props to forward. Only
 * props that were passed with a defined value end up in the style. `style`
 * itself is left out of both; the caller merges it with `composeStyle`.
 *
 * `resolve`, when given, maps each style prop's value before it goes in the
 * style (e.g. theme tokens to values). The style object is only built, and
 * values only resolved, on a cache miss.
 *
 * Returns `undefined` for the style when no style props were passed.
 */
export const splitStyleProps = <TRest extends object, TStyle extends object = object>(
  props: object,
  spec: TStyleSpec,
  resolve?: TStyleResolver,
): [TStyle | undefined, TRest] => {
  const rest: Record<string, unknown> = {};
  const cache = getStyleCache(spec, resolve);
  let node: TStyleNode | undefined = cache.root;
  let hasStyle = false;
  let cacheable = true;

  for (const prop in props) {
    const value = (props as Record<string, unknown>)[prop];
    const styleKey = spec.keys.get(prop);

    if (styleKey === undefined) {
      if (prop !== 'style') rest[prop] = value;
      continue;
    }

    if (value === undefined) continue;

    hasStyle = true;

    if (!cacheable) continue;

    if (value !== null && typeof value === 'object') cacheable = false;
    else if (node !== undefined) node = node.next?.get(cacheKeyFor(prop, styleKey))?.get(value);
  }

  if (!hasStyle) return [spec.base as TStyle | undefined, rest as TRest];

  if (!cacheable) return [buildStyle(props, spec, resolve) as TStyle | undefined, rest as TRest];

  if (node?.style !== undefined) return [node.style as TStyle, rest as TRest];

  // A style whose every value resolved to undefined is the base, and is not cached.
  const built = buildStyle(props, spec, resolve);

  if (built !== undefined && built !== spec.base) insertStyle(cache, props, spec, built);

  return [built as TStyle | undefined, rest as TRest];
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
