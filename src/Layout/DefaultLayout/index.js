import Header from '../components/Header';
import Footer from '../components/Footer';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Search from '../components/Search';
const cx = classNames.bind(styles);


function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <Search/>
            {children}
            <Footer/>
        </div>
    );
}

export default DefaultLayout;