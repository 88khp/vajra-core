---
id: installation
title: Installation
sidebar_position: 2
---

# Installation

## Install

```sh
npm install @88khp/vajra-ui-core
```

### Peer dependencies

```sh
npm install react react-native
```

| Package | Minimum version |
|---|---|
| `react` | `>=18.0.0` |
| `react-native` | `>=0.73.0` |

## Quick start

```tsx
import { Box, Row, CoreText, CorePressable } from '@88khp/vajra-ui-core';

export default function App() {
  return (
    <Box p={16} bg="#fff" rounded={8} gap={12}>
      <Row align="center" gap={8}>
        <CoreText fontSize={16} fontWeight="600" color="#111">
          Hello
        </CoreText>
      </Row>
      <CorePressable onPress={() => {}} bg="#2563EB" rounded={8} p={14} align="center">
        <CoreText color="#fff" fontWeight="600">
          Get started
        </CoreText>
      </CorePressable>
    </Box>
  );
}
```

There is no provider to wrap your app in, `vajra-ui-core` has no theme or context to set up. Import a primitive and start passing style props.

Looking for tokens, themes, and pre-styled components? See [`@88khp/vajra-ui`](https://www.npmjs.com/package/@88khp/vajra-ui), which builds on top of these primitives.
