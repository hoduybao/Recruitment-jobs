import Header from '~/Layout/components/Header';
import Footer from '~/Layout/components/Footer';
import classNames from 'classnames/bind';
import SideBar from './SideBar';
import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header employer />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
