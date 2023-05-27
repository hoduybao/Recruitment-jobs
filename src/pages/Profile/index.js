import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import images from '~/assets/images';
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

const cx = classNames.bind(styles);

function Profile({ employer = false }) {
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
                        <img src={images.logo} className={cx('avatar')} alt="avatar" />

                        {!employer && (
                            <button className={cx('btn_edit')}>
                                <FontAwesomeIcon icon={faPenToSquare} className={cx('icon_edit')} />
                                Chỉnh sửa
                            </button>
                        )}
                    </div>
                    <div className={cx('wrapper_infor')}>
                        <div className={cx('name_my_profile')}>Hồ Duy Bảo</div>
                        <div className={cx('email')}>
                            <FontAwesomeIcon icon={faEnvelope} className={cx('icon_email')} /> hoduybaoo@gmail.com
                        </div>
                    </div>
                </div>
                {employer && (
                    <div className={cx('general_infor')}>
                        <div className={cx('record')}>Hồ sơ ứng tuyển</div>
                        <a className={cx('CV')} href="b.docx">
                            <FontAwesomeIcon icon={faDownload} className={cx('icon_CV')} /> CV
                        </a>
                    </div>
                )}
                <div className={cx('general_infor')}>
                    <div className={cx('title_general_infor')}>Thông tin cá nhân </div>
                    <div className={cx('dob')}>
                        {' '}
                        <FontAwesomeIcon icon={faCakeCandles} className={cx('icon_infor')} /> 01/11/2002{' '}
                    </div>
                    <div className={cx('gender')}>
                        <FontAwesomeIcon icon={faMarsAndVenus} className={cx('icon_infor')} />
                        Nam{' '}
                    </div>
                    <div className={cx('phone')}>
                        <FontAwesomeIcon icon={faPhone} className={cx('icon_infor')} />
                        0812301805{' '}
                    </div>
                    <div className={cx('address')}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon_infor')} />
                        Tân Phú , Thành phố Thủ Đức , Thành phố Hồ Chí Minh
                    </div>
                </div>
                {employer === false ? (
                    <div className={cx('general_infor')}>
                        <div className={cx('title_general_infor')}>Kỹ năng cá nhân</div>

                        <ul className={cx('list_skills')}>
                            <li>Github</li>
                            <li>Javascript</li>
                            <li>Nodejs</li>
                            <li>ReactJS</li>

                            <li>ReactJS</li>

                            <li>ReactJS</li>

                            <li>ReactJS</li>
                        </ul>
                        <div className={cx('title_experience')}>
                            Kinh nghiệm làm việc: <span className={cx('experience')}>2 năm</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx('bottom')}>
                        <div className={cx('title_introduce')}>Giới thiệu một số kỹ năng và dự án</div>
                        <p className={cx('text_introduce')}>
                            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
