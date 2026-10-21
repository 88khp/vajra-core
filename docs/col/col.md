# Col

`Box` preset with `direction="column"` applied automatically. Use it for vertical stacks — form fields, card content, list items, settings rows, notification feeds.

## Preview

<div align="center">

<img src="./col-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/col-example/index.tsx`](../../examples/app/src/screens/col-example/index.tsx)

## Usage

```tsx
import { Col } from '@88khp/vajra-ui-core';

<Col gap={8} p={16}>
  <Title />
  <Subtitle />
</Col>
```

## API

Accepts all [`Box` props](../box/box.md). The `direction` prop is fixed to `"column"` and cannot be overridden.
