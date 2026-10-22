# Spacer

A fixed-size empty `View` with no background or styling. Use it to add predictable whitespace between elements without reaching for margin props on every child.

## Preview

<div align="center">

<img src="./spacer-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/spacer-example/index.tsx`](../../examples/app/src/screens/spacer-example/index.tsx)

## Usage

```tsx
import { Spacer } from '@88khp/vajra-core';

// Vertical gap between sections
<SectionA />
<Spacer h={24} />
<SectionB />

// Horizontal gap inside a Row
<Row align="center">
  <Avatar />
  <Spacer w={12} />
  <Name />
</Row>
```

## API

| Prop | Type | Description |
|------|------|-------------|
| `w` | `DimensionValue` | Width of the spacer |
| `h` | `DimensionValue` | Height of the spacer |
