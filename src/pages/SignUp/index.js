import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function SignUp() {
    return (
        <div className={cx('wrapper')}>
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
                                type="text"
                                name="name"
                                className={cx('name_signup')}
                                required
                                placeholder="Nhập họ tên"
                            />
                            <FontAwesomeIcon icon={faUser} className={cx('icon_name')} />
                        </div>
                        <div className={cx('label_email')}>Email</div>
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
                        <button type="submit" className={cx('submit_form_login')}>
                            Đăng ký
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
