# Row

`Box` preset with `direction="row"` applied automatically. Use it whenever you need a horizontal arrangement — icon + label, avatar + name, stat row, tag chips, etc.

## Preview

<div align="center">

<img src="./row-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/row-example/index.tsx`](../../examples/app/src/screens/row-example/index.tsx)

## Usage

```tsx
import { Row } from '@88khp/vajra-ui-core';

<Row align="center" gap={12}>
  <Avatar />
  <Name />
</Row>
```

## API

Accepts all [`Box` props](../box/box.md). The `direction` prop is fixed to `"row"` and cannot be overridden.
