# Center

`Box` preset with `align="center"` and `justify="center"` applied automatically. Perfect for loading states, empty states, icon containers, and anything that needs to be centred inside its parent.

## Preview

<div align="center">

<img src="./center-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/center-example/index.tsx`](../../examples/app/src/screens/center-example/index.tsx)

## Usage

```tsx
import { Center } from '@88khp/vajra-core';

<Center flex={1}>
  <Spinner />
</Center>
```

## API

Accepts all [`Box` props](../box/box.md). The `align` and `justify` props are fixed and cannot be overridden.
