import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import UserService from '~/utils/request';
import { useState } from 'react';
import Toast from '~/Layout/components/Toast';
import notify from '~/utils/toast';
const cx = classNames.bind(styles);

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
    });

    let success = true;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignup((prevInputs) => ({ ...prevInputs, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    const handleRegister = (event) => {
        event.preventDefault();

        // Validate inputs
        const newErrors = {};
        if (!signup.email) {
            newErrors.email = 'Chưa nhập email';
            success = false;
        }
        if (!signup.name) {
            newErrors.name = 'Chưa nhập họ tên';
            success = false;
        }
        if (!signup.password) {
            newErrors.password = 'Chưa nhập mật khẩu';
            success = false;
        }
        if (!signup.confirm || signup.password !== signup.confirm) {
            newErrors.confirm = 'Xác nhận mật khẩu không đúng';
            success = false;
        }

        // Handle form submission logic
        if (success) {
            setLoading(true);
            const fetch = async () => {
                let response = await UserService.postLogin(`auth/signup/candidate`, {
                    fullname: signup.name,
                    email: signup.email,
                    password: signup.password,
                });

                console.log(response);
                if (response.status === 'ok') {
                    notify('success', 'Đăng ký thành công!');
                    setLoading(false);
                    window.location.href = '/sign-in';
                } else {
                    setLoading(false);
                    newErrors.email = response.message;
                    setErrors(newErrors);
                }
            };
            fetch();
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Toast />
            <div className={cx('inner')}>
                <div className={cx('side-left')}>
                    <div className={cx('text_welcome_signup')}>
                        Chào mừng bạn đến với <span className={cx('text_jore')}>JORE</span>
                    </div>
                    <div className={cx('text_login_by_account')}>Hãy tạo tài khoản để cùng sử dụng dịch vụ</div>

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
                    <form method="post" action="/sing-up">
                        <div className={cx('label_name')}>Họ tên</div>
                        <div className={cx('fullname')}>
                            <input
                                value={signup.name}
                                type="text"
                                name="name"
                                className={cx('name_signup')}
                                required
                                placeholder="Nhập họ tên"
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faUser} className={cx('icon_name')} />
                        </div>
                        {errors.name && <span className={cx('error')}>{errors.name}</span>}
                        <div className={cx('label_email')}>Email</div>
                        <div className={cx('email')}>
                            <input
                                value={signup.email}
                                type="email"
                                name="email"
                                className={cx('email_login')}
                                required
                                placeholder="Nhập email"
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} />
                        </div>
                        {errors.email && <span className={cx('error')}>{errors.email}</span>}

                        <div className={cx('label_password')}>Mật khẩu</div>

                        <div className={cx('password')}>
                            <input
                                value={signup.password}
                                type="password"
                                name="password"
                                className={cx('password_login')}
                                required
                                placeholder="Nhập mật khẩu"
                                onChange={handleChange}
                            />

                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.password && <span className={cx('error')}>{errors.password}</span>}

                        <div className={cx('label_password')}>Xác nhận mật khẩu</div>

                        <div className={cx('password')}>
                            <input
                                value={signup.confirm}
                                type="password"
                                name="confirm"
                                className={cx('password_login')}
                                required
                                placeholder="Nhập lại mật khẩu"
                                onChange={handleChange}
                            />

                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.confirm && <span className={cx('error')}>{errors.confirm}</span>}
                        <button type="button" className={cx('submit_form_login')} onClick={handleRegister}>
                            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Đăng ký'}
                        </button>
                    </form>

                    <div className={cx('no_account')}>
                        Bạn đã có tài khoản?
                        <Link to="/sign-in" className={cx('signup-now')}>
                            Đăng nhập ngay
                        </Link>
                    </div>
                </div>

                <div className={cx('side-right')}>
                    <img src={images.sideLogin} id="side_login" alt="login" />
                </div>
            </div>
            {/**/}
        </div>
    );
}

export default SignUp;
