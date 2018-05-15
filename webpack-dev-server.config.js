const path = require( 'path' ),
  HtmlWebpackPlugin = require( 'html-webpack-plugin' ),
  SpriteLoaderPlugin = require( 'svg-sprite-loader/plugin' ),
  SpritesmithPlugin = require( 'webpack-spritesmith' );

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: path.join( __dirname, 'postcss.config.js' )
    }
  }
};

module.exports = {
  entry: [
    path.join( __dirname, '/src/app.js' )
  ],
  output: {
    path: path.join( __dirname, '/dist' ),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.join( __dirname, 'dist' ),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/,
        use: 'url-loader'
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
          'svg-transform-loader'
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: 'url-loader'
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
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
          },
          postCSSLoader
        ]
      },
      {
        test: /tablet.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              transform: path.join( __dirname, 'src/webpack/transform', 'tablet.js' )
            }
          },
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ]
      },
      {
        test: /desktop.styl$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              transform: path.join( __dirname, 'src/webpack/transform', 'desktop.js' )
            }
          },
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ]
      },
      {
        test: /(mobile|critical).styl$/,
        use: [
          {
            loader: 'style-loader',
          },
          'css-loader',
          postCSSLoader,
          'stylus-loader'
        ]
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      }
    ]
  },
  plugins: [
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
      title: 'Букеты цветов',
      template: 'src/pages/index.pug',
      inject: false,
      minify: false,
      env: process.env.NODE_ENV,
      getCriticalCSS: f => f
    }),
    new SpriteLoaderPlugin
  ]
};
