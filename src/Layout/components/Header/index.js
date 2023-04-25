import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                <div className={cx('actions')}>
                    <Link className={cx('btn_login_candidate')} href="/">
                        Đăng nhập
                    </Link>
                    <Link className={cx('btn_signin_candidate')} href="/">
                        Đăng ký
                    </Link>
                    <Link className={cx('btn_switch_recruiter')} href="/">
                        <span>Dành cho nhà tuyển dụng</span>
                        <div style={{ display: 'inline-block', marginLeft: 10,marginTop:2 }}>
                            <FontAwesomeIcon
                                className={cx('icon_arrow')}
                                icon={faArrowRight}
                                style={{ color: '#ffffff' }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
