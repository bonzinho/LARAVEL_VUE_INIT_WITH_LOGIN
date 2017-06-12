const gulp = require('gulp');
const elixir = require('laravel-elixir');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const webpackDevConfig = require('./webpack.dev.config');
const mergeWebpack = require('webpack-merge');
const env = require('gulp-env');
const stringifyObject = require('stringify-object');
const file = require('gulp-file');
const argv = require('yargs').argv; // tudo o que for digitado no terminal esta nesta constante
const HOST = "localhost";
//const HOST = "https://paginas.fe.up.pt/~bonzinho/feupworld/index.php";




// tarefa para criar ficheiro de configuração do spa
gulp.task('spa-config', () => {
    env({
        file: '.env',
        type: 'ini'
    });
    let spaConfig = require('./spa.config');
    let string = stringifyObject(spaConfig);
    return file('config.js', `module.exports = ${string};`, {src: true})
        .pipe(gulp.dest('./resources/assets/spa/js')); //destino do ficheiro de configuração
});

gulp.task('webpack-dev-server', () => {
    let config = mergeWebpack(webpackConfig, webpackDevConfig);
    let inlineHot = [
        'webpack/hot/dev-server',
        `webpack-dev-server/client?http://${HOST}:8080`
    ];

    config.entry.admin = [config.entry.admin].concat(inlineHot);
    config.entry.spa = [config.entry.spa].concat(inlineHot);

    new WebpackDevServer(webpack(config), {
        hot: true,
        proxy: {
            '*': `http://${HOST}:8000`,
        },
        watchOptions:{
            poll: true,
            aggregateTimeout: 300
        },
        publicPath: config.output.publicPath,
        noInfo: true,
        stats: {
            colors:true
        },
    }).listen(8080, HOST, () => {
        console.log('Bundling project...');
    });
});

elixir(mix => {

    mix.sass('./resources/assets/admin/sass/admin.scss')
        .sass('./resources/assets/spa/sass/spa.scss')
        .copy('./node_modules/materialize-css/fonts/roboto', 'public/fonts/roboto');

    if(argv._.includes('watch')){ // estivar em deenvolvimento
        console.log('entrei com watch (versão de desenvolvimento)...');
        gulp.start('spa-config', 'webpack-dev-server');
        mix.browserSync({
            host: HOST,
            proxy: `http://${HOST}:8080`,
        });
    }else{
        console.log("Versão de produção...: output: " + __dirname);
        gulp.start('spa-config');
        webpack(require("./webpack.config.js"), () => {
            console.log("Bundling project...")
        });
    }

});
