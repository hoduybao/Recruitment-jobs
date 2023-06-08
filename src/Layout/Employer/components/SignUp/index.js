import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import UserService from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);

function SignUp() {
    const [signup, setSignup] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm: '',
        address: '',
        phone: '',
        web: '',
    });
    const [errors, setErrors] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm: '',
        address: '',
        phone: '',
        web: '',
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
        if (!signup.fullname) {
            newErrors.fullname = 'Chưa nhập họ tên';
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
        if (!signup.address) {
            newErrors.address = 'Chưa chọn địa chỉ';
            success = false;
        }
        if (!signup.phone) {
            newErrors.phone = 'Chưa nhập số điện thoại';
            success = false;
        }

        // Handle form submission logic
        if (success) {
            const fetch = async () => {
                let response = await UserService.postLogin(`auth/signup/employer`, {
                    name: signup.fullname,
                    email: signup.email,
                    password: signup.password,
                    address: signup.address,
                    phone: signup.phone,
                    domain: signup.web,
                });

                console.log(response);
                if (response.status === 'ok') {
                    window.location.href = 'http://localhost:3001/employer/sign-in';
                } else {
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
            <div className={cx('inner')}>
                <div className={cx('text_welcome_signup')}>
                    Chào mừng bạn đến với <span className={cx('text_jore')}>JORE BUSINESS</span>
                </div>
                <div className={cx('text_login_by_account')}>
                    Hãy đăng ký tài khoản để tiếp cận các ứng viên bạn không thể tìm thấy ở bất cứ nơi nào khác
                </div>

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
                <div className={cx('title_login')}>Tài khoản đăng nhập</div>
                <form method="post" action="/sing-up">
                    <div className={cx('label_email')}>Email làm việc</div>
                    <div className={cx('email')}>
                        <input
                            type="email"
                            name="email"
                            className={cx('email_login')}
                            placeholder="Nhập email"
                            value={signup.email}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} />
                    </div>
                    {errors.email && <span className={cx('error')}>{errors.email}</span>}

                    <div className={cx('label_password')}>Mật khẩu</div>

                    <div className={cx('password')}>
                        <input
                            type="password"
                            name="password"
                            className={cx('password_login')}
                            placeholder="Nhập mật khẩu"
                            value={signup.password}
                            onChange={handleChange}
                        />

                        <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                    </div>
                    {errors.password && <span className={cx('error')}>{errors.password}</span>}

                    <div className={cx('label_password')}>Xác nhận mật khẩu</div>

                    <div className={cx('password')}>
                        <input
                            type="password"
                            name="confirm"
                            className={cx('password_login')}
                            placeholder="Nhập lại mật khẩu"
                            value={signup.confirm}
                            onChange={handleChange}
                        />

                        <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                    </div>
                    {errors.confirm && <span className={cx('error')}>{errors.confirm}</span>}

                    <div className={cx('title_login')}>Thông tin nhà tuyển dụng</div>

                    <div className={cx('label_name')}>Tên công ty</div>
                    <div className={cx('fullname')}>
                        <input
                            type="text"
                            name="fullname"
                            className={cx('name_company')}
                            placeholder="Nhập tên công ty"
                            value={signup.fullname}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon icon={faBuilding} className={cx('icon_name')} />
                    </div>
                    {errors.fullname && <span className={cx('error')}>{errors.fullname}</span>}

                    <div className={cx('label_location')}>Địa điểm làm việc</div>
                    <div className={cx('location')}>
                        <div>
                            <input
                                type="radio"
                                id="HCM"
                                name="address"
                                value="HCM"
                                className={cx('value_location')}
                                onChange={handleChange}
                            />
                            <label for="HCM">Hồ Chí Minh</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="DN"
                                name="address"
                                value="DN"
                                className={cx('value_location')}
                                onChange={handleChange}
                            />
                            <label for="DN">Đà Nẵng</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="HN"
                                name="address"
                                value="HN"
                                className={cx('value_location')}
                                onChange={handleChange}
                            />
                            <label for="HN">Hà Nội</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="address"
                                value="Other"
                                className={cx('value_location')}
                                onChange={handleChange}
                            />
                            <label for="Other">Khác</label>
                        </div>
                    </div>
                    {errors.address && <span className={cx('error')}>{errors.address}</span>}

                    <div className={cx('label_location')}>Số điện thoại</div>

                    <div className={cx('hotline')}>
                        <input
                            type="text"
                            name="phone"
                            className={cx('phone')}
                            value={signup.phone}
                            onChange={handleChange}
                            placeholder="Nhập số điện thoại"
                        />
                        <FontAwesomeIcon icon={faPhone} className={cx('icon_name')} />
                    </div>
                    {errors.phone && <span className={cx('error')}>{errors.phone}</span>}

                    <div className={cx('label_location')}>Trang web</div>

                    <div className={cx('hotline')}>
                        <input
                            type="text"
                            name="web"
                            className={cx('phone')}
                            placeholder="Nhập đường dẫn "
                            value={signup.web}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon icon={faLink} className={cx('icon_name')} />
                    </div>

                    <button type="button" onClick={handleRegister} className={cx('submit_form_login')}>
                        Đăng ký
                    </button>
                </form>

                <div className={cx('no_account')}>
                    Bạn đã có tài khoản?
                    <Link to="/employer/sign-in" className={cx('signup-now')}>
                        &nbsp; Đăng nhập ngay
                    </Link>
                </div>
            </div>

            {/**/}
        </div>
    );
}

export default SignUp;
