var webpack  = require('webpack');
module.exports = {	
	entry:  {
          admin: './resources/assets/admin/js/admin.js',
		  spa:  './resources/assets/spa/js/spa.js',
        },
	output:{ // arquivo de saida
		path: __dirname + '/public/build',
		filename: '[name].bundle.js',
		publicPath: '/build/'
	},
	plugins: [
	    new webpack.ProvidePlugin({   // carregamento previo do jquery para funcionar com $ e jQuery
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
	    })
	],
	module: {
		loaders: [
			{
				test: /\.js$/,  // pega os arquivos com o final .js
				exclude:  /(node_modules|bower_components)/,   // excluir pastas ou arquivos que nao queremos que seja feita.
				loader: 'babel'  //loader babel-loader				
			},			
			{
				test: /\.vue$/,
				loader: 'vue'
			}
		]
	}
};