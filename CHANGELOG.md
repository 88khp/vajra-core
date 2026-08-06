# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Jest + React Native Testing Library test suite covering every primitive (`Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Spacer`, `Separator`, `CoreText`, `CoreTextInput`, `CorePressable`, `Grid`) and `useDimensions` — 100% statement/function/line coverage, 96.42% branch.
- Docusaurus docs site (`website/`) with live component previews, static example screenshots, and full prop/API reference for every primitive and hook.

### Fixed

- `useDimensions` now subscribes to `Dimensions` change events instead of reading a static snapshot, so `Grid.Item` and other consumers re-layout correctly on rotation or window resize.
- `CoreTextInput` no longer shows the default browser focus outline.

## [2.2.0]

Headless, zero-dependency React Native layout and primitive components: `Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Spacer`, `Separator`, `CoreText`, `CoreTextInput`, `CorePressable`, `Grid`, and the `useDimensions` hook.
