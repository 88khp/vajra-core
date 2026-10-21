import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vajra UI Core',
  tagline: 'Headless, zero-dependency React Native layout and primitive components',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://88khp.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/vajra-ui-core/',

  // GitHub pages deployment config.
  organizationName: '88khp',
  projectName: 'vajra-ui-core',

  onBrokenLinks: 'throw',

  plugins: ['./plugins/react-native-web-webpack-plugin.ts'],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/88khp/vajra-ui-core/tree/main/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Vajra UI Core',
      logo: {
        alt: 'Vajra UI Core Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/88khp/vajra-ui-core',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@88khp/vajra-ui-core',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/',
            },
            {
              label: 'Installation',
              to: '/docs/installation',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/88khp/vajra-ui-core',
            },
            {
              label: 'npm',
              href: 'https://www.npmjs.com/package/@88khp/vajra-ui-core',
            },
            {
              label: 'Changelog',
              href: 'https://github.com/88khp/vajra-ui-core/blob/main/CHANGELOG.md',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Vajra UI (styled)',
              href: 'https://www.npmjs.com/package/@88khp/vajra-ui',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Devraj Labs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
