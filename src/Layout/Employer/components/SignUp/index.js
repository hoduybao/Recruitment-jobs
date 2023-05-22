import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faLock, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SignUp() {
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
                            required
                            placeholder="Nhập email"
                        />
                        <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} />
                    </div>
                    <div className={cx('label_password')}>Mật khẩu</div>

                    <div className={cx('password')}>
                        <input
                            type="password"
                            name="password"
                            className={cx('password_login')}
                            required
                            placeholder="Nhập mật khẩu"
                        />

                        <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                    </div>

                    <div className={cx('label_password')}>Xác nhận mật khẩu</div>

                    <div className={cx('password')}>
                        <input
                            type="password"
                            name="re_password"
                            className={cx('password_login')}
                            required
                            placeholder="Nhập lại mật khẩu"
                        />

                        <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                    </div>

                    <div className={cx('title_login')}>Thông tin nhà tuyển dụng</div>

                    <div className={cx('label_name')}>Tên công ty</div>
                    <div className={cx('fullname')}>
                        <input
                            type="text"
                            name="name"
                            className={cx('name_company')}
                            required
                            placeholder="Nhập tên công ty"
                        />
                        <FontAwesomeIcon icon={faBuilding} className={cx('icon_name')} />
                    </div>
                    <div className={cx('label_location')}>Địa điểm làm việc</div>
                    <div className={cx('location')}>
                        <div>
                            <input type="radio" id="HCM" name="location" value="HCM" className={cx('value_location')} />
                            <label for="HCM">Hồ Chí Minh</label>
                        </div>

                        <div>
                            <input type="radio" id="DN" name="location" value="DN" className={cx('value_location')} />
                            <label for="DN">Đà Nẵng</label>
                        </div>

                        <div>
                            <input type="radio" id="HN" name="location" value="HN" className={cx('value_location')} />
                            <label for="HN">Hà Nội</label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                id="Other"
                                name="location"
                                value="Other"
                                className={cx('value_location')}
                            />
                            <label for="Other">Khác</label>
                        </div>
                    </div>
                    <div className={cx('label_location')}>Số điện thoại</div>

                    <div className={cx('hotline')}>
                        <input
                            type="text"
                            name="name"
                            className={cx('phone')}
                            required
                            placeholder="Nhập số điện thoại"
                        />
                        <FontAwesomeIcon icon={faPhone} className={cx('icon_name')} />
                    </div>
                    <div className={cx('label_location')}>Trang web</div>

                    <div className={cx('hotline')}>
                        <input
                            type="text"
                            name="url"
                            className={cx('phone')}
                            required
                            placeholder="Nhập đường dẫn "
                        />
                        <FontAwesomeIcon icon={faLink} className={cx('icon_name')} />
                    </div>
                    <button type="submit" className={cx('submit_form_login')}>
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
