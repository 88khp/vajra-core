const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

// Root of the local vajra-core package
const pkgRoot = path.resolve(__dirname, '..', '..');

/**
 * Metro needs to watch the local package source so that changes to
 * vajra-core are reflected without a full re-install. We also add the
 * package root to extraNodeModules so that any React / React-Native
 * imports inside the local package resolve to the app's own copies and
 * do not load a second instance.
 *
 * IMPORTANT: vajra-core has its own node_modules (devDependencies) which
 * includes react. We must block Metro from ever resolving from that folder,
 * otherwise two copies of React end up in the bundle and hooks crash.
 */
const config = {
  // Watch the workspace root as well as the app directory
  watchFolders: [pkgRoot],

  resolver: {
    // Block the local package's node_modules so Metro never picks up its
    // copy of react / react-native instead of the app's copy.
    blockList: [
      new RegExp(
        `^${path.resolve(pkgRoot, 'node_modules').replace(/[/\\]/g, '/')}.*`
      ),
    ],
    // Ensure a single copy of react and react-native is used
    extraNodeModules: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
