# Separator

A thin line divider. Supports horizontal and vertical orientations, solid / dashed / dotted line styles, custom thickness, and colour.

## Preview

<div align="center">

<img src="./separator-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/separator-example/index.tsx`](../../examples/app/src/screens/separator-example/index.tsx)

## Usage

```tsx
import { Separator } from '@88khp/vajra-core';

// Between list items
<ItemA />
<Separator color="#E5E7EB" />
<ItemB />

// Vertical divider inside a Row
<Row h={48} align="center">
  <StatA />
  <Separator orientation="vertical" color="#E5E7EB" />
  <StatB />
</Row>
```

## API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the line |
| `thickness` | `number` | `1` | Line thickness in pixels |
| `color` | `string` | `'#000'` | Line colour |
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Line style |

- Horizontal separators stretch to `width: '100%'`
- Vertical separators stretch to `height: '100%'` — the parent must have an explicit height for this to be visible
