import path from 'path';

import type { Plugin } from '@docusaurus/types';

/**
 * Aliases react-native -> react-native-web so vajra-ui-core primitives
 * (which import from react-native under the hood) can render in the
 * browser for the live component preview.
 */
export default function reactNativeWebPlugin(): Plugin {
  return {
    name: 'react-native-web-webpack-plugin',
    configureWebpack() {
      return {
        // Docusaurus merges plugin webpack config with webpack-merge, which
        // concatenates arrays (appends) by default — without "prepend" here,
        // resolve.extensions below would land after Docusaurus's own
        // defaults, so ".web.tsx" would never actually win priority over
        // plain ".tsx" and react-native-web's platform-specific files
        // (SafeAreaView.web.tsx etc.) would never get picked up.
        mergeStrategy: { 'resolve.extensions': 'prepend' },
        resolve: {
          alias: {
            'react-native$': 'react-native-web',
            // @88khp/vajra-ui-core is symlinked in (see
            // scripts/link-vajra-ui-core.sh), so its internal
            // `import ... from 'react-native-safe-area-context'` resolves
            // by walking up from the symlink's real filesystem location —
            // the repo root — rather than website's own node_modules. That
            // would be a SEPARATE install from website's own
            // react-native-safe-area-context dependency, and two separate
            // module instances means two separate React contexts, so
            // SafeAreaProvider (from website's copy) and any hook the
            // symlinked package resolves would never see each other. Force
            // both to the same physical install.
            'react-native-safe-area-context$': path.resolve(
              __dirname,
              '../node_modules/react-native-safe-area-context',
            ),
            // Same reasoning again, but for the package itself: files
            // resolved through the symlink could otherwise pull in a
            // different copy than the one website/node_modules points at.
            // Force everything to the one physical install (the repo root,
            // via the symlink) that the alias below also resolves through.
            '@88khp/vajra-ui-core$': path.resolve(
              __dirname,
              '../node_modules/@88khp/vajra-ui-core',
            ),
          },
          // .web.js/.web.tsx first so packages that ship a browser-safe
          // variant (react-native-safe-area-context's
          // NativeSafeAreaProvider.web.js, avoiding its TurboModuleRegistry
          // native path) get picked up automatically.
          extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'],
          // @88khp/vajra-ui-core is symlinked into
          // website/node_modules (see scripts/link-vajra-ui-core.sh) rather
          // than installed normally. Webpack's default resolve.symlinks:true
          // follows the symlink to its real path and resolves react-native
          // from there, landing on the actual react-native package (if any)
          // at the repo root instead of the aliased react-native-web in
          // website/node_modules. Disabling symlink-following keeps
          // resolution scoped to website/node_modules, where the alias
          // above applies.
          symlinks: false,
        },
        module: {
          rules: [
            {
              // vajra-ui-core's dist/ output is compiled with
              // jsx: "react-native" (JSX left untransformed, meant for a
              // downstream RN bundler) — webpack's default rules skip
              // node_modules, so JSX there never gets transformed. Run it
              // through babel here instead.
              test: /\.jsx?$/,
              include: [/node_modules\/@88khp\/vajra-ui-core/],
              use: {
                loader: require.resolve('babel-loader'),
                options: {
                  presets: [require.resolve('@babel/preset-react')],
                },
              },
            },
          ],
        },
      };
    },
  };
}
