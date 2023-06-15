import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './ChangePassWord.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import UserService from '~/utils/request';
import Toast from '~/Layout/components/Toast';
import notify from '~/utils/toast';

const cx = classNames.bind(styles);
function ChangePassWord({ employer }) {
    const [newPassword, setNewPassword] = useState({
        current: '',
        new: '',
        re_new: '',
    });
    const [errors, setErrors] = useState({
        current: '',
        new: '',
        re_new: '',
    });

    var classes = cx('wrapper');
    if (employer) {
        classes = cx('employer');
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPassword((prevInputs) => ({ ...prevInputs, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };
    const handleChangPassword = (event) => {
        event.preventDefault();
        let success = true;

        // Validate inputs
        const newErrors = {};
        if (!newPassword.current) {
            newErrors.current = 'Không thể bỏ trống';
            success = false;
        }

        if (!newPassword.new) {
            newErrors.new = 'Không thể bỏ trống';
            success = false;
        }
        if (!newPassword.re_new) {
            newErrors.re_new = 'Không thể bỏ trống';
            success = false;
        }
        if (newPassword.re_new !== newPassword.new) {
            newErrors.re_new = 'Xác nhận mật khẩu không đúng';
            success = false;
        }

        if (success) {
            const fetch = async () => {
                if (!employer) {
                    console.log('Zo');
                    let response = await UserService.changePassword(
                        `/candidate/changePassword?password=${newPassword.current}&newPassword=${newPassword.new}`,
                    );

                    if (response.status === 'ok') {
                        notify('success', response.message);
                        window.location.href = '/';
                    } else {
                        notify('error', response.message);
                    }
                } else {
                    let response = await UserService.changePassword(
                        `/employer/changePassword?password=${newPassword.current}&newPassword=${newPassword.new}`,
                    );
                    console.log(response);
                    if (response.status === 'ok') {
                        notify('success', response.message);
                        window.location.href = '/employer';
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
        <div className={classes}>
            <Toast />
            <div className={cx('inner')}>
                <div className={cx('side-left')}>
                    <div className={cx('text_welcome_login')}>Đặt lại mật khẩu của bạn</div>

                    <form method="post" action="/sing-in">
                        <div className={cx('label_email')}>Mật khẩu hiện tại</div>
                        <div className={cx('email')}>
                            <input
                                type="password"
                                name="current"
                                className={cx('email_login')}
                                placeholder="Nhập mật khẩu hiện tại"
                                value={newPassword.current}
                                onChange={handleChange}
                            />
                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.current && <span className={cx('error')}>{errors.current}</span>}

                        <div className={cx('label_password')}>Mật khẩu mới</div>

                        <div className={cx('password')}>
                            <input
                                type="password"
                                name="new"
                                className={cx('password_login')}
                                placeholder="Nhập mật khẩu"
                                value={newPassword.new}
                                onChange={handleChange}
                            />

                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.new && <span className={cx('error')}>{errors.new}</span>}
                        <div className={cx('label_password')}>Xác nhận mật khẩu</div>

                        <div className={cx('password')}>
                            <input
                                type="password"
                                name="re_new"
                                className={cx('password_login')}
                                placeholder="Nhập lại mật khẩu"
                                value={newPassword.re_new}
                                onChange={handleChange}
                            />

                            <FontAwesomeIcon icon={faLock} className={cx('icon_password')} />
                        </div>
                        {errors.re_new && <span className={cx('error')}>{errors.re_new}</span>}

                        <button type="button" className={cx('submit_form_login')} onClick={handleChangPassword}>
                            Thay đổi mật khẩu
                        </button>
                    </form>
                </div>

                <div className={cx('side-right')}>
                    <img src={images.changePassword} id="side_login" alt="change" />
                </div>
            </div>
        </div>
    );
}

export default ChangePassWord;
