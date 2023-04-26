import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Following() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('side-left')}>
                    <div className={cx('text_welcome_login')}>Chào mừng bạn trở lại</div>
                    <div className={cx('text_login_by_account')}>
                        Đăng nhập vào tài khoản <span className={cx('text_jore')}>JORE</span> của bạn
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
                    <form method="post" action="/sing-in">
                        <div className={cx('label_email_password')}>
                            <div className={cx('label_email')}>Email</div>
                            <Link to="/" className={cx('forget_password')}>
                                Quên mật khẩu
                            </Link>
                        </div>
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
                        <button type="submit" className={cx('submit_form_login')}>
                            Đăng nhập
                        </button>
                        <div className={cx('or')}>Hoặc</div>
                    </form>
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
                </div>

                <div className={cx('side-right')}>
                    <img src={images.sideLogin} id="side_login" alt="login" />
                </div>
             
            </div>
            {/**/}
        </div>
    );
}

export default Following;
