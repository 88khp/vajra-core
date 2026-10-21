# Grid

Compound component (`Grid.Root` + `Grid.Item`) for responsive grid layouts. `Grid.Item` calculates its own width from screen width, column count, column gap, and span — items always fit exactly without manual maths.

## Preview

<div align="center">

<img src="./grid-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/grid-example/index.tsx`](../../examples/app/src/screens/grid-example/index.tsx)

## Usage

```tsx
import { Grid } from '@88khp/vajra-ui-core';

const PADDING = 16;
const GAP = 12;

<Grid.Root columns={2} gap={GAP}>
  <Grid.Item span={1} columns={2} colGap={GAP} screenPadding={PADDING}>
    <Card />
  </Grid.Item>
  <Grid.Item span={1} columns={2} colGap={GAP} screenPadding={PADDING}>
    <Card />
  </Grid.Item>
</Grid.Root>
```

> Pass the same `gap` / `columns` values to both `Grid.Root` and `Grid.Item` so widths are calculated correctly.

## API

### Grid.Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1–12` | `2` | Total number of columns |

Also accepts all [`Box` props](../box/box.md). `direction` is fixed to `"row"` and `wrap` is fixed to `"wrap"`.

### Grid.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `span` | `1–12` | `1` | Number of columns this item spans |
| `columns` | `1–12` | `2` | Total columns in the grid (must match `Grid.Root`) |
| `colGap` | `number` | `0` | Column gap (must match `Grid.Root gap`) |
| `screenPadding` | `number` | `0` | Horizontal screen padding subtracted from available width |

Also accepts all [`Box` props](../box/box.md).

### Width formula

```
contentWidth   = screenWidth - screenPadding × 2
singleColWidth = (contentWidth - colGap × (columns − 1)) / columns
itemWidth      = singleColWidth × span + colGap × (span − 1)
```
