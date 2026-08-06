import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  icon: string;
  title: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    icon: '🧬',
    title: 'Headless',
    description: (
      <>
        No default colors, fonts, or spacing scale. Every prop maps directly
        to a React Native style property, you decide what it looks like.
      </>
    ),
  },
  {
    icon: '📦',
    title: 'Zero dependencies',
    description: (
      <>
        Only <code>react</code> and <code>react-native</code> as peer
        dependencies, nothing else installs alongside it.
      </>
    ),
  },
  {
    icon: '🧱',
    title: 'Layout primitives',
    description: (
      <>
        <code>Box</code>, <code>Row</code>, <code>Col</code>,{' '}
        <code>Center</code>, <code>Grid</code>, and more, the building
        blocks every screen needs, without the boilerplate.
      </>
    ),
  },
  {
    icon: '✍️',
    title: 'Typography & input',
    description: (
      <>
        <code>CoreText</code> and <code>CoreTextInput</code> bring the same
        shorthand props to text and form fields, no default font or color
        baked in.
      </>
    ),
  },
  {
    icon: '📐',
    title: 'Responsive by default',
    description: (
      <>
        <code>useDimensions</code> and <code>Grid</code> calculate exact
        column widths from screen size, gap, and span, no manual maths.
      </>
    ),
  },
  {
    icon: '🎨',
    title: 'Bring your own design system',
    description: (
      <>
        Want tokens, themes, and pre-styled components on top? Reach for the
        styled sibling, <code>@devraj-labs/vajra-ui</code>.
      </>
    ),
  },
];

function Feature({icon, title, description}: FeatureItem) {
  return (
    <div className="col col--4 margin-bottom--lg">
      <div className={styles.card}>
        <span className={styles.icon}>{icon}</span>
        <Heading as="h3" className={styles.cardTitle}>
          {title}
        </Heading>
        <p className={styles.cardBody}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
