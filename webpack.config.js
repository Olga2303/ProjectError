const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    entry: './src/app.js',
    output: {
      filename: 'bundle.[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new HTMLWebpackPlugin({
          filename:'index.html',
          template: './src/index.html'
      }),
      new HTMLWebpackPlugin({
          filename: 'sign-in.html',
          template: './src/templates/sign-in.html'
      }),
      new HTMLWebpackPlugin({
        filename: 'sign-up.html',
        template: './src/templates/sign-up.html'
    }),

      new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
               test: /\.scss$/, 
               use:['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpeg|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            }
            
        ]
    }, 
    devServer: {
        port: 4200
    }
};