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
    mode: isProduction ? 'production' : 'development',

    context: path.resolve(__dirname, config.src.js),
    entry: {
      app: ['./polyfills', './app']
    },

    output: {
      path: path.resolve(__dirname, config.dest.js),
      filename: '[name].bundle.js',
      publicPath: 'js/',
      chunkFilename: 'async-chunks/[name].js',
      sourceMapFilename: 'sourcemaps/[file].map'
    },
    devtool: isProduction ? false : 'cheap-inline-module-source-map',

    plugins: [
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|ru/),

      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env)
        },
        ENV_IS_SERVER: config.isServer
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),

      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static',
      //   analyzerPort: 4000,
      //   openAnalyzer: false
      // }),
    ],

    resolve: {
      extensions: ['.js'],
      alias: {
        vendor: path.resolve(config.src.vendor),
        vue: 'vue/dist/vue.js',
        jquery: path.resolve('node_modules', 'jquery/dist/jquery.min'),
        Swiper: path.resolve('node_modules', 'swiper/dist/js/swiper.min'),
        TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
      }
    },

    optimization :{
      minimize: isProduction
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ]
        }
      ]
    }
  };

  if (isProduction) {
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true
      })
    );
  }

  return webpackConfig;
}

module.exports = createConfig();
module.exports.createConfig = createConfig;
