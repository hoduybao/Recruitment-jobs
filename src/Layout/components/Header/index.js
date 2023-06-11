import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '../Images';
import UserService from '~/utils/request';
import Menu from '../Popper/Menu';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles);

function Header({ employer = false }) {
    var user = localStorage.getItem('user');
    console.log(user);
    var path = employer === false ? '' : '/employer';
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (user) {
            const fetch = async () => {
                if (employer) {
                    let response = await UserService.getUser(`employer/myInfo
                `);
                    response.data.avatar = response.data.logo;
                    setInfo(response.data);
                } else {
                    let response = await UserService.getUser(`candidate/myInfo
                    `);
                    console.log(response.data);
                    setInfo(response.data);
                }
            };
            fetch();
        }
    }, [employer, user]);

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Trang cá nhân',
            to: `${path}/profile`,
        },
        {
            icon: <FontAwesomeIcon icon={faKey} />,
            title: 'Đổi mật khẩu',
        },
        {
            separate: true,
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            employer: employer,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link className={cx('logo')} to="/">
                    <img src={images.logo} alt="logo" />
                </Link>
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
                        <Tippy delay={[0, 100]} content="Thông báo" placement="bottom">
                            <div>
                                <FontAwesomeIcon icon={faBell} className={cx('post_new')} />
                            </div>
                        </Tippy>

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
