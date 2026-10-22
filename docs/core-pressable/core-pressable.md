# CorePressable

Headless `TouchableOpacity` with Box layout props. No default visual — all styling is up to you. Use it for buttons, list rows, cards, and any tappable surface.

## Preview

<div align="center">

<img src="./core-pressable-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/core-pressable-example/index.tsx`](../../examples/app/src/screens/core-pressable-example/index.tsx)

## Usage

```tsx
import { CorePressable, CoreText } from '@88khp/vajra-core';

<CorePressable onPress={handlePress} bg="#2563EB" rounded={8} p={14} align="center">
  <CoreText fontSize={15} fontWeight="600" color="#fff">
    Confirm
  </CoreText>
</CorePressable>
```

## API

Accepts all [`Box` props](../box/box.md) combined with all native `TouchableOpacityProps`.

### Key interaction props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onPress` | `() => void` | — | Fired on tap |
| `onPressIn` | `() => void` | — | Fired when press begins |
| `onPressOut` | `() => void` | — | Fired when press ends |
| `onLongPress` | `() => void` | — | Fired on long press |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `opacity` | `number` | — | Static opacity of the element |
| `activeOpacity` | `number` | `0.7` | Opacity while pressed |
| `style` | `ViewStyle \| ViewStyle[]` | — | Additional styles |
