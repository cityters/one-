const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {VueLoaderPlugin}=require("vue-loader")

module.exports = {
  entry: './src/index.js',//配置入口
  mode:'development',
  output: {//配置出口
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer:{//配置服务器
  	contentBase:'dist/',
  	inline:true//实时刷新，热更新
  },
  resolve:{
  	extensions:['.js','.vue','json'],
  	alias:{
  		'vue$':'vue/dist/vue.esm.js'
  	}
  },
  module: {
    rules: [
      {
      	test:/\.js$/,
      	loader:'babel-loader',
      	exclude:/node_modules/
      },
    	{
    		test:/\.vue$/,//配置vue
    		loader:'vue-loader'
    	},
      { test: /\.css$/, //配置css文件
      	use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
      	test:/\.jpg$/,//配置背景图片
      	loader:'url-loader',
      	options:{
      		limit:1000,
      		name:'../img/[name].[ext]'
      	}
      },
      {
      	test:/\.(htm|html)$/i,//配置html页面
      	loader:'html-loader'
      }
     
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: './index.html'}),
    new ExtractTextPlugin("css/styles.css")
  ]

};

