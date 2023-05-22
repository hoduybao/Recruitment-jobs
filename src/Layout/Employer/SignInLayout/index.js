import Header from '~/Layout/components/Header';
import Footer from '~/Layout/components/Footer';
import classNames from 'classnames/bind';
import styles from './SignInLayout.module.scss';
const cx = classNames.bind(styles);


function SignInLayout({ children }) {
    
    return (
        <div className={cx('wrapper')}>
            <Header employer />
            {children}
            <Footer/>
        </div>
    );
}

export default SignInLayout;
