<div align="center">

# Vajra UI Core

### Layout primitives for React Native.

<table>
  <tr>
    <td align="center"><strong>~9 kB</strong></td>
    <td align="center"><strong>0</strong></td>
    <td align="center"><strong>0</strong></td>
    <td align="center"><strong>13</strong></td>
  </tr>
  <tr>
    <td align="center">Download size</td>
    <td align="center">Dependencies</td>
    <td align="center">Providers needed</td>
    <td align="center">Primitives</td>
  </tr>
</table>

<br />

[![npm version](https://img.shields.io/npm/v/@88khp/vajra-core)](https://www.npmjs.com/package/@88khp/vajra-core)
[![bundle size](https://img.shields.io/bundlephobia/min/@88khp/vajra-core)](https://bundlephobia.com/package/@88khp/vajra-core)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/@88khp/vajra-core)
[![license](https://img.shields.io/npm/l/@88khp/vajra-core)](./LICENSE)

<p><a href="https://88khp.github.io/vajra-core/"><strong>Documentation</strong></a></p>

<br />

<img src="./docs/box/box-example.png" height="500" />&nbsp;<img src="./docs/row/row-example.png" height="500" />&nbsp;<img src="./docs/col/col-example.png" height="500" />

</div>

---

## Is it for you?

### Why use it

- You want less boilerplate for layout in React Native, with no theme or provider to set up.
- You already have your own styling system and want layout primitives that fit into it.

### The problem it solves

Raw React Native layout is verbose: every `View` needs a `style` object with flex direction, alignment, padding and gap. Design systems fix that, but they bring a theme, a provider and a dependency tree. This package is only the layout layer, and it has zero dependencies.

Each component declares the props it accepts and maps each one to a React Native style key, such as `p` to `padding` and `bg` to `backgroundColor`. Props are type-checked. Styles resolve at runtime and are cached per prop set, so there's no build step or compiler.

### Who it's not for

- Teams that want ready-made components such as buttons, inputs or modals. Use [`@88khp/vajra-ui`](https://github.com/88khp/vajra-ui).
- Web projects. It is a React Native package.

### What it doesn't do

- It doesn't style anything beyond layout. There are no colors, fonts or themes.
- It doesn't provide components beyond the 13 layout, text and grid primitives.
- It doesn't need a provider, so there is nothing to wrap your app in.

---

## Why

Raw RN layout is verbose. Design systems fix that but ship a theme, a provider, and a dependency tree you didn't ask for.

Vajra UI Core is neither. It's a thin prop layer over the primitives you're already using — `View`, `Text`, `Pressable`. The whole thing is 9 kB and pulls in nothing. Drop it in, style with your own system, done.

```tsx
// before
<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 8 }}>

// after
<Row align="center" px={16} gap={8}>
```

---

## Install

```sh
yarn add @88khp/vajra-core
```

`react` and `react-native` are peer dependencies. Nothing else is.

---

## Docs

| Component | |
|-----------|--|
| `Box` | [docs/box](./docs/box/box.md) |
| `Row` | [docs/row](./docs/row/row.md) |
| `Col` | [docs/col](./docs/col/col.md) |
| `Center` | [docs/center](./docs/center/center.md) |
| `AbsoluteCenter` | [docs/absolute-center](./docs/absolute-center/absolute-center.md) |
| `Spacer` | [docs/spacer](./docs/spacer/spacer.md) |
| `Separator` | [docs/separator](./docs/separator/separator.md) |
| `CoreText` | [docs/core-text](./docs/core-text/core-text.md) |
| `CoreTextInput` | [docs/core-text-input](./docs/core-text-input/core-text-input.md) |
| `CorePressable` | [docs/core-pressable](./docs/core-pressable/core-pressable.md) |
| `Grid` | [docs/grid](./docs/grid/grid.md) |
| `useDimensions` | [docs/use-dimensions](./docs/use-dimensions/use-dimensions.md) |

---

## Primitives

### Box

Foundation `View` with shorthand layout and spacing props. Every other layout primitive is built on top of `Box`.

<img src="./docs/box/box-example.png" height="500" />

[Full docs →](./docs/box/box.md)

---

### Row

`Box` with `flexDirection="row"` pre-applied. Use it anywhere you need horizontal layout.

<img src="./docs/row/row-example.png" height="500" />

[Full docs →](./docs/row/row.md)

---

### Col

`Box` with `flexDirection="column"` pre-applied. Stacks children vertically.

<img src="./docs/col/col-example.png" height="500" />

[Full docs →](./docs/col/col.md)

---

### Center

`Box` centered on both axes. No more `alignItems` + `justifyContent` boilerplate.

<img src="./docs/center/center-example.png" height="500" />

[Full docs →](./docs/center/center.md)

---

### AbsoluteCenter

Fills its parent absolutely and centers children. Perfect for overlays, loaders, and empty states.

<img src="./docs/absolute-center/absolute-center-example.png" height="500" />

[Full docs →](./docs/absolute-center/absolute-center.md)

---

### Spacer

Fixed-size gap between elements. Drop it between siblings instead of reaching for `margin`.

<img src="./docs/spacer/spacer-example.png" height="500" />

[Full docs →](./docs/spacer/spacer.md)

---

### Separator

Horizontal or vertical divider line. One prop to switch orientation.

<img src="./docs/separator/separator-example.png" height="500" />

[Full docs →](./docs/separator/separator.md)

---

### CoreText

Headless `Text` with typography shorthand props. Bring your own font and color system.

<img src="./docs/core-text/core-text-example.png" height="500" />

[Full docs →](./docs/core-text/core-text.md)

---

### CoreTextInput

Headless `TextInput` with the same layout and typography props as `CoreText`.

<img src="./docs/core-text-input/core-text-input-example.png" height="500" />

[Full docs →](./docs/core-text-input/core-text-input.md)

---

### CorePressable

`Pressable` with full layout prop support. Style your buttons without a wrapper `View`.

<img src="./docs/core-pressable/core-pressable-example.png" height="500" />

[Full docs →](./docs/core-pressable/core-pressable.md)

---

### Grid

Compound responsive grid — `Grid.Root` + `Grid.Item`. Adapts to any screen width automatically.

<img src="./docs/grid/grid-example.png" height="500" />

[Full docs →](./docs/grid/grid.md)

---

### useDimensions

Screen-aware dimension utilities. Responsive values without a context provider.

<img src="./docs/use-dimensions/use-dimensions-example.png" height="500" />

[Full docs →](./docs/use-dimensions/use-dimensions.md)

---

## Examples

A runnable React Native CLI app lives in [`examples/app/`](./examples/app/).

```sh
cd examples/app

# iOS
bundle exec pod install --project-directory=ios
npx react-native run-ios

# Android
npx react-native run-android
```

---

## License

MIT
