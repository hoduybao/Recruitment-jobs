import Home from '~/pages/Home';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import ResultSearch from '~/pages/ResultSearch';
import DetailJob from '~/pages/DetailJob';
import ViewCompany from '~/pages/ViewCompany';
import { SignInLayout } from '~/Layout';
const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/sign-in',
        component: Login,
        layout: SignInLayout,
    },

    {
        path: '/sign-up',
        component: SignUp,
        layout: SignInLayout,
    },
    {
        path: '/search-job',
        component: ResultSearch,
    },
    {
        path: '/detail-job',
        component: DetailJob,
        layout: SignInLayout
    },
    {
        path: '/view-company',
        component: ViewCompany,
        layout: SignInLayout
    },
    
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
