import LoginComponent from './components/Login.vue';
import DashboardComponent from './components/Dashboard.vue';
import LogoutComponent from'./components/Logout.vue'

export default{
    '/login': {
        name: 'auth.login',
        component: LoginComponent,
        auth: false
    },
    '/logout':{
        name: 'auth.logout',
        component: LogoutComponent,
        auth: true,
    },
    '/dashboard': {
        name: 'dashboard',
        component: DashboardComponent,
        auth: true, // é necessario estar autenticado para aceder à rota
    },
}