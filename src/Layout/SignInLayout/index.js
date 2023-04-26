import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './SignInLayout.module.scss';
const cx = classNames.bind(styles);


function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {children}
            <Footer/>
        </div>
    );
}

export default DefaultLayout;
