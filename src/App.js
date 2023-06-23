import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { Fragment } from 'react';
import { DefaultLayout } from '~/Layout';
import SignInLayout from './Layout/Employer/SignInLayout';
import Login from './pages/Login';
import { useEffect } from 'react';
function App() {
    var em = localStorage.getItem('is_employer');

    const PrivateRoute = ({ route }) => {
        let check = true;
        const navigate = useNavigate();
        let Layout = DefaultLayout;
        if (route.layout) {
            Layout = route.layout;
        } else if (route === null) {
            Layout = Fragment;
        }
        let employer = false;
        employer = route.employer;
        let update = false;
        update = route.update;
        var Page = route.component;
        if (
            !em &&
            route.path.includes('employer') &&
            !route.path.includes('forget-password') &&
            !route.path.includes('sign-up') &&
            !route.path.includes('sign-in')
        ) {
            check = false;
        }

        useEffect(() => {
            if (check === false) {
                navigate('/employer/sign-in');
            }
        }, []);

        return (
            <Layout>
                <Page employer={employer} update={update} />
            </Layout>
        );
    };
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<PrivateRoute route={route} />} />;
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
