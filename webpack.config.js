const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./gulp/config');




function createConfig(env) {

  if (env === undefined) {
    env = process.env.NODE_ENV.trim();
  }

  const isProduction = env === 'production';



  const webpackConfig = {
    context: path.resolve(__dirname, config.src.js),
    entry: {
      app: ['./polyfills/polyfills', './app']
    },

    output: {
      path: path.resolve(__dirname, config.dest.js),
      filename: '[name].bundle.js',
      publicPath: 'js/',
      chunkFilename: 'async-chunks/[name].js',
      sourceMapFilename: 'sourcemaps/[file].map',
      pathinfo: !isProduction
    },
    devtool: isProduction ? false : 'cheap-inline-module-source-map',

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        }
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        children: true,
        async: 'common-async',
        minChunks: 2
      }),

      // new webpack.optimize.CommonsChunkPlugin({
      //   name: commons,
      //   minChunks: 2
      // }),

      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        analyzerPort: 4000,
        openAnalyzer: false
      })
    ],


    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },

    resolve: {
      extensions: ['.js'],
      alias: {
        TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      }
    }

  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          drop_console: true,
          unsafe: true
        }
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
