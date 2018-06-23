const path = require( 'path' ),
  ExtractTextWebpackPlugin = require( 'extract-text-webpack-plugin' ),
  HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
  SpriteLoaderPlugin = require( 'svg-sprite-loader/plugin' ),
  FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' ),
  SpritesmithPlugin = require( 'webpack-spritesmith' );

const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
      config: {
        path: path.join( __dirname, 'postcss.config.js' ),
      }
    }
  },
  mobileCSS = new ExtractTextWebpackPlugin( 'css/mobile.css' ),
  tabletCSS = new ExtractTextWebpackPlugin( 'css/tablet.css' ),
  desktopCSS = new ExtractTextWebpackPlugin( 'css/desktop.css' ),
  criticalCSS = new ExtractTextWebpackPlugin( 'css/critical.css' ),
  getCriticalCSS = ( webpackStats, compilation ) => {
    const chunks = webpackStats.files.chunks,
      cssFiles = Object.values( chunks )
        .map( chunk => chunk.css ),
      criticalFiles = [].concat( ...cssFiles )
        .filter( filename => filename.includes( 'critical.css' )),
      criticalContents = criticalFiles
        .map( filename => compilation.assets[ filename ].source());
    return criticalContents.join( '\n' );
  };

module.exports = {
  entry: [
    'whatwg-fetch',
    path.join( __dirname, '/src/app.js' )
  ],
  output: {
    path: path.join( __dirname, '/dist' ),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  resolveLoader: {
    modules: [ 'node_modules', path.resolve( __dirname, 'src/webpack/loaders' )]
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/images/[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'images/sprite-[hash:6].svg'
            }
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false }
              ]
            }
          },
          'svg-transform-loader',
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/fonts/[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 'env', 'stage-0' ]
            }
          }
        ]
      },
      {
        test: /mobile\.styl$/,
        use: mobileCSS.extract([
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ])
      },
      {
        test: /tablet\.styl$/,
        use: tabletCSS.extract([
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ])
      },
      {
        test: /desktop\.styl$/,
        use: desktopCSS.extract([
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ])
      },
      {
        test: /critical\.styl$/,
        use: criticalCSS.extract([
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ])
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
          postCSSLoader
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  plugins: [
    mobileCSS,
    tabletCSS,
    desktopCSS,
    criticalCSS,
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve( __dirname, 'src/sprites' ),
        glob: '*.png'
      },
      target: {
        image: path.resolve( __dirname, 'src/img/sprites.png' ),
        css: path.resolve( __dirname, 'src/stylus/_util/sprites.styl' )
      },
      apiOptions: {
        cssImageRef: '~sprites.png'
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Betmafia',
      template: 'src/pages/index.pug',
      inject: false,
      minify: true,
      env: process.env.NODE_ENV,
      getCriticalCSS
    }),
    new SpriteLoaderPlugin,
    new FaviconsWebpackPlugin({
      logo: path.join( __dirname, 'src/img/favicon.jpg' ),
      prefix: 'images/icons/[hash]'
    })
  ]
};
