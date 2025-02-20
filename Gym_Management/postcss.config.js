const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: {
    'react-refresh': new ReactRefreshWebpackPlugin(),
    tailwindcss: {},
    autoprefixer: {},
  },
}
