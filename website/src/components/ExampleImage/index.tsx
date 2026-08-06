import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface ExampleImageProps {
  src: string;
  alt: string;
  height?: number;
}

// Static screenshot fallback/reference, kept as a secondary "Example" section
// after the live ComponentPreview at the top of each doc page.
export default function ExampleImage({src, alt, height = 400}: ExampleImageProps) {
  const resolvedSrc = useBaseUrl(src);
  return (
    <div className={styles.card}>
      <img src={resolvedSrc} alt={alt} style={{height, maxWidth: '100%', objectFit: 'contain'}} />
    </div>
  );
}
