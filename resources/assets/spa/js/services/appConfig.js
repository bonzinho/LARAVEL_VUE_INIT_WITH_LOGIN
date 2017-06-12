import config from '../config';


let location = window.location;
// variavel objeto paa adicionar novas configuracoes
let appConfig = {
    host: `${location.protocol}//${location.hostname}:${location.port}`,
    get login_url(){ //gera uma propriedade
        return `${this.host}${config.app_path}${config.login_path}`;
    }
};

export default Object.assign({}, appConfig, config);