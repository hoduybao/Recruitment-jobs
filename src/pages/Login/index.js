import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UserService from '~/utils/request';
const cx = classNames.bind(styles);

function Login({ employer = false }) {
    const navigate = useNavigate();
    const back = localStorage.getItem('back');
    const [signin, setSignin] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignin((prevInputs) => ({ ...prevInputs, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    const handleRegister = (event) => {
        event.preventDefault();
        let success = true;

        // Validate inputs
        const newErrors = {};
        if (!signin.email) {
            newErrors.email = 'Chưa nhập email';
            success = false;
        }

        if (!signin.password) {
            newErrors.password = 'Chưa nhập mật khẩu';
            success = false;
        }

        // Handle form submission logic
        if (success) {
            const fetch = async () => {
                if (employer) {
                    let response = await UserService.postLogin(`auth/loginEmployer`, {
                        username: signin.email,
                        password: signin.password,
                    });
                    console.log(response);
                    if (response.status === 'ok') {
                        window.localStorage.removeItem('user');
                        window.localStorage.setItem('user', response.data);
                        window.localStorage.setItem('is_employer', '1');

                        window.location.href = '/employer';
                    } else {
                        newErrors.email = response.message;
                        setErrors(newErrors);
                    }
                } else {
                    let response = await UserService.postLogin(`auth/loginCandidate`, {
                        username: signin.email,
                        password: signin.password,
                    });
                    console.log(response);
                    if (response.status === 'ok') {
                        window.localStorage.removeItem('user');
                        window.localStorage.removeItem('is_employer');

                        window.localStorage.setItem('user', response.data);
                        if (back) {
                            window.localStorage.removeItem('back');
                            navigate(-1);
                        } else {
                            window.location.href = '/';
                        }
                    } else {
                        newErrors.email = response.message;
                        setErrors(newErrors);
                    }
                }
            };
            fetch();
        } else {
            setErrors(newErrors);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('side-left')}>
                    {employer === false ? (
                        <>
                            <div className={cx('text_welcome_login')}>Chào mừng bạn trở lại</div>
                            <div className={cx('text_login_by_account')}>
                                Đăng nhập vào tài khoản <span className={cx('text_jore')}>JORE</span> của bạn
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={cx('text_welcome_login')}>Chào mừng bạn trở lại</div>
                            <div className={cx('text_login_by_account')}>
                                Đăng nhập vào tài khoản <span className={cx('text_jore')}> JORE BUSINESS </span> của bạn
                            </div>
                        </>
                    )}

                    {/* {{#if message}}
        <div class="alert alert-success mt-2">
            {{message}}
        </div>
        {{/if}}

        {{#if messageDanger}}
        <div class="alert alert-danger mt-2">
            {{messageDanger}}
        </div>
        {{/if}} */}
                    <form method="post" action="/sing-in">
                        <div className={cx('label_email')}>Email</div>
                        <div className={cx('email')}>
                            <input
                                value={signin.email}
                                type="email"
                                name="email"
                                className={cx('email_login')}
                                placeholder="Nhập email"
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} />
                        </div>
                        {errors.email && <span className={cx('error')}>{errors.email}</span>}
                        <div className={cx('label_email_password')}>
                            <div className={cx('label_password')}>Mật khẩu</div>
                            {employer === false ? (
                                <Link to="/forget-password" className={cx('forget_password')}>
                                    Quên mật khẩu
                                </Link>
                            ) : (
                                <Link to="/employer/forget-password" className={cx('forget_password')}>
                                    Quên mật khẩu
                                </Link>
                            )}
                        </div>

                        <div className={cx('password')}>
                            <input
                                value={signin.password}
                                type="password"
                                name="password"
                                className={cx('password_login')}
                                placeholder="Nhập mật khẩu"
                                onChange={handleChange}
                            />

                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.password && <span className={cx('error')}>{errors.password}</span>}

                        <button type="button" className={cx('submit_form_login')} onClick={handleRegister}>
                            Đăng nhập
                        </button>
                    </form>
                    {!employer && (
                        <>
                            <div className={cx('or')}>Hoặc</div>
                            <div className={cx('login_other')}>
                                <button className={cx('login_facebook')}>
                                    <img src={images.facebook} alt="facebook" className={cx('facebook')} />
                                </button>
                                <button className={cx('login_email')}>
                                    <img src={images.google} alt="google" className={cx('google')} />
                                </button>
                            </div>
                            <div className={cx('no_account')}>
                                Bạn chưa có tài khoản?
                                <Link to="/sign-up" className={cx('signup-now')}>
                                    Đăng ký ngay
                                </Link>
                            </div>
                        </>
                    )}
                </div>

                <div className={cx('side-right')}>
                    <img src={images.sideLogin} id="side_login" alt="login" />
                </div>
            </div>
        </div>
    );
}

export default Login;
