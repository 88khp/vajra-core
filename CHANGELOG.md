# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Fixed

- `useDimensions` now subscribes to `Dimensions` change events instead of reading a static snapshot, so `Grid.Item` and other consumers re-layout correctly on rotation or window resize.

## [2.2.0]

Headless, zero-dependency React Native layout and primitive components: `Box`, `Row`, `Col`, `Center`, `AbsoluteCenter`, `Spacer`, `Separator`, `CoreText`, `CoreTextInput`, `CorePressable`, `Grid`, and the `useDimensions` hook.
