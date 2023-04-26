import Home from '~/pages/Home';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import { SignInLayout } from '~/Layout';
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/sign-in',
        component: Login,
        layout: SignInLayout
    },

    {
        path: '/sign-up',
        component: SignUp,
        layout: SignInLayout
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
