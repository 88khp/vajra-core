import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const sample = `import { Box, Row, CoreText, CorePressable } from '@88khp/vajra-core';

<Box p={16} bg="#fff" rounded={8} gap={8}>
  <Row align="center" gap={8}>
    <CoreText fontSize={16} fontWeight="600">Hello</CoreText>
  </Row>
  <CorePressable onPress={() => {}} bg="#2563EB" rounded={8} p={14}>
    <CoreText color="#fff">Get started</CoreText>
  </CorePressable>
</Box>`;

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.badges}>
          <span className={styles.badge}>Headless</span>
          <span className={styles.badge}>Zero dependencies</span>
          <span className={styles.badge}>11 primitives</span>
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--primary button--lg" to="/docs/">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/components/box">
            Browse Primitives
          </Link>
        </div>
        <div className={styles.codePreview}>
          <CodeBlock language="tsx" title="MyScreen.tsx">
            {sample}
          </CodeBlock>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Headless, zero-dependency React Native layout and primitive components.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
