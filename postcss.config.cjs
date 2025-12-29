// ESM PostCSS config renamed to `postcss.config.js` for clarity.
// This file remains for backwards compatibility and is intentionally left as a
// small proxy that re-exports the ESM config file when running under CommonJS.

module.exports = require('./postcss.config.js').default || require('./postcss.config.js');