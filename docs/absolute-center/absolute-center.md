# AbsoluteCenter

Fills its parent absolutely (`top: 0, bottom: 0, left: 0, right: 0`) and centres its children. Use it for loading overlays, modal backdrops, and badge positioning.

## Preview

<div align="center">

<img src="./absolute-center-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/absolute-center-example/index.tsx`](../../examples/app/src/screens/absolute-center-example/index.tsx)

## Usage

```tsx
import { AbsoluteCenter } from '@88khp/vajra-core';

// Loading overlay
{loading && (
  <AbsoluteCenter>
    <ActivityIndicator />
  </AbsoluteCenter>
)}
```

## API

Accepts all [`Box` props](../box/box.md) **except** `style` — the component manages its own absolute-fill style internally.

The following styles are applied automatically and cannot be overridden via props:

```ts
{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }
```

> To add a semi-transparent backdrop colour, render a sibling `Box` with `position="absolute"` and the desired background, or nest it inside `AbsoluteCenter` as a child.
