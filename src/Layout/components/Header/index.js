import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Image from '../Images';
import UserService from '~/utils/request';
import Menu from '../Popper/Menu';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faSignOut } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Header({ employer = false }) {
    const user = localStorage.getItem('user');
    console.log(user);
    if(user)
    {
        const fetch = async () => {
            let response = await UserService.getUser(`candidate/myInfo
            `);
            console.log(response);
            // if(response.status==="ok")
            // {
            //     window.localStorage.setItem('user', response.data);
            //     window.location.href = 'http://localhost:3001';
            // }
            // else{
                

            // }
        };
        fetch();
    }
    const userMenu = [
       
        {
            icon: <FontAwesomeIcon icon={faArrowRight} />,
            title: 'Setting',
            to: '/setting',
        },
        {
            separate: true,
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
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
                            <Image
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/39911deb09b62b80810dec42c0722bbd~c5_100x100.jpeg?x-expires=1682272800&x-signature=p%2BPQFSaSfYsmqF4Z3O4rT4d9rhk%3D"
                                className={cx('user-avatar')}
                                alt="nguyenvana"
                            />
                        </Menu>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
