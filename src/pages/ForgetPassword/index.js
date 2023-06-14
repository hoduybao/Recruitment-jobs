import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './ForgetPassword.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserService from '~/utils/request';
import Toast from '~/Layout/components/Toast';
import notify from '~/utils/toast';

const cx = classNames.bind(styles);
function ForgetPassword({ employer }) {
    const [email, setEmail] = useState('');
    const [error, setErrors] = useState('');
    const handleChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setErrors('');
    };
    const handleForgetPassword = (event) => {
        event.preventDefault();
        let success = true;
        var regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // Validate inputs
        var newErrors = '';

        if (email === '') {
            newErrors = 'Chưa nhập email';
            success = false;
        } else if (!email.match(regexEmail)) {
            newErrors = 'Email không đúng định dạng';
            success = false;
        }

        if (success) {
            const fetch = async () => {
                if (!employer) {
                    console.log('Zo');
                    let response = await UserService.forgetPassword(
                        `/auth/forgotPassword?email=${email}&role=CANDIDATE`,
                    );
                    console.log(response);
                    if (response.status === 'ok') {
                        notify('success', "Đã gửi liên kết đặt lại mật khẩu đến email!");
                    } else {
                        notify('error', response.message);
                    }
                } else {
                    let response = await UserService.forgetPassword(
                        `/auth/forgotPassword?email=${email}&role=EMPLOYER`,
                    );
                    console.log(response);
                    if (response.status === 'ok') {
                        notify('success', "Đã gửi liên kết đặt lại mật khẩu đến email!");
                    } else {
                        notify('error', response.message);
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
            <Toast />
            <div className={cx('inner')}>
                <div className={cx('side-left')}>
                    <div className={cx('text_welcome_login')}>Nhận lại mật khẩu của bạn</div>
                    <div className={cx('text_login_by_account')}>
                        Vui lòng nhập đia chỉ email để khôi phục tài khoản của bạn
                    </div>
                    <form method="post" action="/sing-in">
                        <div className={cx('label_email')}>Email</div>
                        <div className={cx('email')}>
                            <input
                                type="email"
                                name="email"
                                className={cx('email_login')}
                                placeholder="hoduybao@gmail.com"
                                value={email}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon_password')} />
                        </div>
                        {error && <span className={cx('error')}>{error}</span>}

                        <button type="button" className={cx('submit_form_login')} onClick={handleForgetPassword}>
                            Gửi
                        </button>
                    </form>
                </div>

                <div className={cx('side-right')}>
                    <img src={images.forgetPassword} id="side_login" alt="change" />
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
