import AppComponent from './components/App.vue';
import routerMap from './router.map';
import VueRouter from 'vue-router';
import Auth from './services/auth';
const router = new VueRouter();

// estrutura de rotas vindas do ficheiro ./router.map.js onde são colocadas todas as rotas
router.map(routerMap);

//metodo para acapturar a transição antes de acontecer
//sempre que mudar a rota esta função beforeach é disparada
router.beforeEach((transition) => {
    //console.log(transition);

    // verifica se a rota necessita de autenticação (transition.to.auth)
    // e verifica se não estamos autenticados com o metodo contido no auth.php (check())
    if(transition.to.auth && !Auth.user.check){
        return router.go({name: 'auth.login'});
    }
    transition.next();
});

router.start({
    components: {
        'app': AppComponent
    }
}, 'body');


