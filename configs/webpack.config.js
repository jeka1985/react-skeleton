let ExtractPlugin = require('mini-css-extract-plugin'),
    ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin,
    path = require('path'),
    argv = require('yargs').argv;

let root = path.resolve(__dirname, '../'),
    browserEntryPath = path.resolve(root, 'src/entry/browser'),
    nodeEntryPath = path.resolve(root, 'src/entry/node'),
    excludeRe = /node_modules|build/,
    env = 'development',
    shellBundleName = 'app',
    vendorBundleName = 'vendor',
    target = argv.target,
    isDev = env === 'development',
    isNode = argv.target === 'node';

module.exports = {
  mode: 'production',

  devtool: 'none',

  entry: { 
    [target]: isNode ? 
      nodeEntryPath : 
      browserEntryPath
  },
  
  externals: isNode ? [require('webpack-node-externals')()] : [],

  output: {
    publicPath: '/dist/',
    chunkFilename: `${target}/chunks/[id]/script-[chunkHash:5].js`,
    library: 'App',
    libraryTarget: isNode ? 'commonjs': 'var'
  },

  resolve: {
    modules: [
      path.resolve(root, 'src/'),
      path.resolve(root, 'node_modules/')
    ]
  },

  optimization: !isNode ?
    {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: 'vendors',
            chunks: 'all',
            filename: `vendors.js`
          }
        }
      }
    }: 
    {},

  plugins: [
    !isNode && new ExtractPlugin({
      publicPath: '/dist/',
      filename: `web/main.css`,
      chunkFilename: `web/chunks/[id]/styles-[chunkHash:5].css`
    }),

    !isNode && new ReactLoadablePlugin({
      filename: './dist/stats.json'
    })
  ].filter(Boolean),
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: excludeRe,
        use: {
          loader: 'babel-loader',
          options: require('./babel.config.js')
        }
      },
      {
        test: /\.styl$/,
        use: [
          !isNode && ExtractPlugin.loader,
          {
            loader: isNode ? 'css-loader/locals' : 'css-loader' ,
            query: require('./css.config.js')
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          },
          'stylus-loader'
        ].filter(Boolean)
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|ico)$/,
        exclude: excludeRe,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/dist/',
              name: 'assets/[folder]_[name]-[hash:5].[ext]'
            }
          }
        ]
      }  
    ]
  }
}


