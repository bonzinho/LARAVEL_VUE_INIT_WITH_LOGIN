// Configuração de todos os recursos que vaos aceder na api

export class Jwt{
    static accessToken(email, password){
        return Vue.http.post('access_token', { // se não usar / -> ('/access_token') usa o root para a nossa rota de api
            email: email,
            password: password
        });
    }

    static logout(){
        return Vue.http.post('logout');
    }

    static refreshToken(){
        return Vue.http.post('refresh_token');
    }
}


let User = Vue.resource('user');

export {User};
