# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0-alpha.0] - 2026-10-21

### Breaking

- The package is renamed from `@devraj-labs/vajra-ui-core` to `@88khp/vajra-ui-core`. Update the dependency and every import. The repository and docs site moved to `github.com/88khp/vajra-ui-core` and `88khp.github.io/vajra-ui-core`.
- `CorePressable` is built on React Native `Pressable` instead of `TouchableOpacity`. Its props are now based on `PressableProps`, so `TouchableOpacity`-only props such as `delayPressIn` are no longer accepted. Press feedback is an instant opacity change to `activeOpacity` (default `0.2`, pass `1` to turn it off) instead of a fade.
- `AbsoluteCenter` builds its fill from Box props, so passing `top`, `left`, `right`, `bottom` or `position` now overrides the fill.

### Added

- `splitStyleProps`, `composeStyle` and the `BOX_STYLE_SPEC`, `PRESSABLE_STYLE_SPEC`, `TEXT_STYLE_SPEC` and `TEXT_INPUT_STYLE_SPEC` specs are exported, so wrapper libraries can render `View`/`Text`/`Pressable` directly with core's style building.
- `package.json` exports declare a `default` condition, so Jest and Metro resolve the package without a `moduleNameMapper` entry or a `main` fallback.

### Performance

- Styles contain only the keys that were passed, instead of a ~45-key object of mostly `undefined` values.
- Built styles are cached by value, so elements with the same resolved style share one style object and React Native can skip them on update.
- The built style is passed on its own when there is no `style` prop, instead of a `[built, undefined]` array.
- Props are split into style and forwarded props in one pass.
- `memo` is removed from components that take children (`Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Grid.Root`, `Grid.Item`, `CorePressable`), where the comparison never skipped a render.

## [2.3.0] - 2026-08-06

### Added

- Jest + React Native Testing Library test suite covering every primitive (`Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Spacer`, `Separator`, `CoreText`, `CoreTextInput`, `CorePressable`, `Grid`) and `useDimensions` — 100% statement/function/line coverage, 96.42% branch.
- Docusaurus docs site (`website/`) with live component previews, static example screenshots, and full prop/API reference for every primitive and hook.

### Fixed

- `useDimensions` now subscribes to `Dimensions` change events instead of reading a static snapshot, so `Grid.Item` and other consumers re-layout correctly on rotation or window resize.
- `CoreTextInput` no longer shows the default browser focus outline.

## [2.2.0]

Headless, zero-dependency React Native layout and primitive components: `Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Spacer`, `Separator`, `CoreText`, `CoreTextInput`, `CorePressable`, `Grid`, and the `useDimensions` hook.
