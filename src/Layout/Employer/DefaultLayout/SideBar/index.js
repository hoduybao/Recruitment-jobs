import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faFile,
    faFileLines,
    faKey,
    faMagnifyingGlassPlus,
    faSignOut,
    faSquarePollVertical,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

import UserService from '~/utils/request';
const cx = classNames.bind(styles);

function SideBar() {
    const [activeLink, setActiveLink] = useState(1);
    const user = localStorage.getItem('user');
    const handleLinkClick = (linkId) => {
        setActiveLink(linkId);
    };
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/employer/sign-in';
    };
    const [infor, setInfo] = useState({});
    useEffect(() => {
        const fetch = async () => {
            if (user) {
                let response = await UserService.getUser(`employer/myInfo
                `);
                console.log(response.data);
                response.data.name = response.data.company.name;
                setInfo(response.data);
            }
        };
        fetch();
    }, [user]);
    return (
        <aside className={cx('wrapper')}>
            <div className={cx('header')}>
                <img src={infor.logo} alt="avatar" className={cx('avatar')} />
                <div>
                    <div className={cx('name_employer')}>
                        {infor.name}
                        <FontAwesomeIcon icon={faCircleCheck} style={{ marginLeft: 5, color: '#00B4D8' }} />
                    </div>
                    <div className={cx('text_info')}>Business</div>
                    <div className={cx('text_info')}>
                        Tài khoản đã được<span style={{ color: '#00B4D8' }}> JORE </span>xác nhận
                    </div>
                </div>
            </div>
            <div className={cx('menu')}>
                <Link
                    className={cx('item', activeLink === 1 ? 'selected' : 'not_selected')}
                    to="/employer"
                    onClick={() => {
                        handleLinkClick(1);
                    }}
                >
                    <FontAwesomeIcon icon={faSquarePollVertical} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Bảng tin</span>
                </Link>
                <Link
                    className={cx('item', activeLink === 2 ? 'selected' : 'not_selected')}
                    onClick={() => {
                        handleLinkClick(2);
                    }}
                    to="/employer/jobs"
                >
                    <FontAwesomeIcon icon={faFileLines} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Quản lý tin tuyển dụng</span>
                </Link>
                <Link
                    className={cx('item', activeLink === 3 ? 'selected' : 'not_selected')}
                    onClick={() => {
                        handleLinkClick(3);
                    }}
                    to="/employer/post-job"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlassPlus} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Đăng tin</span>
                </Link>

                <Link
                    className={cx('item', activeLink === 4 ? 'selected' : 'not_selected')}
                    onClick={() => {
                        handleLinkClick(4);
                    }}
                    to="/employer/profile"
                >
                    <FontAwesomeIcon icon={faUser} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Trang cá nhân</span>
                </Link>
            </div>
            <div className={cx('menu')}>
                <Link
                    className={cx('item', activeLink === 5 ? 'selected' : 'not_selected')}
                    onClick={() => {
                        handleLinkClick(5);
                    }}
                    to="/employer/change-password"
                >
                    <FontAwesomeIcon icon={faKey} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Đổi mật khẩu</span>
                </Link>
                <Link
                    className={cx('item', activeLink === 6 ? 'selected' : 'not_selected')}
                    onClick={() => {
                        handleLinkClick(6);
                        handleLogout();
                    }}
                    to="/employer/sign-in"
                >
                    <FontAwesomeIcon icon={faSignOut} className={cx('icon_menu')} />
                    <span className={cx('name_item')}>Đăng xuất</span>
                </Link>
            </div>
            <div className={cx('text_version')}>©️2022 JORE. All rights reversed.</div>
        </aside>
    );
}

export default React.memo(SideBar);
