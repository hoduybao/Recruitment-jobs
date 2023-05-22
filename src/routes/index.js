import Home from '~/pages/Home';
import HomeEmployer from '~/Layout/Employer/components/Home';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';
import ResultSearch from '~/pages/ResultSearch';
import DetailJob from '~/pages/DetailJob';
import ViewCompany from '~/pages/ViewCompany';
import ManageJobs from '~/pages/ManageJobs';
import SignUpEmployer from '~/Layout/Employer/components/SignUp';

import { SignInLayoutEmployer } from '~/Layout/Employer';
import { DefaultLayout } from '~/Layout/Employer';
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
        layout: SignInLayout,
    },
    {
        path: '/view-company',
        component: ViewCompany,
        layout: SignInLayout,
    },
    {
        path: '/my-job',
        component: ManageJobs,
        layout: SignInLayout,
    },

    {
        path: '/employer/sign-in',
        component: Login,
        employer: true,
        layout: SignInLayoutEmployer,
    },
    {
        path: '/employer/sign-up',
        component: SignUpEmployer,
        layout: SignInLayoutEmployer,
    },
    {
        path: '/employer',
        component: HomeEmployer,
        layout: DefaultLayout,
         employer: true
    },
    {path: '/employer/jobs',
    component: ManageJobs,
    employer: true,
    layout: DefaultLayout,},
    {path: '/employer/detail-job',
    component: DetailJob,
    employer: true,
    layout: DefaultLayout,}
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
