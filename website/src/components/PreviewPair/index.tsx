import React from 'react';
import styles from './styles.module.css';

export default function PreviewPair({children}: {children: React.ReactNode}) {
  return <div className={styles.pair}>{children}</div>;
}
