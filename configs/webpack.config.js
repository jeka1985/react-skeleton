let webpack = require('webpack'),
    path = require('path'),
    ExtractPlugin = require('extract-text-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let root = path.resolve(__dirname, '../'),
    dest = path.resolve(root, 'build'),
    entryPath = path.resolve(root, 'src/entry'),
    excludeRe = /node_modules|build/,
    env = 'development',
    isDev = env === 'development';

module.exports = () => ({
  resolve: {
    modules: [
      path.resolve(root, 'src/'),
      path.resolve(root, 'node_modules/')
    ]
  },

  entry: {
    app: entryPath,
    lib: Object.keys(require('../package.json').dependencies)
  },

  output: {
    filename: 'js/[name].js',
    path: dest
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: excludeRe,
        use: {
          loader: 'babel',
          options: require('./babel.config.js')
        }
      },
      {
        test: /\.scss$/,
        exclude: excludeRe,
        use: ExtractPlugin.extract([
          {
            loader: 'css',
            query: require('./css.config.js')
          },
          {
            loader: 'postcss',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js')
              }
            }
          },
          'sass'
        ])
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg|ico)$/,
        exclude: excludeRe,
        use: [
          {
            loader: 'file',
            options: {
              publicPath: '/build/',
              name: '/img/[folder]_[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),

    !isDev && new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false },
      output: { comments: isDev }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib'
    }),

    new ExtractPlugin({
      filename: 'css/all.css'
    })
    //,
    //new BundleAnalyzerPlugin()
  ].filter(item => !!item)
})
