import classNames from 'classnames/bind';
import styles from './ManageJobs.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


function ManageJobs({ employer }) {
    const [classJobSave, setClassJobSave] = useState(['active']);
    const [classJobApply, setClassJobApply] = useState([]);

    var classesJobSave = cx('item_navi', ...classJobSave);
    var classesJobApply = cx('item_navi', ...classJobApply);
    var classesWrapper;
    var text_navi1,text_navi2,navi1,navi2;
    if (employer) {
        classesWrapper = cx('wrapper_employer');
        text_navi1 = 'Việc làm đã đăng';
        text_navi2 = 'Việc làm đã ẩn';
        navi1 = 'Đã đăng';
        navi2 = 'Đã ẩn';
    } else {
        classesWrapper = cx('wrapper');
        text_navi1 = 'Việc làm đã lưu';
        text_navi2 = 'Việc làm đã ứng tuyển';
        navi1 = 'Đã lưu';
        navi2 = 'Đã ứng tuyển';
    }

    return (
        <div className={classesWrapper}>
            <div className={cx('wrapper_inner')}>
                <div className={cx('inner')}>
                    <div className={cx('navigation')}>
                        <Link
                            className={classesJobSave}
                            to=""
                            onClick={(e) => {
                                setClassJobSave(['active']);
                                setClassJobApply([]);
                            }}
                        >
                            {navi1}
                        </Link>
                        <Link
                            className={classesJobApply}
                            to=""
                            onClick={(e) => {
                                setClassJobApply(['active']);
                                setClassJobSave([]);
                            }}
                        >
                            {navi2}
                        </Link>
                    </div>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('inner')}>
                    {classJobSave.length > 0 ? (
                        <div className={cx('list_item')}>
                            <div className={cx('text_title')}>{text_navi1}</div>
                            <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                                    <img src={images.logo} alt="logo" className={cx('logo_company')} />
                                    <div className={cx('name_recruit')} href="/">
                                        Frontend - Developer (ReactJS, AngularJS)
                                    </div>
                                    <div className={cx('name_company')}>NET Company</div>
                                    <ul className={cx('require')}>
                                        <li className={cx('label')}>
                                            Mức lương: <span className={cx('value')}>12-20 triệu</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                                        </li>
                                    </ul>
                                    <div className={cx('time_update')}>
                                        <FontAwesomeIcon
                                            icon={faClockRotateLeft}
                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                        />
                                        Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                                    </div>
                                </div>
                                <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                                    <img src={images.logo} alt="logo" className={cx('logo_company')} />
                                    <div className={cx('name_recruit')} href="/">
                                        Frontend - Developer (ReactJS, AngularJS)
                                    </div>
                                    <div className={cx('name_company')}>NET Company</div>
                                    <ul className={cx('require')}>
                                        <li className={cx('label')}>
                                            Mức lương: <span className={cx('value')}>12-20 triệu</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                                        </li>
                                    </ul>
                                    <div className={cx('time_update')}>
                                        <FontAwesomeIcon
                                            icon={faClockRotateLeft}
                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                        />
                                        Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                                    </div>
                                </div>
                                <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                                    <img src={images.logo} alt="logo" className={cx('logo_company')} />
                                    <div className={cx('name_recruit')} href="/">
                                        Frontend - Developer (ReactJS, AngularJS)
                                    </div>
                                    <div className={cx('name_company')}>NET Company</div>
                                    <ul className={cx('require')}>
                                        <li className={cx('label')}>
                                            Mức lương: <span className={cx('value')}>12-20 triệu</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                                        </li>
                                    </ul>
                                    <div className={cx('time_update')}>
                                        <FontAwesomeIcon
                                            icon={faClockRotateLeft}
                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                        />
                                        Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className={cx('text_title')}>{text_navi2}</div>
                            <div className={cx('d-flex', 'flex-wrap', 'card_company_home')}>
                                <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                                    <img src={images.logo} alt="logo" className={cx('logo_company')} />
                                    <div className={cx('name_recruit')} href="/">
                                        Frontend - Developer (ReactJS, AngularJS)
                                    </div>
                                    <div className={cx('name_company')}>NET Company</div>
                                    <ul className={cx('require')}>
                                        <li className={cx('label')}>
                                            Mức lương: <span className={cx('value')}>12-20 triệu</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                                        </li>
                                    </ul>
                                    <div className={cx('time_update')}>
                                        <FontAwesomeIcon
                                            icon={faClockRotateLeft}
                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                        />
                                        Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                                    </div>
                                </div>
                                <div className={cx('item_recruit_candidate', 'p-2 m-2')}>
                                    <img src={images.logo} alt="logo" className={cx('logo_company')} />
                                    <div className={cx('name_recruit')} href="/">
                                        Frontend - Developer (ReactJS, AngularJS)
                                    </div>
                                    <div className={cx('name_company')}>NET Company</div>
                                    <ul className={cx('require')}>
                                        <li className={cx('label')}>
                                            Mức lương: <span className={cx('value')}>12-20 triệu</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Kinh nghiệm: <span className={cx('value')}>1 năm</span>
                                        </li>
                                        <li className={cx('label')}>
                                            Địa điểm: <span className={cx('value')}>Hồ Chí Minh</span>
                                        </li>
                                    </ul>
                                    <div className={cx('time_update')}>
                                        <FontAwesomeIcon
                                            icon={faClockRotateLeft}
                                            style={{ color: '#21c2e2', marginRight: 5 }}
                                        />
                                        Cập nhật gần nhất: <span className={cx('value')}>2023-04-20</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ManageJobs;
