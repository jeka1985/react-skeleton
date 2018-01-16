let webpack = require('webpack'),
    path = require('path'),
    ExtractPlugin = require('extract-text-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    ExtractCssChunks = require('extract-css-chunks-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let root = path.resolve(__dirname, '../'),
    dest = path.resolve(root, 'build'),
    entryPath = path.resolve(root, 'src/entry'),
    excludeRe = /node_modules|build/,
    env = 'development',
    shellBundleName = 'app',
    vendorBundleName = 'vendor',
    isDev = env === 'development';

module.exports = () => ({
  resolve: {
    modules: [
      path.resolve(root, 'src/'),
      path.resolve(root, 'node_modules/')
    ]
  },

  entry: {
    [shellBundleName]: entryPath,
    [vendorBundleName]: Object.keys(require('../package.json').dependencies)
  },

  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: dest,
    publicPath: '/build/'
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

  devServer: {
    historyApiFallback: true,
    contentBase: root
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),

    !isDev && new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: { warnings: false },
        warnings: false
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: vendorBundleName
    }),
    
    new ExtractPlugin({
      filename: 'css/all.css',
      allChunks: true
    })
    // ,
    // new BundleAnalyzerPlugin()
  ].filter(item => !!item)
})

