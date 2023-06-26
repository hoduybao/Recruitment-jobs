import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import UserService from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from '~/Layout/components/Loading';
import Toast from '~/Layout/components/Toast';
import notify from '~/utils/toast';
import {
    faCakeCandles,
    faEnvelope,
    faMarsAndVenus,
    faLocationDot,
    faPenToSquare,
    faPhone,
    faDownload,
    faCamera,
    faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Modal from 'react-overlays/Modal';

import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Profile({ employer = false, inforCV, accept, reject }) {
    const user = localStorage.getItem('user');
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [profile, setProfile] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [skill, setSkill] = useState('');
    const [errors, setErrors] = useState({
        fullname: '',
        gender: '',
        phone: '',
        address: '',
        dob: '',
        skill: '',
        experience: '',
    });
    const handleClose = () => {
        setShowModal(false);
        setProfile(info);
    };
    useEffect(() => {
        if (!employer) {
            if (user) {
                const fetch = async () => {
                    let response = await UserService.getUser(`candidate/myInfoNew
                    `);
                    console.log(response.data);
                    setInfo(response.data);
                    if (response.data.skill === null) {
                        response.data.skill = [];
                    }
                    if (response.data.gender === null) {
                        response.data.gender = 'Nam';
                    }
                    setAvatar(response.data.avatar);
                    setProfile(response.data);
                };
                fetch();
            }
        } else {
            setProfile(inforCV);

            setInfo(inforCV);
        }
    }, [inforCV, user, employer]);
    const renderBackdrop = (props) => <div className={cx('backdrop')} {...props} />;

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'skill') {
            setSkill(value);
        } else if (name === 'avatar') {
            let value2 = event.target.files[0];
            setAvatar(URL.createObjectURL(value2));
            setProfile((prevInputs) => ({ ...prevInputs, [name]: value2 }));
        } else {
            setProfile((prevInputs) => ({ ...prevInputs, [name]: value }));
            setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        }
    };
    const handleAddSkill = (event) => {
        const newJobs = [...profile.skill, skill];
        setProfile((prevInputs) => ({ ...prevInputs, skill: newJobs }));
        setSkill('');
    };
    const handleSubmitInfo = (event) => {
        event.preventDefault();
        console.log(profile);

        let success = true;
        // Validate inputs
        const newErrors = {};
        if (!profile.fullName) {
            newErrors.name = 'Họ tên không thể trống';
            success = false;
        }

        if (success) {
            setLoading(true);
            var formdata = new FormData();
            formdata.append('file', profile.avatar);
            formdata.append('fullName', profile.fullName);
            formdata.append('gender', profile.gender);
            formdata.append('phone', profile.phone);
            formdata.append('address', profile.address);
            formdata.append('dob', profile.dob);
            formdata.append('skill', profile.skill);
            formdata.append('experience', profile.experience);

            const fetch = async () => {
                let response = await UserService.updateCandidate('candidate/updateInfoCandidate', formdata);
                if (response.status === 'ok') {
                    notify('success', 'Cập nhật thành công!');
                    setLoading(false);
                    window.location.href = '/profile';
                }
                // if (response.status === 'ok') {
                //   //  notify('success', 'Báo cáo thành công!');
                // }
                //  handleClose();
            };
            fetch();
        } else {
            setErrors(newErrors);
        }
    };
    var classes = cx('wrapper');
    if (employer) {
        classes = cx('employer');
    } else {
        classes = cx('wrapper');
    }
    const convertDate = (time) => {
        const dateTime = new Date(time);
        var date = dateTime.getDate();
        var month = dateTime.getMonth() + 1; // Months are zero-based, so we add 1
        if (month.toString().length === 1) {
            month = '0' + month;
        }
        if (date.toString().length === 1) {
            date = '0' + date;
        }
        const year = dateTime.getFullYear();
        return date + '-' + month + '-' + year;
    };

    return (
        <div className={classes}>
            <Toast />
            {profile === null || info === null ? (
                <Loading />
            ) : (
                <div className={cx('inner')}>
                    <div className={cx('head_profie')}>
                        <div className={cx('wrapper_avatar')}>
                            <img src={info.avatar} className={cx('avatar')} alt="avatar" />
                            {!employer && (
                                <button
                                    className={cx('btn_edit')}
                                    onClick={() => {
                                        setShowModal(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} className={cx('icon_edit')} />
                                    Chỉnh sửa
                                </button>
                            )}
                            <Modal
                                className={cx('modal')}
                                show={showModal}
                                onHide={handleClose}
                                renderBackdrop={renderBackdrop}
                            >
                                <div>
                                    <div className={cx('modal-header')}>
                                        <div className={cx('modal-title')}>Chỉnh sửa thông tin cá nhân</div>
                                        <span className={cx('btn-close')} onClick={handleClose}>
                                            x
                                        </span>
                                    </div>
                                    <div className={cx('line')}></div>
                                    <div className={cx('modal-body')}>
                                        <div className={cx('wrapper_update_avatar')}>
                                            <img src={avatar} className={cx('avatar_update')} alt="avatar" />
                                            <input
                                                id="upload"
                                                type="file"
                                                accept=".jpg,.png"
                                                onChange={handleChange}
                                                className={cx('input_avatar')}
                                                name="avatar"
                                            />
                                            <label for="upload" className={cx('label_update_camera')}>
                                                <FontAwesomeIcon icon={faCamera} className={cx('icon_camera')} />
                                            </label>
                                        </div>

                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Họ và tên:</div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={profile.fullName}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        {errors.fullname && <span className={cx('error')}>{errors.fullname}</span>}

                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Giới tính:</div>
                                            <select
                                                name="gender"
                                                value={profile.gender}
                                                onChange={handleChange}
                                                className={cx('sex_select')}
                                            >
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Số điện thoại:</div>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={profile.phone}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Ngày sinh:</div>
                                            <input
                                                type="date"
                                                name="dob"
                                                value={profile.dob}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Địa chỉ:</div>
                                            <input
                                                type="text"
                                                name="address"
                                                value={profile.address}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Kinh nghiệm:</div>
                                            <input
                                                type="text"
                                                name="experience"
                                                value={profile.experience}
                                                onChange={handleChange}
                                                className={cx('fullname_cv')}
                                                required
                                            />
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}>Kỹ năng:</div>
                                            <input
                                                type="text"
                                                name="skill"
                                                value={skill}
                                                onChange={handleChange}
                                                className={cx('skill')}
                                                required
                                            />
                                            <button className={cx('btn_add_skill')} onClick={handleAddSkill}>
                                                Thêm
                                            </button>
                                        </div>
                                        <div className={cx('wrapper_name_CV')}>
                                            <div className={cx('text_fullname_CV')}></div>
                                            <ul className={cx('list_skill')}>
                                                {profile.skill &&
                                                    profile.skill.map((item, index) => <li key={index}>{item}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button className={cx('secondary-button')} onClick={handleClose}>
                                            Đóng
                                        </button>
                                        <button className={cx('primary-button')} onClick={handleSubmitInfo}>
                                            {loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : 'Hoàn thành'}
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <div className={cx('wrapper_infor')}>
                            <div className={cx('name_my_profile')}>{info.fullName}</div>

                            {!employer && (
                                <div className={cx('email')}>
                                    <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} /> {info.email}
                                </div>
                            )}
                        </div>
                        {employer && (
                            <div className={cx('wrapper_apply')}>
                                <button type="button" className={cx('btn_accept')} onClick={() => accept()}>
                                    Chấp nhận
                                </button>
                                <button
                                    type="button"
                                    className={cx('btn_reject')}
                                    onClick={() => {
                                        reject();
                                    }}
                                >
                                    Từ chối
                                </button>
                            </div>
                        )}
                    </div>
                    {employer && (
                        <div className={cx('general_infor')}>
                            <div className={cx('record')}>Hồ sơ ứng tuyển</div>
                            <a className={cx('CV')} href={info.cv} target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faDownload} className={cx('icon_CV')} /> CV
                            </a>
                        </div>
                    )}
                    {!employer && (
                        <div className={cx('general_infor')}>
                            <div className={cx('title_general_infor')}>Thông tin cá nhân </div>

                            <div className={cx('dob')}>
                                <FontAwesomeIcon icon={faCakeCandles} className={cx('icon_infor')} />
                                {info.dob === null ? 'Chưa có' : convertDate(info.dob)}
                            </div>
                            <div className={cx('gender')}>
                                <FontAwesomeIcon icon={faMarsAndVenus} className={cx('icon_infor')} />
                                {info.gender === null ? 'Chưa có' : info.gender}
                            </div>
                            <div className={cx('phone')}>
                                <FontAwesomeIcon icon={faPhone} className={cx('icon_infor')} />
                                {info.phone === null ? 'Chưa có' : info.phone}
                            </div>
                            <div className={cx('address')}>
                                <FontAwesomeIcon icon={faLocationDot} className={cx('icon_infor')} />
                                {info.address === null ? 'Chưa có' : info.address}
                            </div>
                        </div>
                    )}

                    {employer === false ? (
                        <div className={cx('general_infor')}>
                            <div className={cx('title_general_infor')}>
                                Kỹ năng cá nhân:{' '}
                                <span className={cx('experience')}>{info.skill.length === 0 && 'Chưa có'}</span>
                            </div>

                            {info.skill.length > 0 && (
                                <ul className={cx('list_skills')}>
                                    {info.skill.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            <div className={cx('title_experience')}>
                                Kinh nghiệm làm việc:
                                <span className={cx('experience')}>
                                    {info.experience === null || info.experience === '' ? ' Chưa có' : info.experience}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className={cx('bottom')}>
                            <div className={cx('title_introduce')}>Giới thiệu một số kỹ năng và dự án</div>
                            <p className={cx('text_introduce')}>{info.introduce}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Profile;
