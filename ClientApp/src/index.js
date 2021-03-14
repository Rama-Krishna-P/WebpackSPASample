import './views/app-root.js'
import './views/login-view.js'
import './main.scss'
import 'bootstrap'
import {Router} from "@vaadin/router";

const outlet = document.getElementById('outlet');
const router = new Router(outlet);

router.setRoutes([
    {  
        path: '/', 
        component: 'app-root', 
        action: (context, commands) => {
            // You can add the authentication logic here and redirect to 
            // login page if authentication fails as shown below
            // Router.go('/login')
        }
    },
    { path: '/login', component: 'login-view' }
])