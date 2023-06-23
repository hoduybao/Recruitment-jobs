import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import UserService from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBuilding,
    faCalendarDays,
    faEnvelope,
    faLink,
    faLocationDot,
    faLock,
    faPhone,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function SignUp() {
    const [signup, setSignup] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm: '',
        address: 'Thành phố Hà Nội',
        phone: '',
        size: '',
        time1: 'Thứ Hai',
        time2: 'Thứ Bảy',
        web: '',
    });
    const [errors, setErrors] = useState({
        fullname: '',
        email: '',
        password: '',
        confirm: '',
        address: '',
        phone: '',
        size: '',
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
        if (!signup.size) {
            newErrors.size = 'Chưa nhập quy mô công ty';
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
                    window.location.href = '/employer/sign-in';
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
    const urlProvice = 'https://provinces.open-api.vn/api/';
    const [provinces, setProvinces] = useState([]);
    useEffect(() => {
        fetch(urlProvice)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setProvinces(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('text_welcome_signup')}>
                    Chào mừng bạn đến với <span className={cx('text_jore')}>JORE BUSINESS</span>
                </div>
                <div className={cx('text_login_by_account')}>
                    Hãy đăng ký tài khoản để tiếp cận các ứng viên bạn không thể tìm thấy ở bất cứ nơi nào khác
                </div>

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
                    <div className={cx('wrapper_address')}>
                        <select
                            name="address"
                            value={signup.address}
                            onChange={handleChange}
                            className={cx('input_address')}
                            required=""
                        >
                            {provinces.map((province) => (
                                <option value={province.name}>{province.name}</option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon_name')} />
                    </div>

                    {/* <div className={cx('location')}>
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
                    </div> */}
                    {errors.address && <span className={cx('error')}>{errors.address}</span>}

                    <div className={cx('label_location')}>Quy mô công ty</div>

                    <div className={cx('hotline')}>
                        <input
                            type="text"
                            name="size"
                            className={cx('phone')}
                            value={signup.size}
                            onChange={handleChange}
                            placeholder="20-50 nhân viên"
                        />
                        <FontAwesomeIcon icon={faUserGroup} className={cx('icon_name')} />
                    </div>
                    {errors.size && <span className={cx('error')}>{errors.size}</span>}

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
                    <div className={cx('label_location')}>Thời gian làm việc</div>
                    <div>
                        <div className={cx('wrapper_address')}>
                            <select
                                name="time1"
                                value={signup.time1}
                                onChange={handleChange}
                                className={cx('time1')}
                                required=""
                            >
                                <option value="Thứ Hai">Thứ Hai</option>
                                <option value="Thứ Ba">Thứ Ba</option>
                                <option value="Thứ Tư">Thứ Tư</option>
                                <option value="Thứ Năm">Thứ Năm</option>
                                <option value="Thứ Sáu">Thứ Sáu</option>
                                <option value="Thứ Bảy">Thứ Bảy</option>
                                <option value="Chủ Nhật">Chủ Nhật</option>
                            </select>
                            <FontAwesomeIcon icon={faCalendarDays} className={cx('icon_name')} />
                        </div>

                        <span className={cx('between_time')}>đến</span>
                        <div className={cx('wrapper_address')}>
                            <select
                                name="time2"
                                value={signup.time2}
                                onChange={handleChange}
                                className={cx('time1')}
                                required=""
                            >
                                <option value="Thứ Hai">Thứ Hai</option>
                                <option value="Thứ Ba">Thứ Ba</option>
                                <option value="Thứ Tư">Thứ Tư</option>
                                <option value="Thứ Năm">Thứ Năm</option>
                                <option value="Thứ Sáu">Thứ Sáu</option>
                                <option value="Thứ Bảy">Thứ Bảy</option>
                                <option value="Chủ Nhật">Chủ Nhật</option>
                            </select>
                            <FontAwesomeIcon icon={faCalendarDays} className={cx('icon_name')} />
                        </div>
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
