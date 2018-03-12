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
    isDev = env === 'development',
    isNode = argv.target === 'node';

module.exports = {
  mode: 'development',

  devtool: 'none',

  entry: { 
    [argv.target]: isNode ? 
      nodeEntryPath : 
      browserEntryPath
  },
  
  externals: isNode ? [require('webpack-node-externals')()] : [],

  output: {
    publicPath: '/dist/',
    chunkFilename: `${argv.target}/chunks/[id]/script.js`,
    library: 'App',
    libraryTarget: isNode ? 'commonjs': 'var'
  },

  resolve: {
    modules: [
      path.resolve(root, 'src/'),
      path.resolve(root, 'node_modules/')
    ]
  },

  devServer: {
    publicPath: 'dist/',
    compress: true,
    port: 9000
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
      filename: `${argv.target}/[id].css`,
      chunkFilename: `${argv.target}/chunks/[id]/styles.css`
    }),

    !isNode && new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    })
  ].filter(item => !!item),
  
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
        test: /\.scss$/,
        use: isNode ? 
          [
            { loader: 'css-loader/locals', query: require('./css.config.js') },
            'sass-loader'
          ]:
          [
            ExtractPlugin.loader,
            {
              loader: 'css-loader',
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
            'sass-loader'
          ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|ico)$/,
        exclude: excludeRe,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/dist/',
              name: 'assets/[folder]_[name].[ext]'
            }
          }
        ]
      }  
    ]
  }
}


