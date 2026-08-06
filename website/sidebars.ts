import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'installation',
    {
      type: 'category',
      label: 'Primitives',
      link: {
        type: 'generated-index',
        title: 'Primitives',
        description: 'Headless layout, typography, and interaction primitives.',
      },
      items: [
        'components/box',
        'components/row',
        'components/col',
        'components/grid',
        'components/center',
        'components/absolute-center',
        'components/spacer',
        'components/separator',
        'components/core-text',
        'components/core-text-input',
        'components/core-pressable',
      ],
    },
    {
      type: 'category',
      label: 'Hooks',
      link: {
        type: 'generated-index',
        title: 'Hooks',
        description: 'Screen-aware utilities for responsive layouts.',
      },
      items: ['hooks/use-dimensions'],
    },
  ],
};

export default sidebars;
