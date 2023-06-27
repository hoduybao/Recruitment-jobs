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
import 'tippy.js/dist/tippy.css'; // optional
const cx = classNames.bind(styles);

function Header({ employer = false }) {
    const [numberNotify, setNumberNotify] = useState(0);
    var classEmployer = cx('inner');
    if (employer) {
        classEmployer = cx('inner_employer');
    }

    var user = localStorage.getItem('user');
    var em = localStorage.getItem('is_employer');

    const [info, setInfo] = useState({});
    // const [numberNotify, setNumberNotify] = useState(0);
    const [notifies, setListNotify] = useState([]);
    const countNotify = (array) => {
        return array.data.reduce((count, num) => {
            if (num.status === 'new') {
                return count + 1;
            } else {
                return count;
            }
        }, 0);
    };
    useEffect(() => {
        if (user) {
            const fetch = async () => {
                if (!employer) {
                    let response = await UserService.getUser(`candidate/myInfoNew
                    `);
                    setInfo(response.data);
                    let response1 = await UserService.getUser(`candidate/getAllNotification
                    `);

                    setNumberNotify(countNotify(response1));
                    var eventSource;

                    function reconnect() {
                        // Đóng kết nối hiện tại
                        eventSource.close();

                        // Tái kết nối sau 3 giây
                        setTimeout(connect, 3000);
                    }
                    function connect() {
                        // Tạo một EventSource kết nối đến endpoint SSE
                        eventSource = new EventSource(
                            `https://hiringweb.up.railway.app/notification/subscribe/${response.data.email}`,
                        );

                        // Xử lý sự kiện nhận thông báo
                        eventSource.onmessage = function (event) {
                            var data = JSON.parse(event.data);
                            setNumberNotify((pre) => {
                                return pre + 1;
                            }); // var notificationDiv = document.getElementById('notification');
                            //notificationDiv.innerHTML += event.data.content + '<br>';
                            //  console.log(data);
                        };

                        // Xử lý sự kiện lỗi kết nối SSE
                        eventSource.onerror = function () {
                            console.log('Error occurred in SSE connection.');
                            reconnect();
                        };
                    }

                    // Kết nối lần đầu
                    connect();

                    // console.log(response1.data);
                    //  setInfo(response.data);
                } else {
                    let response = await UserService.getUser(`employer/myInfo`);

                    let response1 = await UserService.getUser(`employer/getAllNotification
                    `);

                    setNumberNotify(countNotify(response1));

                    var eventSource;

                    function reconnect() {
                        // Đóng kết nối hiện tại
                        eventSource.close();
                        connect();
                        // Tái kết nối sau 3 giây
                        //  setTimeout(connect, 0);
                    }
                    function connect() {
                        // Tạo một EventSource kết nối đến endpoint SSE
                        eventSource = new EventSource(
                            `https://hiringweb.up.railway.app/notification/subscribe/${response.data.companyId}`,
                        );

                        // Xử lý sự kiện nhận thông báo
                        eventSource.onmessage = function (event) {
                            var data = JSON.parse(event.data);
                            console.log(numberNotify);
                            console.log(data);
                            setNumberNotify((pre) => {
                                return pre + 1;
                            });
                        };

                        // Xử lý sự kiện lỗi kết nối SSE
                        eventSource.onerror = function () {
                            console.log('Error occurred in SSE connection.');
                            reconnect();
                        };
                    }

                    // Kết nối lần đầu
                    connect();
                }
            };
            fetch();
        }
    }, [employer, user]);

    const handleClickNotify = () => {
        if (employer) {
            setNumberNotify(0);

            const fetchNotify = async () => {
                let response1 = await UserService.getUser(`employer/getAllNotification
                `);
                setListNotify(response1.data);
                let postSeen = await UserService.getUser(`employer/setSentNotification
                `);

                //setNumberNotify(0);
            };
            fetchNotify();
        } else {
            const fetchNotify = async () => {
                setNumberNotify(0);

                let response1 = await UserService.getUser(`candidate/getAllNotification
                `);
                setListNotify(response1.data);
                let postSeen = await UserService.getUser(`candidate/setSentNotification
                `);

                //   setNumberNotify(0);
            };
            fetchNotify();
        }
    };
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

    return (
        <header className={cx('wrapper')}>
            <div className={classEmployer}>
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
                                        localStorage.removeItem('sidebar');

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
                                        window.localStorage.removeItem('sidebar');

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
                            <Menu notifies={notifies}>
                                <div onClick={handleClickNotify} className={cx('wrapper_notify')}>
                                    <FontAwesomeIcon icon={faBell} className={cx('post_new')} />
                                    {numberNotify > 0 && <div className={cx('number_notify')}>{numberNotify}</div>}
                                </div>
                            </Menu>

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
                                    window.localStorage.removeItem('sidebar');

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
                            <Menu notifies={notifies}>
                                <div onClick={handleClickNotify} className={cx('wrapper_notify')}>
                                    <FontAwesomeIcon icon={faBell} className={cx('post_new')} />
                                    {numberNotify > 0 && <div className={cx('number_notify')}>{numberNotify}</div>}
                                </div>
                            </Menu>
                            {/* <Tippy delay={[0, 100]} content="Thông báo" placement="bottom">
                                <div>
                                    <FontAwesomeIcon icon={faBell} className={cx('post_new')} />
                                </div>
                            </Tippy> */}
                        </div>
                    ))}
            </div>
        </header>
    );
}

export default Header;
