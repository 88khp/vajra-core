import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import styles from './styles.module.css';

// vajra-core is headless (no theme provider, no design tokens) — primitives
// take raw style props directly (bg="#2563EB", p={16}, etc.), so the only
// context this preview needs to supply is SafeAreaProvider, which some
// primitives may rely on transitively via react-native-safe-area-context.
export default function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        {children}
      </SafeAreaProvider>
    </div>
  );
}
