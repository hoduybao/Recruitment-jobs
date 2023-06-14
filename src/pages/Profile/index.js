import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import UserService from '~/utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCakeCandles,
    faEnvelope,
    faMarsAndVenus,
    faLocationDot,
    faPenToSquare,
    faPhone,
    faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Profile({ employer = false, inforCV }) {
    const user = localStorage.getItem('user');
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (!employer) {
            if (user) {
                const fetch = async () => {
                    let response = await UserService.getUser(`candidate/myInfo
                    `);
                    console.log(response.data);
                    setInfo(response.data);
                };
                fetch();
            }
        } else {
            setInfo(inforCV);
        }
    }, [inforCV, user, employer]);

    var classes = cx('wrapper');
    if (employer) {
        classes = cx('employer');
    } else {
        classes = cx('wrapper');
    }

    return (
        <div className={classes}>
            <div className={cx('inner')}>
                <div className={cx('head_profie')}>
                    <div className={cx('wrapper_avatar')}>
                        <img src={info.avatar} className={cx('avatar')} alt="avatar" />

                        {!employer && (
                            <button className={cx('btn_edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} className={cx('icon_edit')} />
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                    <div className={cx('wrapper_infor')}>
                        <div className={cx('name_my_profile')}>{info.fullName}</div>
                        {!employer && (
                            <div className={cx('email')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} /> {info.email}
                            </div>
                        )}
                    </div>
                </div>
                {employer && (
                    <div className={cx('general_infor')}>
                        <div className={cx('record')}>Hồ sơ ứng tuyển</div>
                        <a className={cx('CV')} href={info.cv} target="_blank" rel="noreferrer" >
                            <FontAwesomeIcon icon={faDownload} className={cx('icon_CV')} /> CV
                        </a>
                    </div>
                )}
                {!employer && (
                    <div className={cx('general_infor')}>
                        <div className={cx('title_general_infor')}>Thông tin cá nhân </div>

                        <div className={cx('dob')}>
                            <FontAwesomeIcon icon={faCakeCandles} className={cx('icon_infor')} />
                            {info.dob}
                        </div>
                        <div className={cx('gender')}>
                            <FontAwesomeIcon icon={faMarsAndVenus} className={cx('icon_infor')} />
                            {info.gender}
                        </div>
                        <div className={cx('phone')}>
                            <FontAwesomeIcon icon={faPhone} className={cx('icon_infor')} />
                            {info.phone}
                        </div>
                        <div className={cx('address')}>
                            <FontAwesomeIcon icon={faLocationDot} className={cx('icon_infor')} />
                            {info.address}
                        </div>
                    </div>
                )}

                {employer === false ? (
                    <div className={cx('general_infor')}>
                        <div className={cx('title_general_infor')}>Kỹ năng cá nhân</div>

                        <ul className={cx('list_skills')}></ul>
                        <div className={cx('title_experience')}>
                            Kinh nghiệm làm việc: <span className={cx('experience')}>2 năm</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx('bottom')}>
                        <div className={cx('title_introduce')}>Giới thiệu một số kỹ năng và dự án</div>
                        <p className={cx('text_introduce')}>{info.introduce}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
