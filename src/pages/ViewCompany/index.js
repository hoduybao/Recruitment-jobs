import classNames from 'classnames/bind';
import styles from './ViewCompany.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import ListJobs from '~/Layout/components/ListJobs';
import IntroCompany from '~/Layout/components/IntroCompany';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function ViewCompany() {
    const [classJob, setClassJob] = useState(['active']);
    const [classReview, setClassReview] = useState([]);

    var classesJob = cx('item_navi', ...classJob);
    var classesReview = cx('item_navi', ...classReview);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header_detail_job')}>
                    <div className={cx('header_left')}>
                        <img src={images.logo} alt="logo_company" className={cx('logo')} />
                        <div className={cx('block_info')}>
                            <div className={cx('name_company')}>VNG games</div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faUserGroup} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>10-20 người</div>
                            </div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faCalendarDays} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>Thứ 2 - Thứ 7</div>
                            </div>
                            <div className={cx('item_header')}>
                                <FontAwesomeIcon icon={faLocationDot} className={cx('icon_item_header')} />
                                <div className={cx('deadline_submit')}>
                                    Đường Võ Văn Ngân, Thủ Đức, Thành phố Hồ Chí Minh{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('header_right')}>
                        <button
                            type="button"
                            className={cx('btn_apply')}
                            data-bs-toggle="modal"
                            data-bs-target="#modal_apply_company"
                        >
                            Đánh giá
                        </button>
                    </div>
                </div>
                <div className={cx('navigation')}>
                    <Link
                        className={classesJob}
                        onClick={(e) => {
                            setClassJob(['active']);
                            setClassReview([]);
                        }}
                        to=""
                    >
                        Việc làm
                    </Link>
                    <Link
                        className={classesReview}
                        onClick={(e) => {
                            setClassReview(['active']);
                            setClassJob([]);
                        }}
                        to="review"
                    >
                        Đánh giá
                    </Link>
                </div>
                <div className={cx('content')}>
                    {classJob.length > 0 ? (
                        <div className={cx('side_left')}>
                            <ListJobs />
                            <IntroCompany/>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default ViewCompany;
