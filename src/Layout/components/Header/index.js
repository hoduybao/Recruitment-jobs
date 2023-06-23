import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '../Images';
import UserService from '~/utils/request';
import Menu from '../Popper/Menu';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBell, faBriefcase, faKey, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles);

function Header({ employer = false }) {
    console.log(employer);
    var user = localStorage.getItem('user');
    var em = localStorage.getItem('is_employer');
    console.log(user);
    var path = employer === false ? '' : '/employer';
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (user) {
            const fetch = async () => {
                if (!employer) {
                    let response = await UserService.getUser(`candidate/myInfoNew
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
            to: `/profile`,
        },
        {
            icon: <FontAwesomeIcon icon={faKey} />,
            title: 'Đổi mật khẩu',
            to: `/change-password`,
        },
        {
            icon: <FontAwesomeIcon icon={faBriefcase} />,
            title: 'Việc làm của tôi',
            to: `/my-job`,
        },
        {
            separate: true,
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
        },
    ];

    // useEffect(() => {
    //     const socket = new WebSocket('ws://https://hiringweb.up.railway.app/notify');

    //     socket.onopen = () => {
    //         console.log('WebSocket connected');
    //     };

    //     socket.onmessage = (event) => {
    //         const message = event.data;
    //         console.log('Received message from WebSocket server:', message);
    //     };

    //     return () => {
    //         socket.close();
    //     };
    // }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {employer === false ? (
                    <img
                        src={images.logo}
                        alt="logo"
                        onClick={() => {
                            window.location.href = '/';
                        }}
                    />
                ) : (
                    <img
                        src={images.logo}
                        alt="logo"
                        onClick={() => {
                            window.location.href = '/employer';
                        }}
                    />
                )}

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
                                <button
                                    className={cx('btn_switch_recruiter')}
                                    onClick={() => {
                                        var em = localStorage.getItem('is_employer');

                                        if (em) {
                                            window.location.href = '/employer';
                                        } else {
                                            window.location.href = '/employer/sign-in';
                                        }
                                    }}
                                >
                                    <span>Dành cho nhà tuyển dụng</span>
                                    <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                        <FontAwesomeIcon
                                            className={cx('icon_arrow')}
                                            icon={faArrowRight}
                                            style={{ color: '#ffffff' }}
                                        />
                                    </div>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className={cx('btn_login_candidate')} to="/employer/sign-in">
                                    Đăng nhập
                                </Link>
                                <Link className={cx('btn_signin_candidate')} to="/employer/sign-up">
                                    Đăng ký
                                </Link>
                                <button
                                    className={cx('btn_switch_recruiter')}
                                    onClick={() => {
                                        var em = localStorage.getItem('is_employer');

                                        if (em) {
                                            window.location.href = '/sign-in';
                                        } else {
                                            window.location.href = '/';
                                        }
                                    }}
                                >
                                    <span>Dành cho người tìm việc</span>
                                    <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                        <FontAwesomeIcon
                                            className={cx('icon_arrow')}
                                            icon={faArrowRight}
                                            style={{ color: '#ffffff' }}
                                        />
                                    </div>
                                </button>
                            </>
                        )}
                    </div>
                )}
                {user &&
                    !em &&
                    (employer === false ? (
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
                    ) : (
                        <div className={cx('actions')}>
                            <Link className={cx('btn_login_candidate')} to="/employer/sign-in">
                                Đăng nhập
                            </Link>
                            <Link className={cx('btn_signin_candidate')} to="/employer/sign-up">
                                Đăng ký
                            </Link>
                            <button
                                className={cx('btn_switch_recruiter')}
                                onClick={() => {
                                    var em = localStorage.getItem('is_employer');

                                    if (em) {
                                        window.location.href = '/sign-in';
                                    } else {
                                        window.location.href = '/';
                                    }
                                }}
                            >
                                <span>Dành cho người tìm việc</span>
                                <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                    <FontAwesomeIcon
                                        className={cx('icon_arrow')}
                                        icon={faArrowRight}
                                        style={{ color: '#ffffff' }}
                                    />
                                </div>
                            </button>
                        </div>
                    ))}
                {user &&
                    em &&
                    (employer === false ? (
                        <div className={cx('actions')}>
                            <Link className={cx('btn_login_candidate')} to="/sign-in">
                                Đăng nhập
                            </Link>
                            <Link className={cx('btn_signin_candidate')} to="/sign-up">
                                Đăng ký
                            </Link>
                            <button
                                className={cx('btn_switch_recruiter')}
                                onClick={() => {
                                    var em = localStorage.getItem('is_employer');

                                    if (em) {
                                        window.location.href = '/employer';
                                    } else {
                                        window.location.href = '/employer/sign-in';
                                    }
                                }}
                            >
                                <span>Dành cho nhà tuyển dụng</span>
                                <div style={{ display: 'inline-block', marginLeft: 10, marginTop: 2 }}>
                                    <FontAwesomeIcon
                                        className={cx('icon_arrow')}
                                        icon={faArrowRight}
                                        style={{ color: '#ffffff' }}
                                    />
                                </div>
                            </button>
                        </div>
                    ) : (
                        <div className={cx('actions')}>
                            <Tippy delay={[0, 100]} content="Thông báo" placement="bottom">
                                <div>
                                    <FontAwesomeIcon icon={faBell} className={cx('post_new')} />
                                </div>
                            </Tippy>
                        </div>
                    ))}
            </div>
        </header>
    );
}

export default React.memo(Header);
