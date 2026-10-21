# CoreText

Headless `Text` component with typography shorthand props. No default font, size, or colour — all styling is explicit.

## Preview

<div align="center">

<img src="./core-text-example.png" height="400" />

</div>

> Usage example & demo from [`examples/app/src/screens/core-text-example/index.tsx`](../../examples/app/src/screens/core-text-example/index.tsx)

## Usage

```tsx
import { CoreText } from '@88khp/vajra-ui-core';

<CoreText fontSize={16} fontWeight="600" color="#111" lineHeight={24}>
  Hello
</CoreText>
```

## API

| Prop | Type | Maps to |
|------|------|---------|
| `fontSize` | `number` | `fontSize` |
| `lineHeight` | `number` | `lineHeight` |
| `fontWeight` | `TextStyle['fontWeight']` | `fontWeight` |
| `fontFamily` | `string` | `fontFamily` |
| `letterSpacing` | `number` | `letterSpacing` |
| `color` | `string` | `color` |
| `align` | `TextStyle['textAlign']` | `textAlign` |
| `decoration` | `TextStyle['textDecorationLine']` | `textDecorationLine` |
| `transform` | `TextStyle['textTransform']` | `textTransform` |
| `style` | `TextStyle \| TextStyle[]` | Merged last |
| `children` | `React.ReactNode` | Text content |
| `flex` | `number` | `flex` |

Also accepts all native `TextProps`.
