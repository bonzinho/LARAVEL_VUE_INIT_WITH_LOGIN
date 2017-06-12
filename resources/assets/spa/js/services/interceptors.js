import JwtToken from './jwt-token';
import Auth from './auth'
import appConfig from './appConfig';
//interceptor para enviar o header com o tokem (bearer TOKEN)
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', JwtToken.getAuthorizationHeader());
    next();
});

// configuração do refresh token
//verifica se está válido caso retorne 401 significa que não está
//e tenta fazer o refresh token
Vue.http.interceptors.push((request, next) => {
    next((response) => {
       if(response.status === 401){  // verifica se o token esta expirado
            return JwtToken.refreshToken().then(()=>{
                return Vue.http(request); // clona a requisição (requisição original) e volta a enviar, isto porque o refreshtoken foi revalidado
            }).catch(() => {
                Auth.clearAuth();
                window.location.href = appConfig.login_url; // redireciona par aa pagina de login sempre que o token nao for valido e nao consga fazer o refresh_token
            });
       }
    });
})