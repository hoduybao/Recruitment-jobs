import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '../Images';
import UserService from '~/utils/request';
import Menu from '../Popper/Menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBriefcase, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function Header({ employer = false }) {
    const user = localStorage.getItem('user');
    const [info, setInfo] = useState({});

    if (user) {
        const fetch = async () => {
            let response = await UserService.getUser(`candidate/myInfo
            `);
            setInfo(response.data);
        };
        fetch();
    }


    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Trang cá nhân',
            to: '/profile',
        },
        {
            icon: <FontAwesomeIcon icon={faBriefcase} />,
            title: 'Công việc của tôi',
            to: '/my-job',
        },
        {
            icon: <FontAwesomeIcon icon={faKey} />,
            title: 'Đổi mật khẩu',
        },
        {
            separate: true,
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </div>
                {!user && (
                    <div className={cx('actions')}>
                        {employer === false ? (
                            <>
                                <Link className={cx('btn_login_candidate')} to="/sign-in">
                                    Đăng nhập
                                </Link>
                                <Link className={cx('btn_signin_candidate')} to="/sign-up">
                                    Đăng ký
                                </Link>
                                <Link className={cx('btn_switch_recruiter')} to="/employer">
                                    <span>Dành cho nhà tuyển dụng</span>
                                    <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                        <FontAwesomeIcon
                                            className={cx('icon_arrow')}
                                            icon={faArrowRight}
                                            style={{ color: '#ffffff' }}
                                        />
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className={cx('btn_login_candidate')} to="/employer/sign-in">
                                    Đăng nhập
                                </Link>
                                <Link className={cx('btn_signin_candidate')} to="/employer/sign-up">
                                    Đăng ký
                                </Link>
                                <Link className={cx('btn_switch_recruiter')} to="/">
                                    <span>Dành cho người tìm việc</span>
                                    <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                        <FontAwesomeIcon
                                            className={cx('icon_arrow')}
                                            icon={faArrowRight}
                                            style={{ color: '#ffffff' }}
                                        />
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>
                )}
                {user && (
                    <div className={cx('actions')}>
                        <Menu items={userMenu}>
                            <Image src={info.avatar} className={cx('user-avatar')} alt="nguyenvana" />
                        </Menu>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
